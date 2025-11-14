import "./SideNav.css"

const SideNav = (props) => {

  return (
    <aside>
      <nav>
        <div className="logo">
        <ul> 
          <li>
            <button onClick={() => { handlePageNavigation("account") }}>
              <div className="icon"></div>
              Loxley.com
            </button>
          </li>
        </ul>
        </div>
        <div className="general">
          <h5>GENERAL</h5>
          <ul>
            <li>
              <button onClick={() => { handlePageNavigation("dashboard") }}>
                <div className="icon"></div>
                Dashboard
              </button>
            </li>
            <li>
              <button onClick={() => { handlePageNavigation("portfolio") }}>
                <div className="icon"></div>
                Portfolio
              </button>
            </li>
            <li>
              <button onClick={() => { handlePageNavigation("marketData") }}>
                <div className="icon"></div>
                Market Data
              </button>
            </li>
          </ul>
        </div>
        <div className="preferences">
          <h5>PREFERENCES</h5>
          <ul> 
            <li>
              <button onClick={() => { handlePageNavigation("account") }}>
                <div className="icon"></div>
                Account
              </button>
            </li>
            <li>
              <button onClick={() => { handlePageNavigation("settings") }}>
                <div className="icon"></div>
                Settings
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </aside>
  )
};

export default SideNav;