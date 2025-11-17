import { useState } from "react"
import "./PortfolioHeader.css"

const controls = [7, 14, 30, 90];

const PortfolioHeader = ({ handleGraphRange }) => {

  const [selected, setSelected] = useState(0)

  const handleControlClick = (value, index) => {
    setSelected(index)
    handleGraphRange(value)
  }

  return (
    <header className="card-header">
      <h1>Portfolio Value</h1>

      <div className="header-controls">
        {controls.map((number, index) => (
          <button key={index} className={index === selected && "selected"} onClick={() => { handleControlClick(number, index) }}>{number}d</button>
        ))}
      </div>
    </header>
    
  )
}

export default PortfolioHeader