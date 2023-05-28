# Colorful Quotes Assignment
*Difficulty: Intermediate*  
*Expected time to complete: 1 to 2 hours*  
*Full-Time Schedule Placement: End of Second Day*

This example assignment introduces the student to creating an instance of the Axios library for use in a custom service. It also allows the student to get familiar with creating an account with an API provider to acquire an API key and to use that key in an API call.

The assignment allows opportunities for continued practicing with modularization, async/await syntax, and the creation of custom helper utility functions.

The final project uses the [FavQs API](https://favqs.com/api) to fetch a random quote and a list of random quotes. The quotes will be logged to the console in a color of the student's choice using [Chalk](https://github.com/chalk/chalk), hence the name - *Colorful Quotes*. As a ninja bonus, the student can create a second service function to fetch a list of filtered quotes.

The Axios library is our http request library for the stack, hence its usage here instead of fetch.

## Third-Party Packages
- [Axios](https://axios-http.com/) - Promise based HTTP client for the browser and node.js.
- [Chalk](https://github.com/chalk/chalk) - Terminal string styling done right.
- [Dotenv](https://www.npmjs.com/package/dotenv) - Dotenv is a zero-dependency module that loads environment variables from a .env file into `process.env`.

## Steps to Complete
1. Create new project directory and cd into it: `mkdir colorful-quotes && cd colorful-quotes`
2. Create index.js: `touch index.js`
3. Initialize npm project: `npm init` or `npm init -y`
4. Install Axios, Chalk, and Dotenv: `npm i axios chalk dotenv`
5. Create new utility module file for colorizing functions: `mkdir utils && touch utils/chalk-utils.js`
6. Create functions for logging strings in color. Students may create one for both the body and author of a quote, or one for each in a different color. Export the function as a named export.
    ```js
    function colorize(message) {
      console.log(chalk.cyanBright(message));
    }

    export { colorize };
    ```
7. Create new service module file for quote CRUD functions: `mkdir services && touch services/quote-service.js`
8. Import Axios and create instance.
    ```js
    import axios from 'axios';

    const http = axios.create({
      baseURL: 'https://favqs.com/api/',
    });
    ```
9.  Create and export an asynchronous function to retrieve a random quote from the FavQs API. Usage of async/await syntax recommended.
    ```js
    async function getRandomQuote() {
      try {
        const response = await http.get('/qotd');
        const data = response.data;
        const quote = {
          body: data.quote.body,
          author: data.quote.author
        };
        return quote;
      } catch (error) {
        logError(error);
      }
    }

    export { getRandomQuote };
    ```
10. Back in `index.js`, import the colorize utility and api service function.
    ```js
    import { getRandomQuote } from './services/quote-service.js';
    import { colorize } from './utils/chalk-utils.js';
    ```
11. Call `getRandomQuote()` and store the result in a variable.
    ```js
    // top-level await requires Node 14.8.0^
    const randomQuote = await getRandomQuote();
    ```
12. Log the quote to the console using the colorize utility function.
    ```js
    colorize(randomQuote.body);
    colorize(randomQuote.author);
    ```
13. The Axios instance must be modified in preparation to fetch a list of random quotes. The endpoint requires an API key. Register to acquire a key on [the login page](https://favqs.com/login).
14. Create `.env` file in root directory: `touch .env`
15. Edit file to include your API token.
    ```
    API_TOKEN=<YOUR_API_TOKEN>
    ```
16. In `quote-service.js`, import the dotenv package, load `.env` file contents into `process.env`, and assign the value of the token to a variable.
    ```js
    import dotenv from 'dotenv';

    dotenv.config();
    const API_TOKEN = process.env.API_TOKEN;
    ```
17. Modify the Axios instance to include an authorization header containing the token per the specs provided by FavQs.
    ```js
    const http = axios.create({
      baseURL: 'https://favqs.com/api/',
      headers: {
        Authorization: `Token token=${API_TOKEN}`,
      },
    });
    ```
18. Create and export an asynchronous function to retrieve a list of random quote from the FavQs API. Usage of async/await syntax recommended.
    ```js
    async function getRandomQuotes() {
      try {
        const response = await http.get('/quotes');
        const data = response.data;
        const quotes = data.quotes.map((quote) => {
          return {
            body: quote.body,
            author: quote.author,
          }
        });
        return quotes;
      } catch (error) {
        logError(error);
      }
    }

    export { getRandomQuote, getRandomQuotes };
    ```
19. Back in `index.js`, import the new api service function.
    ```js
    import { getRandomQuote, getRandomQuotes } from './services/quote-service.js';
    ```
20. Call `getRandomQuotes()` and store the result in a variable.
    ```js
    const randomQuotes = await getRandomQuote();
    ```
21. Log the quote to the console in a loop using the colorize utility function.
    ```js
    randomQuotes.forEach((quote) => {
      colorize(quote.body);
      colorize(quote.author);
    });
    ```
22. **Ninja Bonus:** Create a third service function that retrieves a list of filtered quotes. This requires query parameters to be added. Refer to [FavQs](https://favqs.com/api) and [Axios](https://axios-http.com/docs/req_config) documentation for more info. This sample project gets a list of quotes filtered by the tag "programming".