const { generatePassword } = require('generator-sec-password');

// Генерация пароля по умолчанию (12 символов, включая буквы, цифры и спецсимволы)
const password = generatePassword();
console.log(password);

// Генерация пароля с определенной длиной и опциями
const customPassword = generatePassword(16, { includeLetters: true, includeNumbers: true, includeSpecialChars: false });
console.log(customPassword);