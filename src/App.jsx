import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Dashboard from './pages/Dashboard'
import Jurnal from './pages/Jurnal'
import Profile from './pages/Profile'
import './App.css'

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        {/* Root path langsung render Dashboard */}
        <Route path="/" element={<Dashboard />} />
        
        {/* Routes lainnya */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/jurnal" element={<Jurnal />} />
        <Route path="/profile" element={<Profile />} />
        
        {/* 404 - Redirect ke dashboard */}
        <Route path="*" element={<Dashboard />} />
      </Routes>
    </div>
  )
}

export default App