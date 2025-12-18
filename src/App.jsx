import { Routes, Route } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { ThemeProvider } from './context/ThemeContext'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Projects from './components/Projects'
import About from './components/About'
import Contact from './components/Contact'
import Footer from './components/Footer'
import NotFound from './pages/NotFound'
import Admin from './pages/Admin'

// Placeholder components - to be implemented
const Guestbook = () => (
  <section id="guestbook" className="section bg-soft-charcoal">
    <div className="container-custom">
      <h2 className="section-title text-center">Guestbook</h2>
      <p className="section-subtitle text-center">
        Coming soon - Guestbook powered by Supabase
      </p>
    </div>
  </section>
)

function App() {
  return (
    <ThemeProvider>
      <div className="App">
        <Helmet>
          <title>Portfolio - Full-Stack Developer</title>
          <meta 
            name="description" 
            content="Professional portfolio showcasing web development projects, skills, and experience in React, JavaScript, and modern web technologies." 
          />
          <meta name="keywords" content="portfolio, full-stack developer, web development, react, javascript" />
        </Helmet>

        <Routes>
          <Route
            path="/"
            element={
              <>
                <Navbar />
                <main>
                  <Hero />
                  <Projects />
                  <About />
                  <Guestbook />
                  <Contact />
                </main>
                <Footer />
              </>
            }
          />
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </ThemeProvider>
  )
}

export default App
