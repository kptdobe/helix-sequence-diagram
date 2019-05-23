const express = require('express');
const request = require('request');
const app = express();
const port = 9000;


app.use(express.static('web'));

app.get('/proxy', (req, res) => {
    console.log('req to proxy', req);
    const url = req.query.url;
    if(url) {
        request(`${url}?t=${new Date().getTime()}`, function (error, response, body) {
            let sequence = response.headers['x-alex'];
            sequence = sequence.replace(/\(null\)/g, '').replace(/\\\\n/g, '\n').replace(/\?/g, '?\\n');
            res.send(sequence);
        });
    } else {
        res.status(404);
    }
});

app.listen(port);