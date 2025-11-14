import "./WatchlistTickerValue.css"

const WatchlistTickerValue = ({ value, change }) => {

  return (
    <div className="watchlist-ticker-value">
      <h5>{value}</h5>
      { change > 0 ? <h6>+{change}</h6> : <h6>{change}</h6> }
    </div>
  )
}

export default WatchlistTickerValue