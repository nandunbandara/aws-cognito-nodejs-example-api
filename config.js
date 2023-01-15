require('dotenv').config();

module.exports = {
    port: process.env.PORT || 3000,
    cognitoUserPoolID: process.env.COGNITO_USER_POOL_ID || '',
    cognitoClientId: process.env.COGNITO_CLIENT_ID || ''
};