const {
    updateMultiplanner
} = require("multiplanner");

const readJSONSync = require('./functies/readJSONSync.js');

const config = readJSONSync("config");

updateMultiplanner(config.ns_app_key_primary);