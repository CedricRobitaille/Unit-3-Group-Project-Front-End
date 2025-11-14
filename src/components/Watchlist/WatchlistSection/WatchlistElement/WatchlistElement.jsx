import "./WatchlistElement.css"

import WatchlistTickerId from "./WatchlistTickerId/WatchlistTickerId";
import WatchlistGraph from "./WatchlistGraph/WatchlistGraph";
import WatchlistTickerValue from "./WatchlistTickerValue/WatchlistTickerValue";

const WatchlistElement = () => {

  return (
    <article className="watchlist-element-outer">
      <div className="watchlist-element-inner">
        <WatchlistTickerId />
        <WatchlistGraph />
        <WatchlistTickerValue />
      </div>
    </article>
  )
}

export default WatchlistElement;