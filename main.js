var filereader = require('./filereader');
var minifer = require('./css-minifer');
var fs = require('fs');

var basePath = '/home/rishab/Web Projects/topintowncom';
var srcPath = basePath + '/public_html';
var releasePath = basePath + '/release';

var files = filereader.getAllFiles(srcPath);

// for (file of files) {
    let file = files[1];
    fs.readFile(file, (err, data) => {
        // if (err) {
        //     console.log(file);
        //     throw err;
        // }

        let fileNameParts = file.split('.');
        let type = fileNameParts.pop();
        if (minifer.validFileType(type)) {
            console.log('File type is ', type);
            minifer.minify(type, data.toString());
        } else {
            console.log("Not a valid file ", file);
        }
        
    });
// }