const readline = require('readline');

const input = [];

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.prompt();

rl.on('line', cmd => input.push(cmd));

rl.on('close', () => {
    const email = getEmailAddress(input);
    const phone = getPhoneNumber(input);
    console.log('email: ', email);
    console.log('phone: ', phone);

    process.exit(0);
});

const getEmailAddress = contactInfo => {
    const regex = new RegExp('@');
    const email = contactInfo.find(item => regex.test(item));
    return email ? email : 'No e-mail found';
}

const getPhoneNumber = contactInfo => {
    const regexPhonePattern = new RegExp('([0-9]{3})[-. ]?([0-9]{4})');

    const possiblePhone = contactInfo.filter(item => regexPhonePattern.test(item));

    const regexFax = new RegExp(/^fax|^fx|^f/i)
    const phoneFormatted = possiblePhone.filter(item => !regexFax.test(item))

    const phone = phoneFormatted.join();

    return phone.replace(/\D/g,'');
}
