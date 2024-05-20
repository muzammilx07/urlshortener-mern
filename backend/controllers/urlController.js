const Url = require('../models/Url');
const shortid = require('shortid');

const createShortUrl = async (req, res) => {
    const { originalUrl, customAlias, expirationDate } = req.body;
    let shortUrl = customAlias || shortid.generate();

    try {
        let url = await Url.findOne({ shortUrl });
        if (url) {
            return res.status(400).json('Alias already in use');
        }

        url = new Url({
            originalUrl,
            shortUrl,
            expirationDate,
            customAlias,
        });

        await url.save();
        res.json({ shortUrl: `${req.headers.host}/${shortUrl}` });
    } catch (err) {
        console.error(err);
        res.status(500).json('Server error');
    }
};

const redirectUrl = async (req, res) => {
    const { shortUrl } = req.params;

    try {
        const url = await Url.findOne({ shortUrl });
        if (url) {
            if (url.expirationDate && new Date() > url.expirationDate) {
                return res.status(410).send('URL has expired');
            }
            return res.redirect(url.originalUrl);
        } else {
            return res.status(404).send('URL not found');
        }
    } catch (err) {
        console.error(err);
        res.status(500).json('Server error');
    }
};

module.exports = {
    createShortUrl,
    redirectUrl,
};
