const nodeHtmlToImage = require('node-html-to-image');


function random_item(items) {
  return items[Math.floor(Math.random() * items.length)];

}
const items = ['#DFE6E9', '#F6E58D', '#DFEBB0', '#FFD08A', '#D9D9D9'];

nodeHtmlToImage({
  output: './image.png',
  puppeteerArgs: { args: ["--no-sandbox"] },
  content: { content: `
  நீ யாருக்கு வேண்டுமானாலும்
  பொய்யாக நடித்து விடலாம்
  உன் மனசாட்சியை தவிர
  உன் மனசாட்சியிடமும்
  நீ பொய்யாக
  நடிக்க முயற்சி செய்வாயானால்
  நஷ்டம் உனக்கு மட்டுமே` },
  html: `
    <html>
    <head>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Baloo+Thambi+2:wght@400;500;600;700&display=swap" rel="stylesheet">
    <style>
    body {
      width: 1080px;
      height: 1080px;
      background-color: ${random_item(items)};
      font-family: 'Baloo Thambi 2', cursive;
      font-weight: 700;
    }
    p {
      color: #222222;
      font-size: 38px;
      font-family: 'Baloo Thambi 2', cursive;
      font-weight: 700;
      line-height: 1.6;
      text-align: center;
      white-space: pre-wrap;
    }
    .container {
      height: 90%;
      width: 100%;
      display: flex;
      position: fixed;
      align-items: center;
      justify-content: center;
    }
    #footer {
      position:absolute;
      bottom:0;
      width:100%;
      height: 60px;
      text-align: center;
      align-items: center;
      justify-content: center;
      color: #222222;
      font-size: 35px;
      font-family: 'Baloo Thambi 2', cursive;
      font-weight: 700;
      line-height: 1.6;
   }
  </style>
    </head>
    <body>
    <div class="container">
    <p class="card">{{content}}</p>
    </div>
    <div id="footer">#tamilsms</div>
    <br>
    </body>
    </html>
  `
})
  .then(() => 
  console.log('The image was created successfully!')
  );