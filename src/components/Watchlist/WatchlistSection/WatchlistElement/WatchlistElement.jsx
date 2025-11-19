import "./WatchlistElement.css"

import WatchlistTickerId from "./WatchlistTickerId/WatchlistTickerId";
import WatchlistGraph from "./WatchlistGraph/WatchlistGraph";
import WatchlistTickerValue from "./WatchlistTickerValue/WatchlistTickerValue";
import { useState } from "react";

import { create, del } from "../../../../services/TargetService"

const WatchlistElement = ({ elementData, handleWatchlistChange, type }) => {

  const [buttonVisible, setButtonVisible] = useState(false)

  const name = elementData.name;
  const ticker = elementData.ticker;
  const value = elementData.value;
  const change = elementData.change;
  const searchData = elementData.searchData;

  const handleElementClick = async () => {
    setButtonVisible(!buttonVisible)
  }

  const handleAction = async () => {
    handleElementClick()
    if (type === "add") {
      const response = await create(ticker)
      if (await response) {
        handleWatchlistChange() // Only update if this was a success
      }
    }
    if (type === "remove") {
      const response = await del(ticker)
      if (await response) {
        handleWatchlistChange() // Only update if this was a success
      }
    }
  }

  return (
    <article className="watchlist-element-outer">
      <div className="watchlist-element-inner">
        <div className="watchlist-element-view" onClick={handleElementClick}>
          <WatchlistTickerId name={name} ticker={ticker} />
          <WatchlistGraph searchData={searchData} />
          <WatchlistTickerValue value={value} change={change} />
        </div>
        {buttonVisible && <button onClick={handleAction}>{type==="add" ? "Add to" : "Remove from"} Watchlist</button>}
        
      </div>
    </article>
  )
}

export default WatchlistElement;