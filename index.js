// Import npm packages
import inquirer from 'inquirer';
import qr from 'qr-image';
import isUrlHttp from 'is-url-http';

import fs from 'fs';

// Set up the prompt question in inquirer npm package
const question = [
    {
        type: 'input',
        name: 'URL',
        message: 'Type the URL here: ',

        // Validate input using isUrlHttp npm package
        validate(input) {
            const pass = isUrlHttp(input);
            if (pass === true) {
                return true;
            }
            return 'Please enter a valid URL.';
        }
    }
];

// Create function to generate QR code
function qrCodeGenerator(url) {

    // Generate QR code in 'qr-code.png' file using qr-image npm package
    const qr_png = qr.image(url);
    qr_png.pipe(fs.createWriteStream('qr-code.png'));
    console.log('Your QR code is stored in the "qr-code.png" file.');

    // Write URL in 'URL.txt' file
    fs.writeFile('URL.txt', url, err => {
        if (err) {
            console.error(err);
        } else {
            console.log('Your URL is stored in the "URL.txt" file.');
        }
    });
    
};

// Prompt user to input URL using inquirer npm package
// Then generate QR code with qrCodeGenerator function
inquirer.prompt(question).then((answers) => {
    const url = answers.URL;
    qrCodeGenerator(url);
});
