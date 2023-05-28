import axios from 'axios';
import dotenv from 'dotenv';
import { logError } from '../utils/chalk-utils.js';

dotenv.config();
const API_TOKEN = process.env.API_TOKEN;

/**
 * This code is creating an instance of the Axios library with
 * a base URL of 'https://favqs.com/api/' and an Authorization
 * header that includes an API token. This instance can be used
 * to make HTTP requests to the FavQs API.
 */
const http = axios.create({
  baseURL: 'https://favqs.com/api/',
  headers: {
    Authorization: `Token token=${API_TOKEN}`,
  },
});

/**
 * An object representing a quote.
 * @typedef {object} Quote
 * @property {string} body The body of the quote.
 * @property {string} author The author of the quote.
 */

/**
 * A helper function to parse a JSON quote response
 * into a Quote object.
 * @param {JSON} quoteObject The JSON response to parse.
 * @returns {Quote} The parsed JSON object
 */
function parseQuote(quoteObject) {
  const quote = {
    body: quoteObject.body,
    author: quoteObject.author,
  };
  return quote;
}

/**
 * Service to fetch a random quote from the favqs.com API.
 * @returns {Promise<Quote>} The random Quote object.
 */
async function getRandomQuote() {
  try {
    const response = await http.get('/qotd');
    const data = response.data;
    const quote = parseQuote(data.quote);
    return quote;
  } catch (error) {
    logError(error);
  }
}

/**
 * Service to fetch a list of random quotes from the favqs.com API.
 * @returns {Promise<Quote[]>} An array of Quote objects.
 */
async function getRandomQuotes() {
  try {
    const response = await http.get('/quotes');
    const data = response.data;
    const quotes = data.quotes.map((quote) => parseQuote(quote));
    return quotes;
  } catch (error) {
    logError(error);
  }
}

/**
 * Service to fetch a list of filtered quotes from the favqs.com API.
 * @param {string} filter The word to filter by - ex. "programming"
 * @param {("author" | "tag" | "user")} type The type of filter - ex. "tag"
 * @returns {Promise<Quote[]>} An array of Quote objects.
 */
async function getFilteredQuotes(filter, type) {
  try {
    const response = await http.get('/quotes', {
      params: {
        filter,
        type,
      },
    });
    const data = response.data;
    const quotes = data.quotes.map((quote) => parseQuote(quote));
    return quotes;
  } catch (error) {
    logError(error);
  }
}

export { getRandomQuote, getRandomQuotes, getFilteredQuotes };
