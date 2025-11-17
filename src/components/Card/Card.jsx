import "./Card.css"

const Card = (props) => {

  const {pillText, pillData, cardText} = props;

  return (
    <div className="card-outer">
      <div className="card-inner"> 

        <div className="card-header-container">
          <div className="card-pill-text"><p>{pillText}</p></div>
          <div className="card-pill-container">
            {pillData>0 ?
              <div className="arrow-up">&uarr;</div> :
              <div className="arrow-down">&darr;</div>
            }
            <div className="card-pill-data">
              <p>{pillData > 0 ?
                pillData :
                pillData * -1
              }%</p>
            </div>
          </div>
        </div>

        <div className="card-text">{cardText}</div>

      </div>
    </div>
  )
};

export default Card;