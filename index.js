const readline = require('readline');
const chalk = require('chalk');

const input = [];

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.setPrompt(chalk.red.bold.underline('Enter business card information:'));
rl.prompt();

// Each line entered becomes a separate item of type string in the input array
rl.on('line', cmd => input.push(cmd.trim()));

rl.on('close', () => {
    const inputTrimmed = input.filter(i => i != '');

    const name = getName(inputTrimmed);
    const phone = getPhoneNumber(inputTrimmed);
    const email = getEmailAddress(inputTrimmed);

    console.log(chalk.inverse('Here is your contact information:'));
    console.log(chalk.green.underline('Name:'), name);
    console.log(chalk.green.underline('Phone:'), phone);
    console.log(chalk.green.underline('Email:'), email);

    process.exit(0);
});

const getName = contactInfo => {
    const email = getEmailAddress(input);
    // Save the portion of the email before the @ for comparison to the name
    const mailbox = email.substring(0, email.indexOf('@'));
    let name;

    // 1st - filter out the email & any field with a containing a number from the contactInfo array
    // 2nd - map thru the remaining items, performing these steps:
        // convert each string into an array of separate words
        // map thru each string in that arr array to see if const mailbox includes any item from that arr array.
        // if there is a match, assign the entire string (item) to 'name'
    // This works under the assumption the mailbox portion of the email address contains the first or last name of the person and neither name is part of any other items of info.
    contactInfo.filter(c => !(c === email) && !(/\d/.test(c))).map(item => {
        const arr = item.split(' ');
        const result = arr.map(a => mailbox.includes(a.toLowerCase()));
        if (result.includes(true)){
          name = item;
        }
        return;
    });
    return name ? name : chalk.bgRed.bold('No name found.');
};

const getEmailAddress = contactInfo => {
    // Assumes the only piece of info. with the @ symbol is the e-mail address
    const regex = new RegExp('@');
    const email = contactInfo.find(item => regex.test(item));
    return email ? email : chalk.bgRed.bold('No e-mail address found.');
};

const getPhoneNumber = contactInfo => {
    // Assumes all phone number contain the pattern of 3digits then 4digits, separated by either a -, ., or space
    const regexPhonePattern = new RegExp('([0-9]{3})[-. ]?([0-9]{4})');
    const possiblePhone = contactInfo.filter(item => regexPhonePattern.test(item));

    // Assumes all fax numbers are labelled, starting with fax, fx, or f
    const regexFax = new RegExp(/^fax|^fx|^f/i);
    const phoneFormatted = possiblePhone.filter(item => !regexFax.test(item));

    // Converts an array of one string to a string
    const phone = phoneFormatted.join();

    // Strips all non-numeric characters from string
    return phone ? phone.replace(/\D/g,'') : chalk.bgRed.bold('No phone number found.');
};
