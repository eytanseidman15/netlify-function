const axios = require("axios");

// serverless letlify lambda function, 
// intermediate between client and github apiv4

exports.handler = (event, context, callback) => {
  const URL = `https://api.github.com/graphql`;
  const accessToken = process.env.GITHUB_API_KEY;
  console.log(URL);
  console.log(accessToken);
  const query = 
  `query {
    repository(owner:"Shopify", name:"shopify-app-cli") {
      issues(last:20) {
        edges {
          node {
            title
            url
            labels(first:5) {
              edges {
                node {
                  name
                }
              }
            }
          }
        }
      }
    }
  }`;

  // Send json response to the react client app
  const send = body => {
    callback(null, {
      statusCode: 200,
      body: JSON.stringify(body)
    });
  };

  // Perform API call
  const getrepos = () => {
    axios({
      method: "POST",
      url: URL,
      data: JSON.stringify({ query }),
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
      .then(res => send(res.data.data.repositoryOwner.pinnedRepositories.nodes))
      .catch(err => send(err));
  };

  // Make sure method is GET
  if (event.httpMethod == "GET") {
    // Run
    getrepos();
  }
};