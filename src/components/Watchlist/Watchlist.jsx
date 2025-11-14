import "./Watchlist.css"
import WatchlistHeader from "./WatchlistHeader/WatchlistHeader"
import WatchlistSection from "./WatchlistSection/WatchlistSection"

const Watchlist = (props) => {

  return (
    <section className="watchlist-outer">
      <div className="watchlist-inner">
        <WatchlistHeader />
        <WatchlistSection />
      </div>
    </ section>
  )
}

export default Watchlist