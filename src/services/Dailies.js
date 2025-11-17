const BASE_URL = "http://localhost:3000/dailies/";

/**
 * Fetch dailies info from yahoo finance API
 * @param {string} ticker Ticker Accronym - ie: AAPL
 * @param {number} recordCount The quantity of records you want back.
 */
const index = async (ticker, recordCount = 1) => {
  try {
    const response = await fetch(`${BASE_URL}${ticker}?recordCount=${recordCount}`);
    const data = await response.json();
    // console.log(`Found dailies for ${ticker}: `, data);
    return data;
  } catch (error) {
    console.log(error)
  }
}

export default index;