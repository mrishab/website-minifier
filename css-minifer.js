let querystring = require('querystring');
let http = require('https');

let request = function (config, content){

    console.log("Started sending response");    
    let query = querystring.stringify({
        input: content
    });

    let req = http.request({
            method: 'POST',
            hostname: config.url,
            path: '/' + config.path
        }, function(response){
            console.log(response);
            if (response.status != 200) {
                console.log("Unexpected response code: ", response.status);
                return;
            }
            let data = '';
            response.on('data', (chunk)=> data += chunk);
            response.on('end', () => console.log(data));
        }
    );

    req.on('error', function(err){
        throw err;
    })
    req.setHeader('Content-Type', config.contentType);
    req.setHeader('Content-Length', query.length);
    req.end(query, 'utf8');
}

let config = {
    css: {
        url: 'cssminifier.com',
        path: 'raw',
        contentType: 'application/x-www-form-urlencoded'
    },
    html: {
        url: '',
        path: '',
        contentType: ''
    },
    js: {
        url: 'https://javascript-minifier.com/',
        path: 'raw',
        contentType: 'application/x-www-form-urlencoded'
    },
    jpg: {
        url: 'http://jpgoptimiser.com/',
        path: 'optimise',
        contentType: 'multipart/form-data'
    },
    png: {
        url: 'https://pngcrush.com/crush',
        path: 'crush',
        contentType: 'multipart/form-data'
    },
    json: {
        url: 'https://pngcrush.com/crush',
        path: 'crush',
        contentType: 'multipart/form-data'
    }
}

exports.validFileType = (type) => {return config[type] != undefined}

exports.minify = function(contentType, content) {
    let fileConfig = config[contentType];
    // console.log(content);
    request(fileConfig, content);
}