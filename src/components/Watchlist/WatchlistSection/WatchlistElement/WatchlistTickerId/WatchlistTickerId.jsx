import "./WatchlistTickerId.css"

const WatchlistTickerId = ({ name, ticker }) => {
  
  return (
    <div className="watchlist-ticker-id">
      <h4>{ticker}</h4>
      <p>{name}</p>
    </div>
  )
}

export default WatchlistTickerId