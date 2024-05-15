# Demo Application using OpenText Voltage Fusion APIs

This demo application demonstrates the use of **OpenText Voltage Fusion** APIs using a simple JavaScript application. The application has been built using [React](https://github.com/facebook/create-react-app) and [Node.js](https://nodejs.org/).

## About Voltage Fusion
Voltage Fusion is a cloud-first data security platform that helps businesses address data privacy and governance. It analyzes and classifies sensitive data, performs risk scoring, and calculates potential monetary and business impact of a data breach or non-compliance. You can read more about Voltage Fusion by visiting https://www.opentext.com/products/voltage-fusion-platform. To speak with a rep or to sign up for a 90-day free trial please visit https://www.microfocus.com/en-us/products/voltage-fusion/contact.

## Voltage Fusion Administration Portal
Once you have signed up for Voltage Fusion service and have access to your tenant, login to the administration portal using your admin email address and password. (Demo server URL: https://www.demo.microfocusfileanalysis.com:9320/[tenant-id]/admin)

## Setting up a Data Source
Voltage Fusion portal has three sections - Connect, Analyze, and Manage. Start with **Connect** where you specify data sources that you would like Voltage Fusion to analyze and monitor. For this demo application, we will use a **File System** as our (unstructured) data source.

### Step 1 - Create an Agent Cluster
First, we will create an Agent Cluster. From the left-hand side menu, under **Agents** select **Agent Clusters** and create a new Agent Cluster. 

### Step 2 - Define a Data Source
The next step is to define a Data Source. Under **Sources** on the left-hand side, select **Manage Source** and click on the option to create a new Source. Choose **File System** for Source Type and select the Agent Cluster you just created from the drop-down. On the following screen, enter the host path in UNC format, and the host username and password.

### Step 3 - Identify Datasets
The last step is to identify the dataset (file folders) hosted on the chosen data source. From **Sources** on the left-hand side, select **Manage Datasets** and click on the option to create a new Dataset. Choose the newly created data source from the drop down. On the following screen, enter the Sub-Directory where the files reside, choose **Full Scan (Analyzed)** for the default action, and turn on the options **Store content as text** and **Extract grammar values**. On subsequent screen, for **Grammer Set**, you can choose **US Consumer Privacy** and finish the setup.

> [!NOTE] 
> For this demo application we have provided you some sample files that you can use for your testing.

## Installing Processing Agent
Voltage Fusion requires a processing agent running on the host server to communicate with your datasets and to process your data. The agent requires a Windows Server. For a quick and easy setup, you can use [Microsoft Hyper-V](https://learn.microsoft.com/en-us/virtualization/hyper-v-on-windows/about/) virtual machine which comes pre-installed on Windows 10, and often includes a free version of the Windows Server. After installing the virtual machine and the Windows Server, connect to the VM (using Hyper-V Manager) and complete the following steps to set up the agent.

### Step 1 - Download Agent
On the Windows Server, open a web browser and login to the Voltage Fusion administration portal. Click on **Connect** on the dashboard and then expand the **Agents** menu option on the left-hand side to select **Agent Download**. Download the processing agent on the Windows Server.

### Step 2 - Install Agent
Complete the installation steps. You can find detailed instructions for installing the agent at https://www.demo.microfocusfileanalysis.com:9420/help/en-US/connect/Content/con_agentInstall.htm. Once the installation is complete you will find a number of Fusion services running on the Windows Server. 

### Step 3 - Assign Agent to Cluster
After the agent is created, it will appear in the list of **Unassigned Agents** grouping on the Agent Clusters page. Assign the new agent to the cluster that you created earlier. The agent will run based on the default schedule of the cluster, however you can manually run the scan anytime on a specific dataset from the **Datasets** page. 

## Analyzing the Data
Once the agent has processed all the files, head back to the Admin portal and select **Analyze** from the main dashboard. You will see a number of charts that show various analysis performed by Voltage Fusion. Take your time to go through each of the options since there is a lot of information that is displayed here.

Next, click on the **Research** option in the left-hand side menu. Here you will be able to review the details of each of the files individually. Again, take your time to go through each option.

## Calling the APIs
Voltage Fusion provides a number of APIs using which you can pull all the analysis that you are able to view through the Admin portal and use them in your applications. You can access the API documentation on the demo server at https://www.demo.microfocusfileanalysis.com:9310/swagger/?tenant=[tenant-id]. In this demo application, we have used four different APIs to pull the analysis from the server.

## Installing the Demo Application
1. Download the code from [GitHub](https://github.com/imaas-wynder).
2. Download and install the latest LTS version of [Node.js](https://nodejs.org/). (You can also use Node Version Manager to manage multiple versions of Node). This sample application was built on Node version 18.16.0.
3. In the application root folder install the node libraries using the command
    ```
    npm install
    ```
4. Based on the dependencies listed in package.json, this npm install command will also install the following libraries used by this application
    ```
    axios, express, react, react-dom, react-scripts, web-vitals, @babel/core, @babel/preset-env, @babel/preset-react, babel-loader, webpack, webpack-cli, webpack-node-externals
    ```
## Running the Demo Application
1. Before you run the demo application, update the **/src/properties.js** file.

2. **Client-side application**: To run the client-side application, open a command line (terminal) and type the following command in the application root folder. Running this command will also open the application frontend in your default web browser.
    ```
    npm start
    ```

3. **Server-side application**: The API calls to the Voltage Fusion server are made from a server-side application. To compile and run the server-side application, open another command line (terminal) and run the following commands from the application root folder.
    ```
    npm run build:server
    npm run start:server
    ```
## Interacting with the Demo Application
This demo application has 2 sections:

The first section allows you to fetch the **Access Token** using the credentials in the properties.js file.

The second section gives you a list of four Voltage Fusion APIs to choose from to retrieve the analysis that has been gathered on your Data Source. Some of the APIs retrieve information about a specific file within the data source, therefore make sure to specify the corrent document id in the properties file.

## Developer Support
For support on this and other demo applications you can reach us at otdeveloper@opentext.com or https://forums.opentext.com/forums/developer.