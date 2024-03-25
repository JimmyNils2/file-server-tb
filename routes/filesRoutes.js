const { Router } = require('express');
const { csvFormatting } = require('../helpers/csvFormatting');
const { getFileNames } = require('../services/getFileNames');
const { getFileRows } = require('../services/getFileRows');

// Creates a router object
const filesRoutes = Router();

/**
 * Creates a path to handle the GET requests for all files
 */
filesRoutes.get('/data', async (req, res) => {
    try {
        //Gets file names
        const fileNames = await getFileNames();
        const formattedData = [];
        
        // Iterates for each name
        for (const fileName of fileNames) {
            
            // Retrieves file contents
            const csv = await getFileRows(fileName);
            
            // Checks for file contents
            if(!csv) continue;
            
            // Formats the file content
            const formattedRows = csvFormatting(csv, fileName);
            
            // Checks for formatted contents
            if(formattedRows.length == 0) continue;
            
            // Appends a new file name and its contents
            formattedData.push(
                {
                    'file': fileName,
                    'lines': formattedRows
                }
            )
        }
        // Sends an HTTP response and set its status
        res.json(formattedData).status(200);
    } catch (e) {
        console.log(e);
        res.status(500).send('Internal server error');
    }
});

/**
 * Creates a path to handle the GET requests by file name for a file
 */
filesRoutes.get('/data/:fileName', async (req, res) => {

    try{
        // Retrieves the query param
        const fileName = req.params.fileName;

        // Retrieves file contents
        const csv = await getFileRows(fileName);

        // Checks if the file exists
        if(!csv){
            res.send('File not found').status(400);
            return
        }

        // Formats the file content
        const formattedRows = csvFormatting(csv, fileName);
                
        // Checks for formatted contents
        if(formattedRows.length == 0) {
            res.send('Empty file').status(200);
            return
        };
        
        // Appends a new file name and its contents
        const formattedFile = {
                'file': fileName,
                'lines': formattedRows
        }

        res.json(formattedFile).status(200);
    }catch(e){
        console.log(e);
        res.status(500).send('Internal server error');
    }
})

/**
 * Creates a path to handle the GET requests for a list of file names
 */
filesRoutes.get('/list', async (req, res) => {

    try {
        // Gets file names
        const fileNames = await getFileNames();
        
        // Formats the list of names
        const formattedList = {
            'files': fileNames
        }
        //Sends an HTTP response and set its status
        res.json(formattedList).status(200);

    } catch (e) {
        console.log('Error trying to retrieve the file list', e);
        res.status(500).send('Internal server error');
    }
});

module.exports = filesRoutes;