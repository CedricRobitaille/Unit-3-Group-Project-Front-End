import "./Portfolio.css"
import PortfolioData from "./PortfolioData/PortfolioData";
import StockOverview from "./StockOverview/StockOverview";
import * as transactions from "../../services/TransactionService.js";
import { useState } from "react";

const Portfolio = (props) => {

  const [data, setData] = useState([]);

  const buttonAction = async (id) => {
    console.log("clicked")
    transactions.del(id);
  }

  return (
    <section className="portfolio-data">
      <PortfolioData 
        buttonAction={buttonAction}
        data={data} 
        setData={setData}
      />
      <StockOverview />
    </section>
  )
};

export default Portfolio;