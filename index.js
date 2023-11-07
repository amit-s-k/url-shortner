// Import required modules
import express from "express"
import mongoose from "mongoose";
import {nanoid} from "nanoid";
import * as userDao from "./users/user-dao.js"
import * as urlDao from "./urls/url-dao.js"
// Set up Express
const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/url_shortener', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});



// Define endpoint for shortening URLs
app.post('/shorten', async (req, res) => {
    console.log("sending post request")

    const { longUrl, userId } = req.body;
    const  user =  await userDao.findOne(userId)
    if (!user) {
        return res.status(404).send('User not found');
    }
    console.log("user is ",user)
    if (user.requestCount >= getRequestLimit(user.tier)) {
        return res.status(429).send('Request limit exceeded');
    }

    const existingUrl = await urlDao.findByLongUrlAndUserId( longUrl, userId );
    if (existingUrl) {
        return res.send(existingUrl);
    }

    const shortUrl = nanoid(7); // Generate a random short URL
    // const url = new Url({ longUrl, shortUrl, userId });
    const url = await urlDao.create(longUrl, shortUrl, userId);

    let userUpdated = {...user,requestCount:user.requestCount+1}
    console.log("hey the updated user is ")
    console.log(userUpdated)
    await userDao.updateOne(user,userUpdated)

    res.send(url);
});

// Define endpoint for retrieving the history of shortened URLs by a user
app.get('/history/:userId', async (req, res) => {
    const { userId } = req.params;
    const urls = res.send(urls);
});

// Define endpoint for redirecting short URLs
app.get('/:shortUrl', async (req, res) => {
    const { shortUrl } = req.params;
    const url = await urlDao.findByShortUrl(shortUrl );
    if (url) {
        return res.redirect(url.longUrl);
    }
    res.status(404).send('URL not found');
});

// Function to get request limit based on user tier
function getRequestLimit(tier) {
    switch (tier) {
        case 1:
            return 1000;
        case 2:
            return 100;
        default:
            return 1000;
    }
}


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
