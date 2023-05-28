import {
  getRandomQuote,
  getRandomQuotes,
  getFilteredQuotes,
} from './services/quote-service.js';
import { logAuthor, logQuote } from './utils/chalk-utils.js';

// top-level await - available in Node v14.8.0^
// https://nodejs.org/en/blog/release/v14.8.0
const randomQuote = await getRandomQuote();
logQuote(`"${randomQuote.body}"`);
logAuthor(`-- ${randomQuote.author}`);

const randomQuotes = await getRandomQuotes();
randomQuotes.forEach((quote) => {
  logQuote(`"${quote.body}"`);
  logAuthor(`-- ${quote.author}`);
});

const programmingQuotes = await getFilteredQuotes('programming', 'tag');
programmingQuotes.forEach((quote) => {
  logQuote(`"${quote.body}"`);
  logAuthor(`-- ${quote.author}`);
});
