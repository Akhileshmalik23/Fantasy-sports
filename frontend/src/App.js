import './App.css'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import CreateTeam from './components/CreateTeam'
import Player from './components/Player'
import Teams from './components/Teams'
import Home from './components/Home';

function App() {

  return (
   <>
 <Router>
 <div className="min-h-screen">
        {/* Navbar */}
        <header className="bg-white shadow">
          <div className="container mx-auto px-4 py-6 flex justify-between items-center">
           <Link to='/'>
           <h1 className="text-3xl font-bold text-gray-800">
              Fantasy Game
              </h1>
           </Link> 
            <nav>
              <ul className="flex space-x-6">
                <li>
                  <Link to="/" className="text-gray-700 hover:text-blue-500">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/players" className="text-gray-700 hover:text-blue-500">
                    Players
                  </Link>
                </li>
                <li>
                  <Link to="/teams/search" className="text-gray-700 hover:text-blue-500">
                    Search Teams
                  </Link>
                </li>
                <li>
                  <Link to="/teams/create" className="text-gray-700 hover:text-blue-500">
                    Create Team
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </header>

        {/* Routes */}
        
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/players" element={<Player />} />
            <Route path="/teams/search" element={<Teams />} />
            <Route path="/teams/create" element={<CreateTeam />} />
          </Routes>
       
      </div>
    </Router>
 
   </>
  )
}

export default App
