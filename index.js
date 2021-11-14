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
  res.render('home', {
      post: {
          title: 'Kavithai image maker',
          description: 'Just add the Kavithai it will Generate the image with Text you add.',
          csrfToken: req.csrfToken()
      }
  });
});

app.post('/kavithai', csrfProtection, async function(req, res) {
    res.header('X-Frame-Options', 'DENY');
    res.header('X-XSS-Protection', '1; mode=block');
    res.header('X-Content-Type-Options', 'nosniff');
    res.header('Strict-Transport-Security', 'max-age=63072000');

    const get_kavithai = req.body.kavithai || "Your Kavithai Content";
        const image = await nodeHtmlToImage({
            content: { content: get_kavithai },
            puppeteerArgs: { args: ["--no-sandbox"] },
            type: 'jpeg',
            quality: 70,
            html: `<html> <head> <link rel="preconnect" href="https://fonts.googleapis.com"> <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin> <link href="https://fonts.googleapis.com/css2?family=Baloo+Thambi+2:wght@400;500;600;700&display=swap" rel="stylesheet"> <style>body{width: 1080px; height: 1080px; background-color: ${random_item(items)}; font-family: 'Baloo Thambi 2', cursive; font-weight: 700;}p{color: #222222; font-size: 38px; font-family: 'Baloo Thambi 2', cursive; font-weight: 700; line-height: 1.6; text-align: center; white-space: pre-wrap;}.container{height: 90%; width: 100%; display: flex; position: fixed; align-items: center; justify-content: center;}#footer{position:absolute; bottom:0; width:100%; height: 60px; text-align: center; align-items: center; justify-content: center; color: #222222; font-size: 35px; font-family: 'Baloo Thambi 2', cursive; font-weight: 700; line-height: 1.6;}</style> </head> <body> <div class="container"> <p class="card">{{content}}</p></div><div id="footer">#tamilsms</div><br></body> </html>`
          })
            res.writeHead(200, { 'Content-Type': 'image/jpeg' });
            res.end(image, 'binary');
    }
);

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