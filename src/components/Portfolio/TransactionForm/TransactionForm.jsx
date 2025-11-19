import { useEffect, useState } from "react"
import "./TransactionForm.css"
import Graph from "../../DataViz/Graph/Graph";
import {create} from "../../../services/TransactionService.js"

const TransactionForm = ({ stockInfo, handlePurchase }) => {

  console.log("INNER",stockInfo)
  const [formValues, setFormValues] = useState({
    qty: 1,
    price: parseFloat(stockInfo.values[0].close.toFixed(3))
  })

  const handlePurchaseRequest = async (event) => {
    event.preventDefault();

    const formResults = {
      ticker: stockInfo.symbol,
      shareCount: formValues.qty,
      purchasePrice: formValues.price,
      purchaseDate: Date.now()
    }

    const response = await create(formResults);
    if (response) {
      console.log("PURCHASED",await response)
      handlePurchase()
    } else {
      console.log("ERROR, Could not purchase stock.")
    }
    
    // console.log(parsedInfo);
  }
  

  const handleInputChange = async (event) => {
    if (event.target.name === "qty") {
      // price = qty * value
      setFormValues({
        qty: event.target.value,
        price: parseFloat((event.target.value * stockInfo.values[0].close).toFixed(3)),
      })
    }
    if (event.target.name === "price") {
      // qty = price / value
      setFormValues({
        price: event.target.value,
        qty: parseFloat((event.target.value / stockInfo.values[0].close).toFixed(3)),
      })
    }
  }


  return (
    <article className="stock-modal-body">
      <header>
        <div className="stock-information">
          <div className="stock-ticker-id">
            <h4>{stockInfo.symbol}</h4>
            <p>{stockInfo.name}</p>
          </div>

          <div className="watchlist-ticker-value">
            <h5>{stockInfo.value}</h5>
            {
              stockInfo.change > 0
                ?
                <h6>+{stockInfo.change}</h6>
                :
                <h6>{stockInfo.change}</h6>
            }
          </div>
        </div>
        
        <div className="graph-elem">
          <Graph type="small" searchData={stockInfo.searchData} />
        </div>
      </header>
      
      <form onSubmit={handlePurchaseRequest} className="stock-form">
        <fieldset>
          <div className="input-split">
            <div className="input-collection">
              <label htmlFor="">Max Volume</label>
              <div className="search-form">
                <input type="number" id="volume" name="" value="1000" className="input" readOnly />
              </div>
            </div>
            <div className="input-collection">
              <label htmlFor="">Unit Price</label>
              <div className="search-form">
                <input type="number" id="volume" name="volume" value={stockInfo.value} className="input" readOnly />
              </div>
            </div>
          </div>

          <div className="input-split">
            <div className="input-collection">
              <label htmlFor="qty">Quantity</label>
              <div className="search-form">
                <input type="number" id="qty" name="qty" className="input" value={formValues.qty} placeholder={1} onChange={handleInputChange} />
              </div>
            </div>
            <div className="input-collection">
              <label htmlFor="price">Purchase Price</label>
              <div className="search-form">
                <input type="number" id="price" name="price" className="input" value={formValues.price} placeholder={1} onChange={handleInputChange} />
              </div>
            </div>
          </div>
        </fieldset>
        
        <button type="submit">Buy Stocks</button>
      </form>
    </article>
    
  )
}

export default TransactionForm