# GitHub Repo Summary
Display a brief summary of a GitHub user's public repositories.

Currently, displayed statistics include:
- Total number of public repositories
- Programming language usage percentage across all repositories in bar form

![Alt text](./src/img/preview.png?raw=true "Preview")


# How To Use
The GitHubSummary component serves as the main container for all statistics gathered from GitHub's API.
This component requires a 'username' prop that points to a valid GitHub user account name.

Example:

`<GitHubSummary username={"jodyanna"} />
`

# Technology
- React (JavaScript)
- styled-components (CSS)
- GitHub's API

# How It's Made
### Getting the data
All data is gathered from GitHub's API via HTTPS GET requests processed by JavaScript's built in Fetch API or the XMLHttpRequest Object.
Requests are made during component life cycle using React's useEffect Hook and converted into JSON upon successful request.

First, using the account name provided by the 'username' props, all user public repo names are requested and saved as an array using React's useState Hook.
The total number of repos is determined by using the 'length' method of the repo names array.

Then, an array of promises containing repo language usage is returned by mapping the array of repo names with a promisified XMLHttpRequest function.

### Determining language usage
GitHub's API returns an object consisting of programming language name keys and int values to determine how much of each language is used in a project.

For example, using the following curl command in terminal:

`curl https://api.github.com/repos/jodyanna/github-repo-summary/languages
`

Will return:

`{
   "JavaScript": 5753,
   "HTML": 1741,
   "CSS": 579
 }
`

First, total values for each programming language are determined and saved in a new object.
By adding all values from this object a total usage value of all languages can be determined.

Then, simply dividing a languages total value by overall total will yield a ratio that can be converted to a percent value.
This percent value will be used to 'fill' the display bar using the CSS width property.

Finally, a state object is created that will contain all of the necessary styles for each programming language that will appear in the bar.
All that is left is to map the styles to the BarPart component to render the bar.

And that's all there is to it! Easy-peasy!



# Acknowledgements 
Thank you, GitHub user 'ozh', for the JSON file containing all of the colors GitHub uses for each programming language.
