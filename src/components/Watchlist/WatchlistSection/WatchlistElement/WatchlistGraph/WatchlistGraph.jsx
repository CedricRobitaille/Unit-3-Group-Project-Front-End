import "./WatchlistGraph.css"
import Graph from "../../../../DataViz/Graph/Graph.jsx"


const WatchlistGraph = ({ searchData }) => {

  return (
    <div className="watchlist-graph">
      <Graph type="small" searchData={searchData} />
    </div>
  )
}

export default WatchlistGraph;