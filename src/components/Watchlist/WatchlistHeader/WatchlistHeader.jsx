import "./WatchlistHeader.css"

import WatchlistSearchbar from "./WatchlistSearchbar/WatchlistSearchbar"
import WatchlistTitle from "./WatchlistTitle/WatchlistTitle"

const WatchlistHeader = () => {
  
  return (
    <div className="watchlist-header">
      <WatchlistTitle />
      <WatchlistSearchbar />
    </div>
  )
}

export default WatchlistHeader