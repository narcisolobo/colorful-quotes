import {
  getRandomQuote,
  getRandomQuotes,
  getFilteredQuotes,
} from './services/quote-service.js';
import { logAuthor, logQuote } from './utils/chalk-utils.js';

/**
 * Helper function to log a nicely-formatted quote to the console in color.
 * @param {Quote} quote The Quote object to be logged.
 * @returns {void}
 */
function displayQuote(quote) {
  logQuote(`"${quote.body}"`);
  logAuthor(`-- ${quote.author}`);
}

// top-level await - available in Node v14.8.0^
// https://nodejs.org/en/blog/release/v14.8.0
const randomQuote = await getRandomQuote();
displayQuote(randomQuote);

const randomQuotes = await getRandomQuotes();
randomQuotes.forEach((quote) => {
  displayQuote(quote);
});

const programmingQuotes = await getFilteredQuotes('programming', 'tag');
programmingQuotes.forEach((quote) => {
  displayQuote(quote);
});
