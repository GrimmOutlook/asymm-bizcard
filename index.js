const readline = require('readline');

const input = [];

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.prompt();

rl.on('line', cmd => input.push(cmd));

rl.on('close', () => {
    const name = getName(input);
    const phone = getPhoneNumber(input);
    const email = getEmailAddress(input);

    console.log('Name: ', name);
    console.log('Phone: ', phone);
    console.log('Email: ', email);

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
    return name;
};

const getEmailAddress = contactInfo => {
    const regex = new RegExp('@');
    const email = contactInfo.find(item => regex.test(item));
    return email ? email : 'No e-mail found';
};

const getPhoneNumber = contactInfo => {
    const regexPhonePattern = new RegExp('([0-9]{3})[-. ]?([0-9]{4})');

    const possiblePhone = contactInfo.filter(item => regexPhonePattern.test(item));

    const regexFax = new RegExp(/^fax|^fx|^f/i)
    const phoneFormatted = possiblePhone.filter(item => !regexFax.test(item))

    const phone = phoneFormatted.join();

    // Strips all non-numeric characters from string:
    return phone.replace(/\D/g,'');
};
