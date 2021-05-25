const axios = require("axios");

// serverless letlify lambda function, 
// intermediate between client and github apiv4

exports.handler = (event, context, callback) => {
  const URL = `https://livingston-baked-goods.myshopify.com/api/2021-04/graphql.json`;
  const accessToken = process.env.SHOPIFY_API_KEY;
  const query = 
  `query {
    {
      shop {
        name
        primaryDomain {
          url
          host
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
  const getshopdata = () => {
    axios({
      method: "POST",
      url: URL,
      data: JSON.stringify({ query }),
      headers: {
        'X-Shopify-Storefront-Access-Token': `${accessToken}`,
        'Content-Type': 'application/json'
      }
    })
      .then(res => send(res.data.shop.name))
      .catch(err => send(err));
  };

  // Make sure method is GET
  if (event.httpMethod == "GET") {
    // Run
    getshopdata();
  }
};