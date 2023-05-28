import chalk from 'chalk';

/**
 * This helper function logs the body of a Quote object
 * in bright cyan to the console.
 * @param {string} quoteBody The body of the quote.
 * @returns {void}
 */
function logQuote(quoteBody) {
  console.log(chalk.cyanBright(quoteBody));
}

/**
 * This helper function logs the author of a Quote object
 * in bright green to the console.
 * @param {string} quoteAuthor The author of the quote.
 * @returns {void}
 */
function logAuthor(quoteAuthor) {
  console.log(chalk.greenBright(quoteAuthor));
}

/**
 * This helper function logs an error in bright red to the
 * console.
 * @param {Error | string} error The error object or string.
 * @returns {void}
 */
function logError(error) {
  console.log(chalk.redBright(error));
}

export { logQuote, logAuthor, logError };
