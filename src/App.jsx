import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'

// Import pages
import Home from './pages/Home'
import InputPage from './pages/InputPage'
import ProcessingPage from './pages/ProcessingPage'
import ResultsPage from './pages/ResultsPage'
import LogPage from './pages/LogPage'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/input" element={<InputPage />} />
          <Route path="/processing" element={<ProcessingPage />} />
          <Route path="/results" element={<ResultsPage />} />
          <Route path="/log" element={<LogPage />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
