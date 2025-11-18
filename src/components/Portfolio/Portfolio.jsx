import "./Portfolio.css"
import PortfolioData from "./PortfolioData/PortfolioData";
import StockOverview from "./StockOverview/StockOverview";

const Portfolio = (props) => {

  const buttonAction = async () => {
    console.log("clicked")
  }

  return (
    <div className="portfolio-data">
      <PortfolioData />
      <StockOverview />
    </div>
  )
};

export default Portfolio;