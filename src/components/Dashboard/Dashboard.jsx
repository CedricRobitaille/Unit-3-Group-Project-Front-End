import Watchlist from '../Watchlist/Watchlist';
import PortfolioTrendLine from '../PortfolioTrendLine/PortfolioTrendLine';

import Card from '../Card/Card';

import "./Dashboard.css"

const Dashboard = () => {

  return (
    <section className='dashboard-view'>
      <div className="card-container">
        <Card pillText="Portfolio" pillData="200" cardText="$250.22"/>
        <Card />
        <Card />
        <Card />
      </div>
      
      <PortfolioTrendLine />
      <Watchlist />
    </section>
  )
}

export default Dashboard;