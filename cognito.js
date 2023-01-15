const AmazonCognitoIdentity = require('amazon-cognito-identity-js');
const CognitoUserPool = AmazonCognitoIdentity.CognitoUserPool;
const AWS = require('aws-sdk');
const config = require('./config');

const poolData = {
    UserPoolId : config.cognitoUserPoolID, // Your user pool id here
    ClientId : config.cognitoClientId // Your client id here
};
const pool_region = 'us-east-1';
const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

const login = (username, password) => {
    const authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails({
        Username : username,
        Password : password,
    });

    const userData = {
        Username : username,
        Pool : userPool
    };

    const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

    return new Promise((resolve, reject) => {
        cognitoUser.authenticateUser(authenticationDetails, {
            onSuccess: function (result) {
                const accessToken = result.getAccessToken().getJwtToken();
                const idToken = result.getIdToken().getJwtToken();
                const refreshToken = result.getRefreshToken().getToken();

                resolve({
                    accessToken, idToken, refreshToken
                });
            },
            onFailure: function(err) {
                reject(err);
            },
            newPasswordRequired: function(userAttributes, requiredAttributes) {
                resolve({
                    message: "New Password required"
                })
            }
        });
    });
}

module.exports = {
    login
}