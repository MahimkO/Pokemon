module.exports = {
  // Базовые правила форматирования
  printWidth: 120,
  tabWidth: 2,
  singleQuote: true,
  semi: true,
  trailingComma: 'es5',
  bracketSpacing: true,
  arrowParens: 'always',
  jsxSingleQuote: false,

  // Подключаем плагины
  plugins: ['prettier-plugin-organize-imports'],

  // Настройки сортировки пропсов
  jsxSortProps: {
    ignoreCase: true,
    shorthandFirst: false,
    shorthandLast: false,
    noSortAlphabetically: false, // сортировать в алфавитном порядке
    reservedFirst: true, // props вроде key, ref — первыми
  },
};
