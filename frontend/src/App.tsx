import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/home/Home'
import QuizPage from './pages/quiz/QuizPage'
import SongList from './components/song/SongList'

function App() {
  return (
    <Router>
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/quiz" element={<QuizPage />} />
          <Route path="/song" element={<SongList />} /> {/* TODO remove this after testing*/}

      </Routes>
      </Router>
  )
}

export default App
