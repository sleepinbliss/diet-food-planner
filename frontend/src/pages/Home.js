import React from 'react';
import { useNavigate } from 'react-router-dom';
import { GiFruitTree } from 'react-icons/gi';
import useData from '../hooks/useData';

const Home = () => {
    const navigate = useNavigate();
    const { data: foods, loading, error } = useData('http://localhost:5000/api/foods');

    if (loading) return <div>Loading foods...</div>;
    if (error) return <div>Error: {error}</div>;

    const handlePlannerClick = (plannerType) => {
        navigate(`/${plannerType}`);
    };

    return (
        <div className="home-page">
            {/* Hero Landing Section */}
            <section className="landing-hero">
                <div className="landing-content">
                    <GiFruitTree className="hero-tree-icon" size={120} color="white" />
                    <p className="landing-subtitle">
                    </p>
                    <button className="primary-cta" onClick={() => document.getElementById('planners-section').scrollIntoView({ behavior: 'smooth' })}>
                        Start Here
                    </button>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="benefits-section">
                <div className="benefits-container">
                    <h2>Why Planning Matters</h2>
                    <div className="benefits-grid">
                        <div className="benefit-card">
                            <div className="benefit-icon">🎯</div>
                            <h3>Clarity & Focus</h3>
                            <p>Transform overwhelming goals into actionable steps. Clear planning eliminates confusion and provides direction for every decision.</p>
                        </div>
                        <div className="benefit-card">
                            <div className="benefit-icon">⚡</div>
                            <h3>Increased Efficiency</h3>
                            <p>Streamline your daily activities and eliminate time waste. Strategic planning can increase your productivity by up to 40%.</p>
                        </div>
                        <div className="benefit-card">
                            <div className="benefit-icon">📈</div>
                            <h3>Measurable Progress</h3>
                            <p>Track your achievements and celebrate milestones. Visual progress tracking keeps you motivated and accountable.</p>
                        </div>
                        <div className="benefit-card">
                            <div className="benefit-icon">🧘</div>
                            <h3>Reduced Stress</h3>
                            <p>Eliminate the anxiety of uncertainty. When you have a plan, you can focus on execution rather than worry about what's next.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Planners Section */}
            <section id="planners-section" className="planners-section">
                <h2 id="plannerTitle">Choose Your Planning Path</h2>
                <div className="plannerOptions">
                    <section className="hero meal-planner" onClick={() => handlePlannerClick('meal')}>
                        <div className="hero-content">
                            <h1>Meal Planning</h1>
                            <div className="hero-description">
                                <p>Plan your daily meals, track nutrition, and discover healthy recipes tailored to your dietary goals.</p>
                            </div>
                            <button className="cta-button" id="mealButton">Start Planning</button>
                        </div>
                    </section>
                    <section className="hero productivity-planner" onClick={() => handlePlannerClick('productivity')}>
                        <div className="hero-content">
                            <h1>Productivity</h1>
                            <div className="hero-description">
                                <p>Organize tasks, set goals, and boost your efficiency with smart scheduling and progress tracking.</p>
                            </div>
                            <button className="cta-button" id="productButton">Start Planning</button>
                        </div>
                    </section>
                    <section className="hero study-planner" onClick={() => handlePlannerClick('study')}>
                        <div className="hero-content">
                            <h1>Study</h1>
                            <div className="hero-description">
                                <p>Create study schedules, track learning progress, and optimize your study sessions for better results.</p>
                            </div>
                            <button className="cta-button" id="studyButton">Start Planning</button>
                        </div>
                    </section>
                    <section className="hero mental-planner" onClick={() => handlePlannerClick('mental')}>
                        <div className="hero-content">
                            <h1>Mental Wellness</h1>
                            <div className="hero-description">
                                <p>Track your daily emotions, thoughts, and mental wellness with guided reflection and mood analysis.</p>
                            </div>
                            <button className="cta-button" id="mentalButton">Start Planning</button>
                        </div>
                    </section>
                </div>
            </section>
        </div>
    );
}

export default Home;