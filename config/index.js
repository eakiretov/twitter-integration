'use strict';

module.exports = {
    PORT: process.env.PORT || 3000,
    MONGO_DB_URI: 'mongodb://localhost/twitter-integration',
    BASE_URI: 'http://localhost:3000',
    TWITTER_CONSUMER_KEY: 'JHpasaV9R8YdQpix5Pg2WWIH9',
    TWITTER_CONSUMER_SECRET: 'YgBctF9mhOpE86RKvdTXd5b5iNTtcNPtxpVj6ZJH98Zq7SwIwU',
    TWITTER_REQUEST_TOKEN_URL: 'https://api.twitter.com/oauth/request_token',
    TWITTER_ACCESS_TOKEN_URL: 'https://api.twitter.com/oauth/access_token'
};
