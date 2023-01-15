const express = require('express');
const config = require('./config');
const CognitoService = require('./cognito');
const app = express();

app.use(express.json());

app.listen(config.port, () => {
    console.log('Application listening on port ', config.port);
});

app.post('/auth/login', async (req, res) => {
    const {username, password} = req.body;

    if (!username || !password) {
        return res.stats(400).json({error: 'username and password required'});
    }

    try {
        const result = await CognitoService.login(username, password);
        return res.status(200).json({ result });
    } catch (err) {
        return res.status(500).json({
            error: err.message
        });
    }
});