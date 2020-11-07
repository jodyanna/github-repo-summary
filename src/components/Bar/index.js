import React from "react";
import BarPart from "../BarPart";
import colors from "../../colors.json"; // thank you https://github.com/ozh/github-colors
import styles from "../../GitAccount.module.css";


export default class Bar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
    };
  }

  componentDidMount() {
    let promises = this.props.repos.map(repo => this.githubAPIRequest(repo));
    Promise.all(promises).then(data => this.calcGitRepoLangUsage(data))
      .then(data => this.determineLangUsagePercents(data))
      .then(data => this.setState({isLoading: false, gitData: this.createStateObject(data)}))
      .catch(err => console.log(err))
  }

  githubAPIRequest(repo) {
    return ajaxRequest(`https://api.github.com/repos/${this.props.username}/${repo}/languages`)
  }

  calcGitRepoLangUsage(data) {
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

  determineLangUsagePercents(data) {
    let temp = {};
    const langScoreTotal = this.calcGitLangScore(data);
    for (const prop in data) {
      const ratio = data[prop] / langScoreTotal;
      const width = (Math.floor(ratio.toFixed(2) * 100));
      if (width > 0) temp[prop] = width;
    }
    return temp
  }

  calcGitLangScore(data) {
    return Object.values(data).reduce((a, b) => a + b, 0)
  }

  createStateObject(data) {
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

  render() {
    const createBar = () => {
      if (!this.state.isLoading) {
        return (
          <div className={styles.barContainer}>
            {Object.values(this.state.gitData).map(obj => <BarPart key={obj.displayName}
                                                                   label={obj.displayName}
                                                                   width={obj.width}
                                                                   backgroundColor={obj.backgroundColor}/>)}
          </div>
        );
      }
    }
    return (
      <div className={styles.container}>
        {createBar()}
      </div>
    );
  }
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