import "./WatchlistTickerValue.css"

const WatchlistTickerValue = (props) => {
  // const tickerValue = props.tickerValue;
  // const tickerChange = props.tickerChange;

  const tickerValue = 30.125;
  const tickerChange = "+12.25";

  return (
    <div className="watchlist-ticker-value">
      <h5>{tickerValue}</h5>
      <h6>{tickerChange}</h6>
    </div>
    
  )
}

export default WatchlistTickerValue