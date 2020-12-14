import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import aws from "./config";
import Amplify from 'aws-amplify';

//Initialize AWS Amplify.
Amplify.configure({
  Auth: { //Auth = Cognito.
    mandatorySignIn: true,
    region: aws.cognito.REGION,
    userPoolId: aws.cognito.USER_POOL_ID,
    identityPoolId: aws.cognito.IDENTITY_POOL_ID,
    userPoolWebClientId: aws.cognito.APP_CLIENT_ID
  },
  Storage: { //Storage = S3.
    region: aws.s3.REGION,
    bucket: aws.s3.BUCKET,
    identityPoolId: aws.cognito.IDENTITY_POOL_ID
  },
  API: { //API = API Gateway.
    endpoints: [
      {
        name: "notes",
        endpoint: aws.apiGateway.URL,
        region: aws.apiGateway.REGION
      },
    ]
  }
});
ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
