import React from 'react';
import {properties} from './properties';

function App() {
  const [accessToken, setAccessToken] = React.useState()
  const [tokenPlaceholder, setTokenPlaceholder] = React.useState()
  const [apiResponse, setAPIResponse] = React.useState()

  /**
   * getAuthToken() - Get Authentication Token from OCP
   */
  function getAuthToken() {
    setAccessToken("")
    setTokenPlaceholder("...Requesting New Authentication Token")

    const authenticate_url = `${properties.local_server_url}/authenticate`
    
    fetch(authenticate_url)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(accessToken => {
        setAccessToken(accessToken)
      })
      .catch(error => {
        console.error('Error:', error);
      });    

    setTokenPlaceholder("")
  }

  /**
   * callVoltageFusionAPI 
   * 
   * Call the serverside app to make the API call to the Voltage Fusion server
   * 
   * @param {*} event 
   * @returns 
   */
  function callVoltageFusionAPI(event) {
    const selectElement = document.querySelector('#apiSelected');
    const apiSelected = selectElement.options[selectElement.selectedIndex].value;
    if (apiSelected === 'select') {
      return
    }

    if (!accessToken) {
      alert("Missing Authentication Token")
      return
    }

    const fusion_api_url = `${properties.local_server_url}/call-fusion-api`
    const requestOptions = {
      method: 'GET',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        'Authorization': `${accessToken}`,
        'Operation': `${apiSelected}`
      }
    }
    //console.log('requestOptions = ', requestOptions)
    
    fetch(fusion_api_url, requestOptions)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not OK');
        }
        return response.json();
      })
      .then(data => {
        //console.log('data = ', data)
        if (apiSelected === 'privacy-metadata') {
          setAPIResponse('FILE: ' + data.title +  
            '\n\nGRAMMAR METADATA:\n' + JSON.stringify(data.grammarMetadata, "", 2) + 
            '\n\nREPORTING GROUP METADATA:\n' + JSON.stringify(data.reportingGroupMetadata, "", 2)
          )
        }
        else if (apiSelected === 'text-content' ) {
          setAPIResponse('TEXT CONTENT PREVIEW:\n' + data)
        }
        else if (apiSelected === 'reporting-groups' ) {
          setAPIResponse('REPORTING GROUPS:\n' + JSON.stringify(data, "", 2))
        }
        else if (apiSelected === 'grammer-analytics' ) {
          setAPIResponse('GRAMMAR ENTITIY ANALYTICS:\n' + JSON.stringify(data, "", 2))
        }
        else {
          setAPIResponse(data)
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });    
  }

  function clearAPIResponse(event) {
    setAPIResponse("")
  }


  /***********************
   * Render page
   **********************/
  return (
      <main>
        <h1 className="ot2-sample-header">Voltage Fusion API Demo</h1><br/>
        <div className="ot2-body">
          <div>
            <h3>Use Authentication API to obtain Access Token</h3>
            <button onClick={getAuthToken}>Get Token</button>&nbsp;&nbsp;&nbsp;
            <label><i>{tokenPlaceholder}</i></label> <br/><br/>
            <textarea id="token" name="token" value={accessToken} rows="8" cols="80" readOnly /><br/><br/>
          </div>
        </div>
        <hr align='left' />
        <div className="ot2-body">
          <h3>Select the Voltage Fusion API to test</h3>
          <select name="apiSelected" id="apiSelected" onChange={clearAPIResponse}>
            <option value="select">Please select an option...</option>
            <option value="privacy-metadata">Research Document - Get Document Privacy Metadata</option>
            <option value="text-content">Preview/Download - Preview a file's text content</option>
            <option value="reporting-groups">Connect - Get All Reporting Groups</option>
            <option value="grammer-analytics">Analyze - Get Grammar Entity Analytics</option>
          </select>&nbsp;&nbsp;
          <button onClick={callVoltageFusionAPI}>Call API</button><br/><br/> 
          <textarea id="apiResponse" name="apiResponse" value={apiResponse} rows="24" cols="80" readOnly /><br/><br/>
        </div>
      </main>
  );
}

export default App;
