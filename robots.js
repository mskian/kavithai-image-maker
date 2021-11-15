const robotstxt = require("generate-robotstxt");
const fs = require('fs');
require('dotenv').config();

robotstxt({
        policy: [{
                userAgent: "NinjaBot",
                allow: "/",
            },

            {
                userAgent: "Mediapartners-Google*",
                allow: "/",
            },

            {
                userAgent: "Adsbot-Google",
                allow: "/",
            },

            {
                userAgent: "Googlebot-Mobile",
                allow: "/",
            },

            {
                userAgent: "SemrushBot-SA",
                disallow: "/",
            },

            {
                userAgent: "SemrushBot",
                disallow: "/",
            },

            {
                userAgent: "AhrefsBot",
                disallow: "/",
            },

            {
                userAgent: "MJ12bot",
                disallow: "/",
            },

            {
                userAgent: "HTTrack",
                disallow: "/",
            },

        ],

        sitemap: `${process.env.URL}/sitemap.xml`
    })
    .then((content) => {
        fs.writeFileSync('./public/robots.txt', content);
        console.log(content);

        return content;
    })
    .catch((error) => {
        throw error;
    });