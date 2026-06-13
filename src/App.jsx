import { Routes, Route, Navigate } from 'react-router-dom'
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
        {/* Redirect root ke dashboard */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        
        {/* Routes utama */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/jurnal" element={<Jurnal />} />
        <Route path="/profile" element={<Profile />} />
        
        {/* 404 - Redirect ke dashboard */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </div>
  )
}

export default App