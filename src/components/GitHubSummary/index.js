import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Bar from "../Bar";

const Container = styled.div`
  display: flex;

  flex-direction: column;
  align-items: flex-start;

  width: 95%;
`;

export default function GitHubSummary(props) {
  const [ isLoading, setIsLoading ] = useState(true);
  const [ resData, setResData ] = useState({});

  useEffect(() => {
    fetch(`https://api.github.com/users/${props.username}/repos`, {
      method: "GET",
      headers: {
        "authorization": process.env.REACT_APP_GITHUB_API_TOKEN
      }
    }).then(res => res.json())
      .then(data => data.map(obj => obj.name))
      .then(data => setResData(data))
      .then(() => setIsLoading(false))
      .catch(err => console.log(err))
  }, [])

  const renderOverview = () => {
    if (!isLoading) {
      return (
        <span>
          Programming languages across <a href={`https://github.com/${props.username}?tab=repositories`}>{resData.length}
            </a> repositories
          </span>
      );
    }
  }

  const renderBar = () => {
    if (!isLoading) return <Bar username={props.username} repos={resData} />
  }

  return(
    <Container>
      <h3>GitHub Repo Summary</h3>
      {renderOverview()}
      {renderBar()}
    </Container>
  );
}
