/* 
To get this project working, you need to install imagemagick on your machine, not on your node_modules folder.
This doesn't work when I only install as npm dependencies. 
For more details, follow README.md file for this project.

Youtube video referenced for all code and study of web components : 
https://youtu.be/tHJwRWrexqg

By Google Chrome Developers Youtube Channel
Title : Supercharged Live Live Live! (Polymer Summit 2017)
*/

const express = require('express');
const fs = require('fs');
const { promisify } = require('util');

const readFile = promisify(fs.readFile);
const im = require('gm').subClass({
    imageMagick: true
});

const app = express();

const thumbSize = 16; //blurred or pixelated img resolution

app.get('/', async (req, res) => {
    let filepath = req.url;

    if (filepath.endsWith('/')) {
        filepath += 'index.html';
    }

    const buffer = await readFile('./static/' + filepath);
    const content = buffer.toString();
    const newContent = await Promise.all(
        content
            .split(/(<sc-img[^>]+><\/sc-img>)/)
            .map(async item => {
                if (!item.startsWith('<sc-img'))
                    return item;

                try {
                    const src = /src="([^"]+)"/.exec(item)[1];
                    const img = im('./static/' + src);

                    const sizeFunc = promisify(img.size.bind(img));

                    const { width, height } = await sizeFunc();

                    const thumbFunc = promisify(img.resize(thumbSize, thumbSize).toBuffer.bind(img));
                    const thumb = await thumbFunc('PNG'); //low resolution thumbnail

                    //inline low res image using data base64
                    const thumbURL = `data:image/png;base64,${thumb.toString('base64')}`;

                    //the css aspect ratio trick
                    return item.replace('></sc-img>', `style="padding-top: ${height / width * 100}%; background-image: url(${thumbURL})"></sc-img>`);
                } catch {
                    console.log("Oops! Most Likely, you don't have imagemagick/graphicsmagick installed on your system. Please follow instructions on README.md to resolve this issue");
                }
            })
    );

    res.send(newContent.join(''));
});

app.use(express.static('static'));
app.listen(8080, () => console.log('Server started on port 8080'));