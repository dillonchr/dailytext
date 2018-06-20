const https = require('https');
const {parse} = require('node-html-parser');

module.exports = (callback) => {
    const now = new Date();
    const month = now.getMonth() + 1;
    const day = now.getDate();
    const year = now.getFullYear();
    const req = https.get(`${process.env.DAILYTEXT_API_URL_PREFIX}/${year}/${month}/${day}`, (res) => {
        let body = '';
        res
            .on('data', chunk => body += chunk)
            .on('end', () => {
                if (res.statusCode === 200) {
                    try {
                        const data = JSON.parse(body);
                        const document = parse(data.items[0].content);
                        const result = {
                            date: document.querySelector('header').text.trim(),
                            themeScripture: document.querySelector('.themeScrp em').text.trim(),
                            themeScriptureLocation: document.querySelector('.themeScrp a.b').text.trim(),
                            comments: document.querySelector('.bodyTxt').text.trim()
                        };
                        callback(null, result);
                    } catch(err) {
                        callback(err);
                    }
                } else {
                    callback(new Error(res.statusCode));
                }
            })
            .on('error', callback);
    });
};
