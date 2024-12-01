import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Speech from './Speech';
import TextToSpeech from './Text';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<TextToSpeech />} />
          <Route path="/speech" element={<Speech />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;