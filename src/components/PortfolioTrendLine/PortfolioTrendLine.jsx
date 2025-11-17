
import { useState, useEffect } from 'react'
import Graph from '../DataViz/Graph/Graph';
import './PortfolioTrendLine.css'

const PortfolioTrendLine = () => {

    return (
        <section className="portfolio-tend-line-outer">
            <div className="portfolio-tend-line-inner">
                <Graph />
            </div>
        </section>
    );
}

export default PortfolioTrendLine;