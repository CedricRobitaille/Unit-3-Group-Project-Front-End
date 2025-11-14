import "./WatchlistHeader.css"

import WatchlistSearchbar from "./WatchlistSearchbar/WatchlistSearchbar"
import WatchlistTitle from "./WatchlistTitle/WatchlistTitle"

const WatchlistHeader = ({ handleSearchResults }) => {
  
  return (
    <div className="watchlist-header">
      <WatchlistTitle />
      <WatchlistSearchbar handleSearchResults={handleSearchResults} />
    </div>
  )
}

export default WatchlistHeader