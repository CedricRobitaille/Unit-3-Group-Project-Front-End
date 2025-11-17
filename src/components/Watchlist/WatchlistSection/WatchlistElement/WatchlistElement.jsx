import "./WatchlistElement.css"

import WatchlistTickerId from "./WatchlistTickerId/WatchlistTickerId";
import WatchlistGraph from "./WatchlistGraph/WatchlistGraph";
import WatchlistTickerValue from "./WatchlistTickerValue/WatchlistTickerValue";

const WatchlistElement = ({elementData}) => {

  const name = elementData.name;
  const ticker = elementData.ticker;
  const value = elementData.value;
  const change = elementData.change;
  const searchData = elementData.searchData;

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