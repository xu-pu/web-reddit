'use strict';

var API_ROOT = 'https://www.reddit.com';

module.exports.ACCOUNT_STATE = {
    'UNKNOWN': 0,
    'LOGGEDIN': 1,
    'LOGGEDOUT': 2
};

module.exports.API = {
    LOGIN: API_ROOT + '/api/login',
    ME: API_ROOT + '/api/me.json'
};

module.exports.SUBREDDIT_ORDERS = {
    HOT: 'hot',
    TOP: 'top',
    NEW: 'new',
    RANDOM: 'random',
    CONTROVERSIAL: 'controversial'
};