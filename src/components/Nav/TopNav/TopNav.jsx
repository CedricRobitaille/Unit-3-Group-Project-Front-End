import "./TopNav.css"

const TopNav = (props) => {
  const {currentSection, currentPage} = props;

  const currentPageText = () => {
    switch (currentPage) {
      case "marketData": return "Market Data";
      default: return currentPage;
    }
  };

  return (
    <nav className="top-nav">
      <ul> 
        <li>
          {currentSection}
        </li>
      </ul>
      /
      <ul>
        <li className="active-page">
            {currentPageText()}
        </li>
      </ul>
    </nav>
  )
};

export default TopNav;