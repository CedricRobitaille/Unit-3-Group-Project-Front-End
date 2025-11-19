const BASE_URL = "http://localhost:3000/targets/";

/**
 * Collect all targets currrently in the user's watchlist
 * @returns All watchlist targets
 */
const index = async () => {
  try {
    const response = await fetch(BASE_URL);
    const data = await response.json()
    console.log("Fetched Watchlist Targets: ", data);
    return data;
  } catch (error) {
    console.log(error);
  }
}



/**
 * Adds the target ticker to the user's watchlist
 * @param {Object} targetName The target ticker's name
 * @returns The added target's data
 */
const create = async (targetName) => {
  console.log(targetName)
  try {
    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({targetName: targetName}),
    });
    const data = await response.json();
    console.log("Added Target to Watchlist: ", data);
    return true;
  } catch (error) {
    console.log(error);
  }
}



/**
 * Fetches a single target from the user's watchlist
 * @param {String} targetId Name of the Target in question
 * @returns Single target Information
 */
const show = async (targetId) => {
  try {
    const response = await fetch(BASE_URL + targetId);
    const data = await response.json()
    console.log(`Fetched Watchlist Target info for ${targetId}: `, data);
    return data;
  } catch (error) {
    console.log("ERROR: Target does not exist in watchlist.", error);
  }
}



/**
 * Updates the target in the watchlist
 * @param {String} targetId Name of the target in question
 * @param {String} targetData tickerName
 * @returns Updated Transaction Details
 */
const update = async (targetId, targetData) => {
  try {
    const response = await fetch(`${BASE_URL}${targetId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(targetData),
    });
    const data = await response.json();
    console.log(`Updated transaction ${targetId}: `, data);
    return data;
  } catch (error) {
    console.log(error);
  }
}



/**
 * Deletes the target ticker from user's watchlist
 * @param {String} targetId ID of the transaction in question
 * @returns Deleted Transaction Information
 */
const del = async (ticker) => {
  console.log(ticker)
  try {
    const response = await fetch(`${BASE_URL}${ticker}`, {
      method: "DELETE"
    });
    const data = await response.json();
    console.log(`Deleted Target ${ticker} from Watchlist: `, data);
    return true;
  } catch (error) {
    console.log(error);
  }
}

export { index, create, show, update, del }