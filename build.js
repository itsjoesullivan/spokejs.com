var md = require( "markdown" ).markdown,
    toHTML = md.toHTML,
    fs = require('fs'),
    wrench = require('wrench'),
    util = require('util');
    
//init holder
wrench.rmdirSyncRecursive('tmp', function(e) { console.log(e); });
fs.mkdirSync('tmp');

//copy src into tmp
wrench.copyDirSyncRecursive('src', 'tmp');


//operate on tmp

var dir = wrench.readdirSyncRecursive('tmp');
console.log(dir);

var ext = function(name) {
    var dir = name.lastIndexOf('.') > -1 ? (name.lastIndexOf('/') > name.lastIndexOf('.')) : true;
    if(!dir) {
        return name.substring(name.lastIndexOf('.')+1);
    } else {
        return 'dir';
    }
};

dir.forEach(function(pathName) {
    pathName = 'tmp/' + pathName;
    var type = ext(pathName);
    switch(type) {
        case 'md':
            var file = fs.readFileSync(pathName,'binary');
            //var html = toHTML(file);
            var html = file;
            var newPath = pathName.replace(/md$/,'html');
            fs.writeFileSync(newPath,html,'binary');
            fs.unlinkSync(pathName)
    }
});

//put the contents of tmp into out
wrench.rmdirSyncRecursive('out', function() {});
fs.mkdirSync('out');
wrench.copyDirSyncRecursive('tmp', 'out');

//empty out tmp
wrench.rmdirSyncRecursive('tmp', function(e) { console.log(e); });