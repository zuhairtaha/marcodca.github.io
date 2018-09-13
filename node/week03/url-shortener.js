const http = require('http');
const https = require('https');
const url = require('url');
const fs = require('fs');

const { parse } = require('querystring');
const Router = require('./router');

const longUrlDatabase = [];

const router = new Router(function onNotFound(req, res) {
    res.statusCode = 404;
    res.statusMessage = http.STATUS_CODES[404];
    res.setHeader('Content-Type', 'text/plain');
    res.end(http.STATUS_CODES[404] + '\n');
});

//routing starts here
router.get('/create', (req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    const readStream = fs.createReadStream(__dirname + '/render/index.html', 'utf8');
    readStream.pipe(res);
})

router.post('/create', (req, res) => {
    let body = '';
    req.on('data', chunk => {
        body += chunk.toString();
    });
    req.on('end', () => {
        console.log(parse(body));
        const parsedUrl = parse(body).url_input;
        shortenUrl(parsedUrl)
            .then((response) => {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                const readStream = fs.createReadStream(__dirname + '/render//index.html', 'utf8');
                readStream.pipe(res, { end: false });
                readStream.on('end', () => {
                    res.end(response);
                })
            })
        return
    })
})

router.get('/short', (req, res) => {
    const parsedUrl = url.parse(req.url, true);

    const longUrlindex = parsedUrl.query.index;

    if (longUrlDatabase[longUrlindex] === undefined) {
        throw new Error('The requested url was not found in the database');
    }
    else {
        res.writeHead(301, {
            "Location": longUrlDatabase[longUrlindex]
        });
        res.end();
    }
    return
})

//A function to shorten the URL
function shortenUrl(url) {
    return new Promise((resolve, reject) => {
        //Some validation here.
        if (url.length <= 25) {
            resolve('<p class = err>The url introduced is not long enough<p>');
        }

        if (longUrlDatabase.indexOf(url) !== -1) {
            resolve(`<p class = err>The url that you are trying to shorten alreadey exists in the database, its shorten url is <a href = "http://localhost:8080/short?index=${longUrlDatabase.indexOf(url)}"> http://localhost:8080/short?index=${longUrlDatabase.indexOf(url)}</a></p>`);
            return
        }

        getStatusCode(url)
            .then((code) => {
                console.log(code);
                if (code >= 400) {
                    resolve('There is a problem with the url that you are trying to shrink');
                    return
                }
                longUrlDatabase.push(url);
                console.log(longUrlDatabase);
                resolve(`<p class = "succes">Your shorten URL is <a href = "http://localhost:8080/short?index=${longUrlDatabase.indexOf(url)}">http://localhost:8080/short?index=${longUrlDatabase.indexOf(url)}</a></p>`)
                return
            });
    })
    function getStatusCode(url) {
        return new Promise((resolve, reject) => {
            if (url.includes('https')) {
                https.get(url, (resp) => {
                    resolve(resp.statusCode);
                });
            }
            else {
                http.get(url, (resp) => {
                    resolve(resp.statusCode);
                })
            }
        })
    }
}

const server = http.createServer(function (req, res) {
    router.dispatch(req, res)
})

server.listen(8080, () => {
    console.log('Now listening at port 8080 ya fellows!');
})