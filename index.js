const express = require('express');
const nodeHtmlToImage = require('node-html-to-image');
const path = require('path');
const csrf = require('csurf');
const cookieParser = require('cookie-parser');

const app = express();
const port = process.env.PORT || 3006;

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.use(cookieParser());
const csrfProtection = csrf({
    cookie: true
});

app.listen(port, function() {
    console.log('listening on port ' + port);
});

function random_item(items) {
    return items[Math.floor(Math.random() * items.length)];

}
const items = ['#DFE6E9', '#F6E58D', '#DFEBB0', '#FFD08A', '#D9D9D9'];

app.get('/', csrfProtection, function(req, res) {
    res.header('X-Frame-Options', 'DENY');
    res.header('X-XSS-Protection', '1; mode=block');
    res.header('X-Content-Type-Options', 'nosniff');
    res.header('Strict-Transport-Security', 'max-age=63072000');

    const current_page = 'https://' + req.headers.host + req.url;

    res.render('home', {
        post: {
            title: 'Tamil Kavithai image Maker',
            description: 'Tamil Kavithai image Maker - Just add your Tamil Kavithai it will Generate the image with the text you add - Free kavithai Maker.',
            seo_url: current_page,
            facebook: 'https://www.facebook.com/tamilsmsblog',
            twitter: '@tamilsmsblog',
            twitteruser: '@tamilsmsblog',
            og_image: current_page+ 'kavithai-maker.png',
            csrfToken: req.csrfToken()
        }
    });
});

app.post('/kavithai', csrfProtection, async function(req, res) {
    res.header('X-Frame-Options', 'DENY');
    res.header('X-XSS-Protection', '1; mode=block');
    res.header('X-Content-Type-Options', 'nosniff');
    res.header('Strict-Transport-Security', 'max-age=63072000');

    const random_id = Math.floor(1000 + Math.random() * 9000)
    const basename = "tamil-kavithai-" + random_id
    const current_page = 'https://' + req.headers.host + req.url;

    const get_kavithai = req.body.kavithai || "Your Kavithai Content";
    const image = await nodeHtmlToImage({
        content: {
            content: get_kavithai
        },
        puppeteerArgs: {
            args: ["--no-sandbox"]
        },
        type: 'jpeg',
        quality: 70,
        html: `<html> <head> <link rel="preconnect" href="https://fonts.googleapis.com"> <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin> <link href="https://fonts.googleapis.com/css2?family=Baloo+Thambi+2:wght@400;500;600;700&display=swap" rel="stylesheet"> <style>body{width: 1080px; height: 1080px; background-color: ${random_item(items)}; font-family: 'Baloo Thambi 2', cursive; font-weight: 700;}p{color: #222222; font-size: 38px; font-family: 'Baloo Thambi 2', cursive; font-weight: 700; line-height: 1.6; text-align: center; white-space: pre-wrap;}.container{height: 90%; width: 100%; display: flex; position: fixed; align-items: center; justify-content: center;}#footer{position:absolute; bottom:0; width:100%; height: 60px; text-align: center; align-items: center; justify-content: center; color: #222222; font-size: 35px; font-family: 'Baloo Thambi 2', cursive; font-weight: 700; line-height: 1.6;}</style> </head> <body> <div class="container"> <p class="card">{{content}}</p></div><div id="footer">#tamilsms</div><br></body> </html>`
    })
    const b64 = Buffer.from(image).toString('base64');
    res.render('download', {
        post: {
            name: 'Download your image - Tamil Kavithai image Maker',
            description: 'Tamil Kavithai image Maker - Just add your Tamil Kavithai it will Generate the image with the text you add - Free kavithai Maker.',
            base: b64,
            seo_url: current_page,
            title: basename
        }
    });
    //res.send('<a href=data:'+ mimeType + ';base64,'+ b64 +' download="' + basename +'.jepg">download</a>');
    //res.writeHead(200, { 'Content-Type': 'image/jpeg' });
    //res.end(image, 'binary');
    //res.set({
    //  'Content-Type': 'image/jpeg'
    // });
    //res.header('Content-Disposition', `attachment; filename="${basename}.jpeg"`)
    //res.send(image);
});

app.use('/', function(req, res) {
    res.status(404).json({
        error: 1,
        message: 'Web App Error'
    });
});
app.use(function(err, req, res, next) {
    if (err.code !== 'EBADCSRFTOKEN') return next(err)
    res.status(403).json({
        error: 1,
        message: 'Token Error'
    });
})