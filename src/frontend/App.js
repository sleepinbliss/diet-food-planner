import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// BrowserRouter is a component from React Router that enables client-side routing in React.
// Routes: Container that holds all the route definitions
// Route: Defines what component to show for each URL path
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import './styles/App.css';

function App() {
    return (
        <Router>
            <div className="App">
                <Navbar />
                <main>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/about" element={<About />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
}
export default App;