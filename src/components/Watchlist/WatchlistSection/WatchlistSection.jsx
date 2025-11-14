import "./WatchlistSection.css"
import WatchlistElement from "./WatchlistElement/WatchlistElement";

const WatchlistSection = ({ header, watchlistElements }) => {

  return (
    <article className="watchlist-section">
      <h4 className="watchlist-section-header">{header}</h4>
      {watchlistElements.map((element, index) => (
        <WatchlistElement key={index} elementData={element} />
      ))}
    </article>
  )
}

export default WatchlistSection;