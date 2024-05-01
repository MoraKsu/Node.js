// Генерация случайного целого числа в заданном диапазоне
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
  
// Функция для генерации безопасного пароля
function generatePassword(length = 12, options = {}) {
    const defaults = {
      includeLetters: true,
      includeNumbers: true,
      includeSpecialChars: true,
      excludeSimilarChars: true,
      excludeAmbiguousChars: true
    };
  
    const settings = { ...defaults, ...options };
  
    let chars = '';
    if (settings.includeLetters) chars += 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (settings.includeNumbers) chars += '0123456789';
    if (settings.includeSpecialChars) chars += '!@#$%^&*()-_=+[{]}|;:,<.>/?';
  
    if (settings.excludeSimilarChars) {
      chars = chars.replace(/[ilLI|`oO0]/g, ''); // исключаем похожие символы
    }
  
    if (settings.excludeAmbiguousChars) {
      chars = chars.replace(/[{}[]()|<>?!@#$%^&*:;]/g, ''); // исключаем неоднозначные символы
    }
  
    let password = '';
    for (let i = 0; i < length; i++) {
      password += chars.charAt(getRandomInt(0, chars.length - 1));
    }
  
    return password;
}
  
module.exports = {
    generatePassword
};