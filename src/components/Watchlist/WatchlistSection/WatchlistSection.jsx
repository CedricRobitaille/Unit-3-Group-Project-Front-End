import "./WatchlistSection.css"
import WatchlistElement from "./WatchlistElement/WatchlistElement";

const WatchlistSection = ({ header, watchlistElements, handleWatchlistChange, type }) => {

  return (
    <article className="watchlist-section">
      <h4 className="watchlist-section-header">{header}</h4>
      {watchlistElements.map((element, index) => (
        <WatchlistElement key={index} elementData={element} handleWatchlistChange={handleWatchlistChange} type={type} />
      ))}
    </article>
  )
}

export default WatchlistSection;