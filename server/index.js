import {properties} from '../src/properties';

const express = require('express');
const React = require('react');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, Operation");
  next();
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  //console.log('GET req.params: ', req.params)
  //console.log('GET req.query: ', req.query)
  const html = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>App Server</title>
      </head>
      <body>
        <div id="root">You've reached the Web Server that makes Voltage Fusion API calls</div>
      </body>
    </html>`;

  res.send(html);
});

/**
 * GET to handle authenticate request
 */
app.get('/authenticate', (req, res) => {
  //console.log("Performing Authentication...")

  const url = `${properties.voltage_fusion_base_url}/v1/auth/login`
  //console.log('url = ', url)

  const requestOptions = {
      method: 'POST',
      headers: { 
        'accept': '*/*',
        'Content-Type': 'application/json' 
      },
      body: JSON.stringify({
          tenantId: properties.voltage_fusion_tenant_id,
          user: properties.voltage_fusion_username,
          password: properties.voltage_fusion_password
      })
  }
  //console.log("requestOptions = ", requestOptions)

  fetch(url, requestOptions)
    .then(response => response.json())
    .then(data => {
      //console.log("data.accessToken = ", data.accessToken)
      res.json(data.accessToken)
    })
    .catch(error => console.error("Error: ", error))
});


/**
 * GET to handle Voltage Fusion API calls
 */
app.get('/call-fusion-api', (req, res) => {
  const accessToken = req.header('Authorization')
  
  const operation = req.header('Operation')
  console.log('operation = ', operation)

  if (operation === 'privacy-metadata') {
    //console.log('PRIVACY-METADATA')

    const url = `${properties.voltage_fusion_base_url}/research/v1/document/${properties.document_id}/privacy-metadata?maskData=true`

    fetch(url, {
      "headers": {
        "accept": "application/json, text/plain, */*",
        "authorization": `Bearer ${accessToken}`,
        "content-type": "application/json",
        "tenant": properties.voltage_fusion_tenant_id
      },
      "body": "{}",
      "method": "POST"
    })
    .then(response => response.json())
    .then(data => {
      //console.log("Response data...\n", data)
      res.json(data)
    })
    .catch(error => console.error("Error: ", error))
  }
  else if (operation === 'text-content') {
    //console.log('TEXT-CONTENT')

    const url = `${properties.voltage_fusion_base_url}/v1/view/preview-text-content`
    //console.log('url = ', url)

    fetch(url, {
      "headers": {
        "accept": "application/octet-stream",
        "authorization": `Bearer ${accessToken}`,
        "content-type": "application/x-www-form-urlencoded",
        "tenant": properties.voltage_fusion_tenant_id
      },
      "body": `docId=${properties.document_id}&maskData=true&highlightTerms=*`,
      "method": "POST"
    })
    .then(response => response.text())
    .then(data => {
      //console.log('data = ', data)
      res.json(data)
    })
    .catch(error => console.error("Error: ", error))
  }
  else if (operation === 'reporting-groups') {
    //console.log('REPORTING-GROUPS')

    const url = `${properties.voltage_fusion_base_url}/cc/v1/reporting-group?includeCounts=true&indexedOnly=true&structuredDataType=UNSTRUCTURED`
    //console.log('url = ', url)

    fetch(url, {
      "headers": {
        "accept": "application/json, text/plain, */*",
        "authorization": `Bearer ${accessToken}`,
        "tenant": properties.voltage_fusion_tenant_id
      },
      "body": null,
      "method": "GET"
    })
    .then(response => response.json())
    .then(data => {
      //console.log("Response data...\n", data)
      res.json(data)
    })
    .catch(error => console.error("Error: ", error))
  }
  else if (operation === 'grammer-analytics') {
    //console.log('GRAMMAR ENTITIY ANALYTICS')

    const url = `${properties.voltage_fusion_base_url}/analyze/v1/data-analytics/entities?structuredDataType=UNSTRUCTURED`
    //console.log('url = ', url)

    fetch(url, {
      "headers": {
        "accept": "application/json, text/plain, */*",
        "authorization": `Bearer ${accessToken}`,
        "tenant": properties.voltage_fusion_tenant_id
      },
      "body": null,
      "method": "GET"
    })
    .then(response => response.json())
    .then(data => {
      //console.log("Response data...\n", data)
      res.json(data)
    })
    .catch(error => console.error("Error: ", error))
  }
  else {
    //console.log('OPERATION NOT SUPPORTED')
    res.json('Operation Not Supported')
  }
});


app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
