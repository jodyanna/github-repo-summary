import React from "react";
import GitRepoPercentBar from "../Bar";
import styles from "../../GitAccount.module.css";


export default class GitAccountSummary extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
    };
  }

  componentDidMount() {
    fetch(`https://api.github.com/users/${this.props.username}/repos`, {
      method: "GET",
      headers: {
        "authorization": process.env.REACT_APP_GITHUB_API_TOKEN
      }
    }).then(res => res.json())
      .then(data => data.map(obj => obj.name))
      .then(data => this.setState({isLoading: false, repos: data}))
      .catch(err => console.log(err))
  }

  render() {
    const renderOverview = () => {
      if (!this.state.isLoading) {
        return (
          <span>Programming languages across <a href={`https://github.com/${this.props.username}?tab=repositories`}>
          {this.state.repos.length}</a> repositories</span>
        );
      }
    }

    const renderBar = () => {
      if (!this.state.isLoading) {
        return <GitRepoPercentBar username={this.props.username} repos={this.state.repos} />
      }
    }

    return(
      <div className={styles.container}>
        <h3>GitHub Summary</h3>
        {renderOverview()}
        {renderBar()}
      </div>
    )
  }
}