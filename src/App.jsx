import { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import Tours from './pages/Tours.jsx'
import TourDetail from './pages/TourDetail.jsx'
import Book from './pages/Book.jsx'
import About from './pages/About.jsx'
import Contact from './pages/Contact.jsx'
import DestinationsPage from './pages/DestinationsPage.jsx'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])
  return null
}

export default function App() {
  const { pathname } = useLocation()
  const transparentHeader = pathname === '/'

  return (
    <div className="flex flex-col min-h-screen">
      <ScrollToTop />
      <Header transparent={transparentHeader} />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tours" element={<Tours />} />
          <Route path="/tours/:slug" element={<TourDetail />} />
          <Route path="/destinations" element={<DestinationsPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/book" element={<Book />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
