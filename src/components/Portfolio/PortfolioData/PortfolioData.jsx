import { useState } from "react";
import "./PortfolioData.css"
import { useEffect } from "react";
import dailiesIndex from "../../../services/Dailies.js";
import * as transactions from "../../../services/TransactionService.js";

const PortfolioData = ({ buttonAction, transactionData}) => {

  const portfolioTable = transactionData.map((item, index) => {

      return (<div key={item._id} className="row">
        <div className="cell">{item.shareCount}</div>
        <div className="cell">{item.ticker}</div>
        <div className="cell">
          ${parseFloat(item.currentPrice)
            .toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
          }

        </div>
        { item.change < 0 ? 
          <div className="cell negative">{ item.change }</div> :
          <div className="cell positive">{ item.change }</div>
        }
        <div className="cell">
          ${parseFloat(item.purchasePrice)
            .toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
          }

        </div>
        <div className="cell last">
          <button onClick={() => buttonAction(item._id)}>
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