import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/home/Home'
import QuizPage from './pages/quiz/QuizPage'
import SongList from './components/song/SongList'
import { Box } from '@mui/material'
import Logo from './logo/Logo'
import Learn from './pages/learn/Learn'
import SpecialDay from './components/specialDay/SpecialDay'
import Food from './components/food/Food'
import Events from './components/event/Event'
import AdminPage from './pages/admin/Admin'

function App() {


  return (
    <Box
      display="flex"
      flexDirection="column"
      height="100vh" // Set to full viewport height
    >
      <Logo/>
      <Router>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/quiz" element={<QuizPage />} />
            <Route path="/learn" element={<Learn />} />
            <Route path='/day' element={<SpecialDay />} /> {/* TODO remove this after testing*/}
            <Route path="/song" element={<SongList />} /> {/* TODO remove this after testing*/}
            <Route path="/food" element={<Food />} /> {/* TODO remove this after testing*/}
            <Route path="/event" element={<Events />} /> {/* TODO remove this after testing*/}
            <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </Router>

    </Box>
  )
}

export default App
