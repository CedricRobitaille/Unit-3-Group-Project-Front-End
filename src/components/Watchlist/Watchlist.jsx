import { useState } from "react"
import "./Watchlist.css"
import WatchlistHeader from "./WatchlistHeader/WatchlistHeader"
import WatchlistSection from "./WatchlistSection/WatchlistSection"

const Watchlist = (props) => {

  // Dummy Data until we have data from the backend.
  const dummyWatchlistElements = [
    {
      name: "Apple, Inc.",
      ticker: "AAPL",
      value: "273.71",
      change: 0.74
    },
    {
      name: "Microsoft, Corp.",
      ticker: "MSFT",
      value: "510.49",
      change: 7.20
    },
    {
      name: "NVIDIA, Inc.",
      ticker: "NVDA",
      value: "190.15",
      change: 3.37
    },
    {
      name: "Amazon.com, Inc.",
      ticker: "AMZN",
      value: "235.28",
      change: -2.33
    }
  ]
  const dummyWishlistRecommendations = [dummyWatchlistElements[1], dummyWatchlistElements[2]]
  const dummyWishlistSearch = [dummyWatchlistElements[0]]

  // States containing arrays of watchlist elements
  const [wishlistSaved, setWishlistSaved] = useState(dummyWatchlistElements) // Saved by the user
  const [wishlistRecommendations, setWishlistRecommendations] = useState(dummyWishlistRecommendations) // Recommended by the server
  const [wishlistSearch, setWishlistSearch] = useState(dummyWishlistSearch) // Searched by the user/server
  

  const handleSearchResults = (searchResult) => {
    setWishlistSearch(searchResult);
  }

  return (
    <section className="watchlist-outer">
      <div className="watchlist-inner">
        <WatchlistHeader handleSearchResults={handleSearchResults} />
        <div className="watchlist-results">
          <WatchlistSection header="Search Results" watchlistElements={wishlistSearch} />
          <WatchlistSection header="Recommendations" watchlistElements={wishlistRecommendations} />
          <WatchlistSection header="Saved Pairs" watchlistElements={wishlistSaved} />
        </div>
      </div>
    </ section>
  )
}

export default Watchlist