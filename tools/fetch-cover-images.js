const fs = require('fs');
const pathListData = require('../app/json/data');
// console.log(pathListData);
const execSync = require('child_process').execSync;
const coverImagesPath =  './app/images/cover';

var shell = function(cmd) {
  execSync(cmd);
};

// check covers folder exist
shell(`mkdir -p ${coverImagesPath}`);

// download cover images
for (var path of pathListData) {

  shell(`mkdir -p ${coverImagesPath}/${path.id}`);
  
  var coverName = `${coverImagesPath}/${path.id}/${path.id}`;

  if (!fs.existsSync(`${coverName}.jpg`)) {
    var header = '--header="User-Agent: Mozilla/5.0 (Windows NT 6.0) AppleWebKit/537.11 (KHTML, like Gecko) Chrome/23.0.1271.97 Safari/537.11"';
    console.log(`Download ${path.cover}`);
    shell(`wget '${path.cover}' -O ${coverName}.jpg ${header}`);
  }

  console.log(`Compress ${coverName}.jpg`);

  shell(`convert ${coverName}.jpg -quality 80 -resize 1024x768 ${coverName}_l.jpg;`);
  shell(`convert ${coverName}.jpg -quality 80 -resize 640x480  ${coverName}_m.jpg;`);
  shell(`convert ${coverName}.jpg -quality 80 -resize 320x240  ${coverName}_s.jpg;`);
  shell(`convert ${coverName}.jpg -quality 60 -resize 240x160  ${coverName}_t.jpg;`);
}
