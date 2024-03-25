const axios = require('axios');
const BASE_URL = 'https://echo-serv.tbxnet.com/v1/secret/file/';
const AUTH_TOKEN = 'Bearer aSuperSecretKey';

/**
 * Retrieves all file rows by its name
 * @param {String} filename the filename 
 * @returns {String} the file contents
 */
const getFileRows = async (filename) => {
    try {
        // Sends an HTTP request and set API token 
        const res = await axios.get(BASE_URL+filename, {
            headers: {
                Authorization: AUTH_TOKEN
            }
        });
        return res.data;
    } catch (e) {
        console.log('Error trying to retrieve: '+filename);
    }
}

module.exports = { getFileRows }