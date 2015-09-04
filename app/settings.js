var API_ROOT = 'https://www.reddit.com';

var ACCOUNT_STATE = {
    'UNKNOWN': 0,
    'LOGGEDIN': 1,
    'LOGGEDOUT': 2
};

var API = {
    LOGIN: API_ROOT + '/api/login',
    ME: API_ROOT + '/api/me.json'
};

var SUBREDDIT_ORDERS = {
    HOT: 'hot',
    TOP: 'top',
    NEW: 'new',
    RANDOM: 'random',
    CONTROVERSIAL: 'controversial'
};

var CONTENT_TYPES = {
    COMMENT: 't1',
    ACCOUNT: 't2',
    LINK: 't3',
    MESSAGE: 't4',
    SUBREDDIT: 't5',
    AWARD: 't6',
    PROMO_CAMPAIGN: 't8'
};

export default {
  ACCOUNT_STATE: ACCOUNT_STATE,
  API: API,
  SUBREDDIT_ORDERS: SUBREDDIT_ORDERS,
  CONTENT_TYPES: CONTENT_TYPES
};
