import { useEffect, useState } from "react"
import "./Watchlist.css"
import WatchlistHeader from "./WatchlistHeader/WatchlistHeader"
import WatchlistSection from "./WatchlistSection/WatchlistSection"

import fetchDaily from "../../services/Dailies.js"
import { index as fetchWatchlist } from "../../services/TargetService.js"

const Watchlist = () => {

  // Default recommendation to help users get started!
  const recommendations = ["AAPL", "NVDA", "MSFT", "AMZN", "GOOG", "TSLA", "AMD", "NFLX", "META", "COST", "WMT"]

  // States containing arrays of watchlist elements
  const [wishlistSaved, setWishlistSaved] = useState([]) // Saved by the user
  const [wishlistRecommendations, setWishlistRecommendations] = useState() // Recommended by the server
  const [wishlistSearch, setWishlistSearch] = useState() // Searched by the user/server
  
  
  /**
   * Cleans up data fetched from `fetchDailies` to be consumed by components.
   * @param {Array} data - Array of data from the `fetchDailies` function.
   * @returns Parsed results.
   */
  const parseData = (data) => {
    const searchData = {}
    // Parse the data into something the watchlist elements can consume.
    searchData.name = data.longName;
    searchData.ticker = data.symbol;
    searchData.value = data.values[0].close.toFixed(2);
    searchData.change = (data.values[0].close - data.previousClose).toFixed(3);
    return searchData
  }

  /**
   * Sets the user's search results into state.
   * @param {Array} searchResult Search Results from `fetchDaily`
   */
  const handleSearchResults = (searchResult) => {
    if (!searchResult) {  // Limit access to when data was successfully retreived from search
      console.log("Could not find any data through the search.")
      setWishlistSearch() // Reset the search results.
      return; // Kick them out to prevent errors
    }
    const results = parseData(searchResult) // Parse the data so that it can be consumed.
    setWishlistSearch([results])  // Set the results.
  }

  // Initial Loads
  useEffect(() => {

    /**
     * Loads and formats recommendations.
     * Parses out any tickers already existing in the saved wishlist.
     */
    const loadRecommendations = async (savedPairs) => {
      const recommendationsArray = []
      for (const rec of recommendations) {
        // Only recommend tickers not already in watchlist.
        if (!savedPairs.includes(rec)) { // Runs through array of saved pairs, and only passes when it doesn't match current recommendation ticker
          const recommendation = parseData(await fetchDaily(rec)) // Parse the data into something consumable.
          console.log(`recommendation: ${recommendation}`)
          recommendationsArray.push(recommendation) // Add it to the array of recommendations
        }
      }
      setWishlistRecommendations(recommendationsArray);
    }

    /**
     * Loads and formats the saved pairs into the `wishlistSaved` state
     */
    const loadSavedPairs = async (watchlistTickers) => {
      const savedPairsArray = []; // Default array for the formatted saved pairs.

      // Go through each element from the user's saved watchlist array.
      for (const pair of watchlistTickers) {
        const parsedPair = parseData(await fetchDaily(pair));  // Parse the data so that it can be consumed.
        savedPairsArray.push(parsedPair); // Add the completed pair to the collection of user's pairs.
      }
      setWishlistSaved(savedPairsArray) // Set the state to showcase the saved pairs.
    }

    /**
     * Fetches the tickers from within the user's watchlist.
     * Once fetched, it passed it to the loadSavedPairs and loadRecommendations function.
     */
    const fetchWatchlistTickers = async () => {
      const savedWatchlist = await fetchWatchlist(); // Collect all the pairs in the user's watchlist.
      const watchlistTickers = []; // Default array for watchlist tickers (need to extract the tickers)

      savedWatchlist.forEach((element) => {
        const ticker = element.ticker;  // Grabs the ticker value from the element
        watchlistTickers.push(ticker) // Adds the ticker to the array.
      })

      loadSavedPairs(watchlistTickers);
      loadRecommendations(watchlistTickers);
    }

    fetchWatchlistTickers();
  }, [])



  return (
    <section className="watchlist-outer">
      <div className="watchlist-inner">
        <WatchlistHeader handleSearchResults={handleSearchResults} />
        <div className="watchlist-results">
          { wishlistSearch && <WatchlistSection header="Search Results" watchlistElements={wishlistSearch} /> }
          <WatchlistSection header="Saved Pairs" watchlistElements={wishlistSaved} />
          { wishlistRecommendations && <WatchlistSection header="Recommendations" watchlistElements={wishlistRecommendations} /> }
        </div>
      </div>
    </ section>
  )
}

export default Watchlist