# CRUD UI with Azure Backend with APIM
## Overview
This project showcases a CRUD (Create, Read, Update, Delete) UI built using React.js with Material-UI components. The UI interacts with a backend powered by Azure Functions, and the API is managed through Azure API Management (APIM).

## CRUD UI
- #### Framework: React 
- #### State Management: Context API 
- #### UI Library: Material UI 
- #### Development Testing: JSON-Server 


## Backend : Azure Functions 
The backend logic is implemented using Azure Functions, providing a serverless execution environment for running event-driven APIs, which scales automatically and optimizes cost.


## API Gateway: Azure API Management (APIM) 
Azure API Management is used to create a consistent and secure API gateway for the backend services. It simplifies the publication, management, maintenance, and security of APIs.


### CI/CD: GitHub Actions 
Continuous integration and deployment are managed through GitHub Actions, automating the software release process from code commit to deployment.

### IaC: Terraform 
Infrastructure as Code (IaC) is implemented using Terraform, allowing for the provisioning and management of cloud infrastructure through code.

### Cloud Provider: Azure 
The entire infrastructure is hosted on Microsoft Azure, providing a scalable, secure, and reliable cloud environment for running the application.

## Getting Started
Here you can provide instructions on how to set up the project locally, prerequisites, and steps to run the project.
```

# Clone the repository
git clone URL_TO_REPOSITORY

# Navigate to the project directory
cd project-directory

# Install dependencies
npm install


#  Client UI Start the development server locally

npm start

```
### To start the function app locally add the following to local.settings.json

```
{
  "IsEncrypted": false,
  "Values": {
    "AzureWebJobsStorage": "UseDevelopmentStorage=true",
    "FUNCTIONS_WORKER_RUNTIME": "dotnet",
    "MongoDbConnectionString": "your_local_mongodb_connection_string",
    "MongoDbDatabaseName": "your_local_database_name"
  },
  "Host": {
    "CORS": "*",
    "CORSCredentials": false
  }
}
```