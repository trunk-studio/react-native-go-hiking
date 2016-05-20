var pathListData = require('./app/json/data');
// console.log(pathListData);
var exec = require('child_process').exec;
const coverImagesPath =  './app/images/covers/';

// check covers folder exist
var cmd = 'mkdir -p ${coverImagesPath}';
exec(cmd, function(error, stdout, stderr) {
  // command output is in stdout
});

// download cover images
for (var path of pathListData) {
  var header = '--header="User-Agent: Mozilla/5.0 (Windows NT 6.0) AppleWebKit/537.11 (KHTML, like Gecko) Chrome/23.0.1271.97 Safari/537.11" --header="Referer: http://xmodulo.com/" --header="Accept-Encoding: compress, gzip"';
  var cmd = `mkdir -d -p ${coverImagesPath};wget ${path.cover} -O ${coverImagesPath}/cover${path.id}.jpg ${header}`;
  exec(cmd, function(error, stdout, stderr) {
    // command output is in stdout
  });
}

for (var path of pathListData) {
  var coverName = `${coverImagesPath}cover${path.id}`;
  var cmd = `convert ${coverName}.jpg -resize 1024x768 ${coverName}_l.jpg;`+
  `convert ${coverName}.jpg -resize 640x480 ${coverName}_m.jpg;`+
  `convert ${coverName}.jpg -resize 320x240 ${coverName}_s.jpg;`;
  exec(cmd, function(error, stdout, stderr) {
    // command output is in stdout
  });
}
