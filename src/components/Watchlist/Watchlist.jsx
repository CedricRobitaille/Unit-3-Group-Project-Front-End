import { useEffect, useState } from "react"
import "./Watchlist.css"
import WatchlistHeader from "./WatchlistHeader/WatchlistHeader"
import WatchlistSection from "./WatchlistSection/WatchlistSection"

import fetchDaily from "../../services/Dailies.js"

const Watchlist = ({ watchListValues, graphRange }) => {

  // Default recommendation to help users get started!
  const recommendations = ["AAPL", "NVDA", "MSFT", "AMZN", "GOOG", "TSLA", "AMD", "NFLX", "META", "COST", "WMT"]

  // States containing arrays of watchlist elements
  const [wishlistRecommendations, setWishlistRecommendations] = useState() // Recommended by the server
  const [wishlistSearch, setWishlistSearch] = useState() // Searched by the user/server
  

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
    setWishlistSearch([searchResult])  // Set the results.
  }

  // Initial Loads
  useEffect(() => {

    /**
     * Loads and formats recommendations.
     * Parses out any tickers already existing in the saved wishlist.
     */
    const loadRecommendations = async (tickers) => {
      const recommendationsArray = []
      for (const recTicker of recommendations) {
        // Only recommend tickers not already in watchlist.
        if (!tickers.includes(recTicker)) { // Runs through array of saved pairs, and only passes when it doesn't match current recommendation ticker
          const recommendation = await fetchDaily(recTicker, graphRange) // Fetch the dailies for the recommendeds
          recommendationsArray.push(recommendation) // Add it to the array of recommendations
        }
      }
      setWishlistRecommendations(recommendationsArray);
    }

    loadRecommendations(watchListValues.tickers);
  }, [])



  return (
    <section className="watchlist-outer">
      <div className="watchlist-inner">
        <WatchlistHeader handleSearchResults={handleSearchResults} />
        <div className="watchlist-results">
          { wishlistSearch && <WatchlistSection header="Search Results" watchlistElements={wishlistSearch} /> }
          <WatchlistSection header="Saved Pairs" watchlistElements={watchListValues.targets} />
          { wishlistRecommendations && <WatchlistSection header="Recommendations" watchlistElements={wishlistRecommendations} /> }
        </div>
      </div>
    </ section>
  )
}

export default Watchlist