const BASE_URL = "http://localhost:3000/transactions/";

/**
 * Collect all transactions currrently in the user's portfolio
 * @returns Bulk Transaction Information
 */
const index = async () => {
  try {
    const response = await fetch(BASE_URL);
    const data = await response.json()
    console.log("Fetched Portfolio Transaction Data: ", data);
    return data;
  } catch (error) {
    console.log(error);
  }
}



/**
 * Adds a transaction to the user's Portfolio
 * @param {Object} transactionData { tickerName, shareCount, purchasePrice }
 * @returns Transaction Information
 */
const create = async (transactionData) => {
  try {
    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(transactionData),
    });
    const data = await response.json();
    console.log("Added Transaction to Portfolio: ", data);
    return data;
  } catch (error) {
    console.log(error);
  }
}


/**
 * Fetches a single transaction's information
 * @param {String} transactionId ID of the transaction in question
 * @returns Single Transaction Information
 */
const show = async (transactionId) => {
  try {
    const response = await fetch(BASE_URL + transactionId);
    const data = await response.json()
    console.log(`Fetched Transaction info for ${transactionId}: `, data);
    return data;
  } catch (error) {
    console.log(error);
  }
}



/**
 * Updates a transaction
 * @param {String} transactionId ID of the transaction in question
 * @param {Object} transactionData { tickerName, shareCount, purchasePrice }
 * @returns Updated Transaction Details
 */
const update = async (transactionId, transactionData) => {
  try {
    const response = await fetch(`${BASE_URL}${transactionId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(transactionData),
    });
    const data = await response.json();
    console.log(`Updated transaction ${transactionId}: `, data);
    return data;
  } catch (error) {
    console.log(error);
  }
}



/**
 * Deletes a transaction from user's portfolio
 * @param {String} transactionId ID of the transaction in question
 * @returns Deleted Transaction Information
 */
const del = async (transactionId) => {
  try {
    const response = await fetch(`${BASE_URL}${transactionId}`, {
      method: "DELETE"
    });
    const data = await response.json();
    console.log(`Deleted transaction ${transactionId}: `, data);
    return true
  } catch (error) {
    console.log(error);
  }
}

export { index, create, show, update, del }