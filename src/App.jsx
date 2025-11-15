
import { useState } from 'react';
import './App.css'
import SideNav from './components/Nav/SideNav/SideNav'
import TopNav from './components/Nav/TopNav/TopNav';
import Watchlist from './components/Watchlist/Watchlist';

function App() {

  const [currentSection, setCurrentSection] = useState('General');
  const [currentPage, setCurrentPage] = useState('Dashboard');

  const handleNavigation = (section, page) => {
    setCurrentSection(section);
    setCurrentPage(page);
  };

  return (
    <>
      <SideNav 
        currentPage={currentPage} 
        handleNavigation={handleNavigation}
      />
      <main>
        <TopNav 
          currentSection={currentSection} 
          currentPage={currentPage} 
        />
        <section>
          <Watchlist />
        </section> 
      </main>
    </>
  )
}

export default App
