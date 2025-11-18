import { useState } from "react";
import "./PortfolioData.css"
import { useEffect } from "react";

const PortfolioData = (props) => {

  const tempData = [
    { "_id": "001", "shareCount": "27", "ticker": "AAPL", "currentPrice": "262.521", "change": 0.25, "purchasePrice": "244.242" }, 
    { "_id": "002", "shareCount": "27", "ticker": "AAPL", "currentPrice": "262.521", "change": -21.24, "purchasePrice": "244.242" }, 
    { "_id": "003", "shareCount": "27", "ticker": "AAPL", "currentPrice": "262.521", "change": -21.24, "purchasePrice": "244.242" }, 
    { "_id": "004", "shareCount": "27", "ticker": "AAPL", "currentPrice": "262.521", "change": -21.24, "purchasePrice": "244.242" }, 
    { "_id": "005", "shareCount": "27", "ticker": "AAPL", "currentPrice": "262.521", "change": -21.24, "purchasePrice": "244.242" }, 
    { "_id": "006", "shareCount": "27", "ticker": "AAPL", "currentPrice": "262.521", "change": -21.24, "purchasePrice": "244.242" }, 
    { "_id": "007", "shareCount": "27", "ticker": "AAPL", "currentPrice": "262.521", "change": -21.24, "purchasePrice": "244.242" }, 
    { "_id": "008", "shareCount": "27", "ticker": "AAPL", "currentPrice": "262.521", "change": -21.24, "purchasePrice": "244.242" }, 
    { "_id": "009", "shareCount": "27", "ticker": "AAPL", "currentPrice": "262.521", "change": -21.24, "purchasePrice": "244.242" }, 
    { "_id": "010", "shareCount": "27", "ticker": "AAPL", "currentPrice": "262.521", "change": -21.24, "purchasePrice": "244.242" }, 
    { "_id": "011", "shareCount": "27", "ticker": "AAPL", "currentPrice": "262.521", "change": -21.24, "purchasePrice": "244.242" }, 
    { "_id": "012", "shareCount": "27", "ticker": "AAPL", "currentPrice": "262.521", "change": -21.24, "purchasePrice": "244.242" }, 
    { "_id": "013", "shareCount": "27", "ticker": "AAPL", "currentPrice": "262.521", "change": -21.24, "purchasePrice": "244.242" }, 
    { "_id": "014", "shareCount": "27", "ticker": "AAPL", "currentPrice": "262.521", "change": -21.24, "purchasePrice": "244.242" }, 
    { "_id": "015", "shareCount": "27", "ticker": "AAPL", "currentPrice": "262.521", "change": -21.24, "purchasePrice": "244.242" }, 
    { "_id": "016", "shareCount": "27", "ticker": "AAPL", "currentPrice": "262.521", "change": -21.24, "purchasePrice": "244.242" }, 
    { "_id": "017", "shareCount": "27", "ticker": "AAPL", "currentPrice": "262.521", "change": -21.24, "purchasePrice": "244.242" }, 
    { "_id": "018", "shareCount": "27", "ticker": "AAPL", "currentPrice": "262.521", "change": -21.24, "purchasePrice": "244.242" }, 
    { "_id": "019", "shareCount": "27", "ticker": "AAPL", "currentPrice": "262.521", "change": -21.24, "purchasePrice": "244.242" }, 
    { "_id": "020", "shareCount": "27", "ticker": "AAPL", "currentPrice": "262.521", "change": -21.24, "purchasePrice": "244.242" }, 
    { "_id": "021", "shareCount": "27", "ticker": "AAPL", "currentPrice": "262.521", "change": -21.24, "purchasePrice": "244.242" },
    { "_id": "022", "shareCount": "27", "ticker": "AAPL", "currentPrice": "262.521", "change": -21.24, "purchasePrice": "244.242" },
    { "_id": "023", "shareCount": "27", "ticker": "AAPL", "currentPrice": "262.521", "change": -21.24, "purchasePrice": "244.242" },
    { "_id": "024", "shareCount": "27", "ticker": "AAPL", "currentPrice": "262.521", "change": -21.24, "purchasePrice": "244.242" }
  ];

  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      // let response = await fetch(BASE_URL + ``)
      // let JSONdata = await response.json()

      // console.log(JSONdata)
      // setData(JSONdata);
      setData(tempData);
    }

    getData()

  }, []);

  const portfolioTable = data.map(
    (item, index) => {

      return (<div key={item._id} className="row">
        <div className="cell">{item.shareCount}</div>
        <div className="cell">{item.ticker}</div>
        <div className="cell">{(item.currentPrice).toLocaleString('en')}</div>
        { item.change < 0 ? 
          <div className="cell negative">{ item.change }</div> :
          <div className="cell positive">{ item.change }</div>
        }
        <div className="cell">{item.purchasePrice}</div>
        <div className="cell last">
          <button>
            Sell
          </button>
        </div>
      </div>)
    }
  );

  return (
    <div className="portfolio-data-outer">
      <div className="portfolio-data-inner">
        <div className="portfolio-data-header">
          <h1>Your Portfolio</h1>
        </div>
        <div className="data-table-container">
          <div className='table'>
            <div className="header-row row">
              <div className="cell">Qty.</div>
              <div className="cell">Stock Name</div>
              <div className="cell">Current Price</div>
              <div className="cell">Change</div>
              <div className="cell">Purchase Price</div>
              <div className="cell last">Actions</div>
            </div>
            <div className="table-data">
              {portfolioTable}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

export default PortfolioData;