import React, { useState, useEffect } from "react";
import styled from "styled-components";
import GitRepoPercentBar from "../Bar";
import styles from "../../GitAccount.module.css";


export default function Overview(props) {
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
    if (!isLoading) return <GitRepoPercentBar username={props.username} repos={resData} />
  }

  return(
    <div className={styles.container}>
      <h3>GitHub Repo Summary</h3>
      {renderOverview()}
      {renderBar()}
    </div>
  );
}