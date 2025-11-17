import "./WatchlistElement.css"

import WatchlistTickerId from "./WatchlistTickerId/WatchlistTickerId";
import WatchlistGraph from "./WatchlistGraph/WatchlistGraph";
import WatchlistTickerValue from "./WatchlistTickerValue/WatchlistTickerValue";

const WatchlistElement = ({elementData}) => {

  const name = elementData.longName;
  const ticker = elementData.symbol;
  const value = parseFloat(elementData.values[0].close.toFixed(2));
  const change = parseFloat((elementData.values[0].close - elementData.previousClose).toFixed(3));
  const searchData = elementData.values;

  return (
    <article className="watchlist-element-outer">
      <div className="watchlist-element-inner">
        <WatchlistTickerId name={name} ticker={ticker} />
        <WatchlistGraph searchData={searchData} />
        <WatchlistTickerValue value={value} change={change} />
      </div>
    </article>
  )
}

export default WatchlistElement;