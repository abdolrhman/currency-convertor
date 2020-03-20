const moment = require('moment');
const request = require('bluebird').promisifyAll(require('request'), {
  multiArgs: true
});

const fixerUrl = 'https://api.exchangeratesapi.io';
/**
 * Convert Currency
 * @param value
 * @param currencyFrom
 * @param currencyTo
 * @param day
 * @returns {Promise<object>}
 */
const convertCurrency = (
  value = 1,
  currencyFrom = 'USD',
  currencyTo = 'EUR',
  day
) => {
  const formatedDay = !day ? 'latest' : moment(day).format('YYYY-MM-DD');
  const accessKey = process.env.ACCESS_TOKEN;
  return new Promise((resolve, reject) =>
    request
      .getAsync(
        `${fixerUrl}/${formatedDay}?access_key=${accessKey}&base=${currencyFrom}`
      )
      .then(response => {
        const parsedResponse = JSON.parse(response[1]);

        if (parsedResponse.error === 'Invalid base') {
          reject(new Error('Invalid currency base.'));
        } else if (!Object.keys(parsedResponse.rates).includes(currencyTo)) {
          reject(new Error('Invalid currency to convert.'));
        }

        const rateFrom = parsedResponse.rates[currencyTo];
        const convertedValue = value * rateFrom;
        console.log('kkk', currencyFrom, currencyTo, value, convertedValue);
        resolve({
          currencyFrom,
          currencyTo,
          value,
          convertedValue
        });
      })
  );
};

module.exports = convertCurrency;
