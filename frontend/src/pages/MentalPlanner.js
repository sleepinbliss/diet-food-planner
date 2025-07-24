import React, { useState } from 'react';

const MentalPlanner = () => {
    const [moodEntries, setMoodEntries] = useState([]);
    const [currentMood, setCurrentMood] = useState(5);
    const [thoughts, setThoughts] = useState('');

    const moodLabels = {
        1: '😢 Very Sad',
        2: '😞 Sad',
        3: '😐 Neutral',
        4: '😊 Good',
        5: '😄 Great',
        6: '🤩 Excellent',
        7: '🥳 Amazing'
    };

    const addMoodEntry = () => {
        if (thoughts.trim()) {
            setMoodEntries([...moodEntries, {
                id: Date.now(),
                mood: currentMood,
                thoughts: thoughts,
                date: new Date().toISOString().split('T')[0],
                time: new Date().toLocaleTimeString()
            }]);
            setThoughts('');
            setCurrentMood(5);
        }
    };

    const deleteMoodEntry = (id) => {
        setMoodEntries(moodEntries.filter(entry => entry.id !== id));
    };

    const averageMood = moodEntries.length > 0
        ? (moodEntries.reduce((sum, entry) => sum + entry.mood, 0) / moodEntries.length).toFixed(1)
        : 0;

    return (
        <div className="planner-page mental-planner-page">
            <div className="planner-header">
                <h1>Mental Wellness Planner</h1>
                <p>Track your daily emotions, thoughts, and mental wellness with guided reflection and mood analysis.</p>
            </div>

            <div className="planner-content">
                <div className="mood-input-section">
                    <h2>How are you feeling today?</h2>
                    <div className="mood-selector">
                        <label>Mood Level: {moodLabels[currentMood]}</label>
                        <input
                            type="range"
                            min="1"
                            max="7"
                            value={currentMood}
                            onChange={(e) => setCurrentMood(parseInt(e.target.value))}
                            className="mood-slider"
                        />
                    </div>

                    <div className="thoughts-input">
                        <textarea
                            value={thoughts}
                            onChange={(e) => setThoughts(e.target.value)}
                            placeholder="What's on your mind? Share your thoughts, feelings, or what happened today..."
                            rows="4"
                        />
                        <button onClick={addMoodEntry} className="add-entry-btn">
                            Add Entry
                        </button>
                    </div>
                </div>

                <div className="mood-entries-section">
                    <h2>Your Mental Health Journey</h2>
                    {moodEntries.length === 0 ? (
                        <div className="empty-state">
                            <p>Start tracking your mental wellness by adding your first mood entry!</p>
                        </div>
                    ) : (
                        <div className="mood-entries">
                            {moodEntries.map(entry => (
                                <div key={entry.id} className="mood-entry">
                                    <div className="entry-header">
                                        <span className="mood-indicator">{moodLabels[entry.mood]}</span>
                                        <span className="entry-date">{entry.date} at {entry.time}</span>
                                        <button
                                            onClick={() => deleteMoodEntry(entry.id)}
                                            className="delete-entry-btn"
                                        >
                                            ✕
                                        </button>
                                    </div>
                                    <p className="entry-thoughts">{entry.thoughts}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="mental-stats">
                    <h3>Wellness Insights</h3>
                    <p>Average mood: {averageMood} / 7</p>
                    <p>Total entries: {moodEntries.length}</p>
                    {moodEntries.length > 0 && (
                        <div className="mood-trend">
                            <p>Recent trend: {
                                moodEntries.length >= 2
                                    ? moodEntries[moodEntries.length - 1].mood > moodEntries[moodEntries.length - 2].mood
                                        ? '📈 Improving'
                                        : moodEntries[moodEntries.length - 1].mood < moodEntries[moodEntries.length - 2].mood
                                            ? '📉 Declining'
                                            : '➡️ Stable'
                                    : 'Need more data'
                            }</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MentalPlanner;
