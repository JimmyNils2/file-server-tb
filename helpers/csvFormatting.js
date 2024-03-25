const HEX_REG = /^[0-9A-Fa-f]{32}$/;

/**
 * Formats a file contents and checks different conditions
 * @param {String} csv The file contents in .CSV format
 * @param {String} currentFile The file name
 * @returns {Array} A list with the formatted rows
 */
const csvFormatting = (csv, currentFile) => {
    const rows = csv.split('\n');
    const formattedRows = [];

    // Iterates for each row
    rows.forEach(row => {
        
        const columns = row.split(',');

        //Checks the number of columns
        if(columns.length != 4) {
            return;
        };

        const [filename, text, num, hex] = columns;

        // Checks the file name
        if(filename != currentFile){
            return;
        }

        // Checks text
        if(text.length == 0){
            return;
        }
        
        // Checks number
        if(isNaN(num)){
            return
        }

        // Checks HEX code
        if(!HEX_REG.test(hex)){
            return;
        }
        
        // Appends the formatted rows
        formattedRows.push(
            {
                'text': text,
                'number': parseInt(num),
                'hex': hex
            }
        )
    });

    return formattedRows;
}

module.exports = {
    csvFormatting 
}