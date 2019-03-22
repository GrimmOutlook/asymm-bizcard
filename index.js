const readline = require('readline');
const chalk = require('chalk');

const input = [];

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.setPrompt(chalk.red.bold.underline('Enter business card information:'));
rl.prompt();

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
    const mailbox = email.substring(0, email.indexOf('@'));
    let name;

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
    const regex = new RegExp('@');
    const email = contactInfo.find(item => regex.test(item));
    return email ? email : chalk.bgRed.bold('No e-mail address found.');
};

const getPhoneNumber = contactInfo => {
    const regexPhonePattern = new RegExp('([0-9]{3})[-. ]?([0-9]{4})');

    const possiblePhone = contactInfo.filter(item => regexPhonePattern.test(item));

    const regexFax = new RegExp(/^fax|^fx|^f/i);
    const phoneFormatted = possiblePhone.filter(item => !regexFax.test(item));

    const phone = phoneFormatted.join();

    // Strips all non-numeric characters from string:
    return phone ? phone.replace(/\D/g,'') : chalk.bgRed.bold('No phone number found.');
};
