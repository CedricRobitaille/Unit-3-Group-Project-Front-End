import "./Watchlist.css"
import WatchlistHeader from "./WatchlistHeader/WatchlistHeader"

const Watchlist = (props) => {

  return (
    <section className="watchlist-outer">
      <div className="watchlist-inner">
        
        <WatchlistHeader />
      </div>
    </ section>
  )
}

export default Watchlist