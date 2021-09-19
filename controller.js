const { Console } = require('console');
const url = require('url');
const queryString = require('query-string');
exports.maths = function (req, res) {

    var params = getQueryString(req);
    if (params.op != null) {
        switch (params.op) {

            case " ":
                params.op = '+';
                verify3Params(res, params);
                value = parseFloat(params.x) + parseFloat(params.y); break;

            case "-":
                verify3Params(res, params);
                value = parseFloat(params.x) - parseFloat(params.y); break;

            case "*":
                verify3Params(res, params);
                value = parseFloat(params.x) * parseFloat(params.y); break;

            case "/":
                verify3Params(res, params);
                if (params.x == 0)
                    value = "NaN"
                else if (params.y == 0)
                    value = "Infinity";
                else value = params.x / params.y; break;

            case "%":
                verify3Params(res, params);
                if (params.y == 0)
                    value = "NaN"
                else
                    value = params.x % params.y; break;

            case "!":
                verify2Params(res, params);
                value = calculateFactorial(params); break;

            case "p":
                verify2Params(res, params);
                value = checkPrime(params); break;

            case "np":
                verify2Params(res, params);
                value = findNthPrime(params); break;

            default:
                params.error = "unknown operation";
                errorEncountered(res, params); break;
        }
    }
    else {
        params.error = "'op' paremeter is missing";
        errorEncountered(res, params);
    }

    params.value = value;
    res.statusCode = 200;
    res.setHeader('content-Type', 'Application/json');
    res.end(JSON.stringify(params));
}

function getQueryString(req) {
    var url = req.url;
    if (url.indexOf('?') > -1) {
        url = url.substring(url.indexOf('?'), url.length);
        const parsed = queryString.parse(url);
        return parsed;
    }
    return null;
}

function calculateFactorial(params) {
    number = params.n;
    value = 1;

    if (number != 0)
        for (i = 1; i <= number; ++i)
            value = value * i;
    return value;
}

function checkPrime(params) {
    number = params.n;
    for (var i = 2; i < number; i++)
        if (number % i === 0)
            return false;
    return number > 1;
}

function findNthPrime(params) {
    var num = params.n;
    var i, primes = [2, 3], n = 5;

    const isPrime = n => {
        let i = 1, p = primes[i],
            limit = Math.ceil(Math.sqrt(n));
        while (p <= limit) {
            if (n % p === 0)
                return false;
            i += 1;
            p = primes[i];
        }
        return true;
    }

    for (i = 2; i <= num; i += 1) {
        while (!isPrime(n))
            n += 2;
        primes.push(n);
        n += 2;
    };
    return primes[num - 1];
}



function verify3Params(res, params) {

    if (Object.keys(params).length > 3)
        params.error = "Too many parameters"
    else if (params.x != null) {
        let x = parseInt(params.x)
        if (!isNaN(x)) {
            if (params.y != null) {
                let y = parseInt(params.y)
                if (isNaN(y))
                    params.error = "Parameter 'y' is not a number"
            } else params.error = "'y' parameter is missing"
        } else params.error = "Parameter 'x' is not a number"
    } else params.error = "'x' parameter is missing"
    if (params.error != null) errorEncountered(res, params);
}

function verify2Params(res, params) {

    if (Object.keys(params).length > 2)
        params.error = "Too many parameters"
    else if (params.n != null) {
        let n = parseInt(params.n)
        if (isNaN(n))
            params.error = "Parameter 'n' is not a number"
    } else params.error = "'n' parameter is missing"
    if (params.error != null) errorEncountered(res, params);
}

function errorEncountered(res, params) {
    res.statusCode = 400;
    res.setHeader('content-Type', 'Application/json');
    res.end(JSON.stringify(params))
}

exports.invalidUrl = function (res) {
    var response = [
        {
            "message": "Incorrect endpoint. The possible options are "
        },
        availableEndpoints
    ]
    res.statusCode = 404;
    res.setHeader('content-Type', 'Application/json');
    res.end(JSON.stringify(response))
}

const availableEndpoints = [
    {
        method: "GET",
        maths: "/maths"
    }
]