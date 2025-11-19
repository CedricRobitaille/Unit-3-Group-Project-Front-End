import { useEffect, useState } from "react"
import "./Watchlist.css"
import WatchlistHeader from "./WatchlistHeader/WatchlistHeader"
import WatchlistSection from "./WatchlistSection/WatchlistSection"

import fetchDaily from "../../services/Dailies.js"
import { index as fetchWatchlist } from "../../services/TargetService.js"

const Watchlist = ({ handleWatchlistChange, watchListValues }) => {

  // Default recommendation to help users get started!
  const recommendations = ["AAPL", "NVDA", "MSFT", "AMZN", "GOOG", "TSLA", "AMD", "NFLX", "META", "COST", "WMT"]

  console.log(watchListValues)
  // States containing arrays of watchlist elements
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
    searchData.searchData = data.values;
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
          const recommendation = parseData(await fetchDaily(rec, 90)) // Parse the data into something consumable.
          recommendationsArray.push(recommendation) // Add it to the array of recommendations
        }
      }
      setWishlistRecommendations(recommendationsArray);
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
      loadRecommendations(watchlistTickers);
    }
    

    fetchWatchlistTickers();
  }, [])



  return (
    <section className="watchlist-outer">
      <div className="watchlist-inner">
        <WatchlistHeader handleSearchResults={handleSearchResults} />
        <div className="watchlist-results">
          {wishlistSearch && <WatchlistSection header="Search Results" watchlistElements={wishlistSearch} handleWatchlistChange={handleWatchlistChange} type="add" /> }
          <WatchlistSection header="Saved Pairs" watchlistElements={watchListValues} handleWatchlistChange={handleWatchlistChange} type="remove" />
          {wishlistRecommendations && <WatchlistSection header="Recommendations" watchlistElements={wishlistRecommendations} handleWatchlistChange={handleWatchlistChange} type="add" /> }
        </div>
      </div>
    </ section>
  )
}

export default Watchlist