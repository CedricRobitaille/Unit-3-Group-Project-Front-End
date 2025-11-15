import "./SideNav.css"

const SideNav = (props) => {

  const {currentPage, handleNavigation} = props;

  return (
    <aside>
      <nav className="side-nav">
        <div className="logo">
        <ul> 
          <li>
            <button onClick={() => { handleNavigation("General", "Dashboard") }}>
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
              <button 
                onClick={() => { handleNavigation("General", "Dashboard") }}
                className={currentPage === "Dashboard" ? "active" : ""}
              >
                <div className="icon"></div>
                Dashboard
              </button>
            </li>
            <li>
              <button 
                onClick={() => { handleNavigation("General", "Portfolio") }}
                className={currentPage === "Portfolio" ? "active" : ""}
              >
                <div className="icon"></div>
                Portfolio
              </button>
            </li>
            <li>
              <button 
                onClick={() => { handleNavigation("General", "MarketData") }}
                className={currentPage === "MarketData" ? "active" : ""}
              >
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
              <button 
                onClick={() => { handleNavigation("Preferences", "Account") }}
                className={currentPage === "Account" ? "active" : ""}
              >
                <div className="icon"></div>
                Account
              </button>
            </li>
            <li>
              <button 
                onClick={() => { handleNavigation("Preferences", "Settings") }}
                className={currentPage === "Settings" ? "active" : ""}
              >
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