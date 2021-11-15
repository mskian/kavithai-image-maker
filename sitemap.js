const {
    buildSitemaps
} = require('express-sitemap-xml');
const fs = require('fs');
require('dotenv').config();

async function run() {
    const urls = ['/']
    const sitemaps = await buildSitemaps(urls, process.env.URL)

    fs.writeFileSync('./public/sitemap.xml', sitemaps['/sitemap.xml']);
    console.log(sitemaps['/sitemap.xml']);

};

run();