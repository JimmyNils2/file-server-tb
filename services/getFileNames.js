const axios = require('axios');
const BASE_URL = 'https://echo-serv.tbxnet.com/v1/secret/files';
const AUTH_TOKEN = 'Bearer aSuperSecretKey';

/**
 * Retrieves a list of file names
 * @returns {Array} the file of file names
 */
const getFileNames = async () => {
    try {
        // Sends an HTTP request and set API token
        const res = await axios.get(BASE_URL, {
            headers: {
                Authorization: AUTH_TOKEN
            }
        });
        return res.data.files
    } catch (e) {
        console.log('Error trying to retrieve the file name list', e);
    }
}

module.exports = { getFileNames }