const nodeHtmlToImage = require('node-html-to-image');

nodeHtmlToImage({
  output: './quotes.png',
  puppeteerArgs: { args: ["--no-sandbox"] },
  content: { content: `
  Life is a gift, and it offers us the privilege, opportunity, and responsibility to give something back by becoming more
  ` },
  html: `
    <html>
    <head>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Mukta:wght@400;500;600;700&display=swap" rel="stylesheet">
    <style>
    body {
      width: 1080px;
      height: 1080px;
      background-color: #A0522D;
      font-family: 'Mukta', sans-serif;
      font-weight: 700;
    }
    p {
      color: #ECF0F1;
      font-size: 38px;
      font-family: 'Mukta', sans-serif;
      font-weight: 700;
      line-height: 1.6;
      text-align: center;
      white-space: initial;
      word-wrap: break-word
    }
    .container {
      height: 91%;
      width: 68%;
      margin-right: auto;
      margin-left: auto;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    #footer {
      position:absolute;
      bottom:0;
      width:95%;
      height: 70px;
      text-align: center;
      align-items: center;
      justify-content: center;
      color: #ECF0F1;
      font-size: 35px;
      font-family: 'Mukta', sans-serif;
      font-weight: 700;
      line-height: 1.6;
   }
  </style>
    </head>
    <body>
    <div class="container">
    <p class="card">{{content}}</p>
    </div>
    <div id="footer">Tony Robbins</div>
    <br>
    </body>
    </html>
  `
})
  .then(() => 
  console.log('The image was created successfully!')
  );