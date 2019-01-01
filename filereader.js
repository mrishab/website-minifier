var fs = require('fs');
let getAllFiles = function (currentPath) {
    let allFiles = [];
    let files = fs.readdirSync(currentPath, options={withFileTypes:true});
    for (file of files){
        if (file.name.startsWith('.'))
            continue;
        let fullPath = currentPath + '/' + file.name;
        if (file.isDirectory()){
            allFiles = allFiles.concat(getAllFiles(fullPath));
        }
        allFiles.push(fullPath);
    }
    return allFiles;
}

exports.getAllFiles = getAllFiles;