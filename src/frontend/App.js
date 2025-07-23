import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// BrowserRouter is a component from React Router that enables client-side routing in React.
// Routes: Container that holds all the route definitions
// Route: Defines what component to show for each URL path
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import MealPlanner from './pages/MealPlanner';
import ProductivityPlanner from './pages/ProductivityPlanner';
import StudyPlanner from './pages/StudyPlanner';
import MentalPlanner from './pages/MentalPlanner';
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
                        <Route path="/meal" element={<MealPlanner />} />
                        <Route path="/productivity" element={<ProductivityPlanner />} />
                        <Route path="/study" element={<StudyPlanner />} />
                        <Route path="/mental" element={<MentalPlanner />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
}
export default App;