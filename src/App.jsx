import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import News from './pages/News'
import TeamPage from './pages/Team'

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/news" element={<News />} />
        <Route path="/team" element={<TeamPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}
