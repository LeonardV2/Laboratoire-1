const url = require('url');

function AccessControlConfig(res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');
}

function Prefligth(req, res) {
    if (req.method === 'OPTIONS') {
        console.log('preflight CORS verifications');
        res.end();
        return true;
    }
    return false;
}

module.exports = require('http').createServer((req, res) => {
    AccessControlConfig(res);
    if (!Prefligth(req, res)) {
            
        var math = require('./controller.js');
        const reqUrl =  url.parse(req.url, true);
        console.log('Request type: ' + req.method + ' Endpoint: ' + req.url);
        if (reqUrl.pathname == '/api/maths' && req.method === 'GET') 
            math.maths(req, res);
        else math.invalidUrl(req, res);
    }
});