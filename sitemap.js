const {
    buildSitemaps
} = require('express-sitemap-xml');
const fs = require('fs');
require('dotenv').config();

const today = new Date();
const dd = String(today.getDate()).padStart(2, '0');
const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
const yyyy = today.getFullYear();
const date = mm + '-' + dd + '-' + yyyy;

async function run() {
    const urls = [{
        url: '/1',
        lastMod: date,
        changeFreq: 'daily'
    }]
    const sitemaps = await buildSitemaps(urls, process.env.URL)

    fs.writeFileSync('./public/sitemap.xml', sitemaps['/sitemap.xml']);
    console.log(sitemaps['/sitemap.xml']);

};

run();