import React, { useState, useEffect } from "react";
import { Container, BarContainer } from "./style";
import BarPart from "../BarPart";
import colors from "./colors.json"; // thank you https://github.com/ozh/github-colors

export default function Bar(props) {
  const [ isLoading, setIsLoading ] = useState(true);
  const [ resData, setResData ] = useState({});

  useEffect(() => {
    let promises = props.repos.map(repo => githubAPIRequest(repo));
    Promise.all(promises).then(data => calcGitRepoLangUsage(data))
      .then(data => determineLangUsagePercents(data))
      .then(data => setResData(createStateObject(data)))
      .then(() => setIsLoading(false))
      .catch(err => console.log(err))
  }, []);

  const githubAPIRequest = repo => ajaxRequest(`https://api.github.com/repos/${props.username}/${repo}/languages`)

  const calcGitRepoLangUsage = data => {
    // param: array of objects
    // return: obj
    let temp = {};
    for (let i = 0; i < data.length; i++) {
      for (const prop in data[i]) {
        if (temp.hasOwnProperty(prop)) temp[prop] += data[i][prop];
        else temp[prop] = data[i][prop];
      }
    }
    return temp
  }

  const determineLangUsagePercents = data => {
    let temp = {};
    const langScoreTotal = calcGitLangScore(data);
    for (const prop in data) {
      const ratio = data[prop] / langScoreTotal;
      const width = (Math.floor(ratio.toFixed(2) * 100));
      if (width > 0) temp[prop] = width;
    }
    return temp
  }

  const calcGitLangScore = data => Object.values(data).reduce((a, b) => a + b, 0)

  const createStateObject = (data) => {
    const sorted = Object.entries(data).sort((a, b) => b[1] - a[1]);
    let temp = {};
    for (let i = 0; i < sorted.length; i++) {
      let styles = {};
      styles["displayName"] = sorted[i][0];
      styles["width"] = sorted[i][1].toString() + "%";
      styles["backgroundColor"] = colors[sorted[i][0]]["color"];
      temp[sorted[i]] = styles;
    }
    return temp
  }

  const createBar = () => {
    if (!isLoading) {
      return (
        <BarContainer>
          {Object.values(resData).map(obj => <BarPart key={obj.displayName}
                                                      label={obj.displayName}
                                                      width={obj.width}
                                                      backgroundColor={obj.backgroundColor}/>)}
        </BarContainer>
      );
    }
  }

  return (
    <Container>
      {createBar()}
    </Container>
  );
}

const ajaxRequest = (url) => {
  return new Promise((resolve) => {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) resolve(JSON.parse(this.responseText))
    };
    xhttp.open("GET", url, true);
    xhttp.setRequestHeader("authorization", process.env.REACT_APP_GITHUB_API_TOKEN);
    xhttp.send();
    setTimeout(() => {}, 1000)
  })
}