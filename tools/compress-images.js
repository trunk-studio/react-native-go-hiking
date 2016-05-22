const imagemin = require('imagemin');
const imageminMozjpeg = require('imagemin-mozjpeg');
const imageminPngquant = require('imagemin-pngquant');

imagemin(['./app/images/cover/1/*.{jpg,png}'], '../build/images/cover', {
    plugins: [
        imageminMozjpeg({targa: true}),
        imageminPngquant({quality: '65-80'})
    ]
}).then(files => {
    console.log(files);
});
