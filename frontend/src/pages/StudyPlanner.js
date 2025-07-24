import React, { useState } from 'react';

const StudyPlanner = () => {
    const [subjects, setSubjects] = useState([]);
    const [newSubject, setNewSubject] = useState('');
    const [studySessions, setStudySessions] = useState([]);

    const addSubject = () => {
        if (newSubject.trim()) {
            setSubjects([...subjects, { id: Date.now(), name: newSubject, hours: 0 }]);
            setNewSubject('');
        }
    };

    const addStudySession = (subjectId, hours) => {
        setStudySessions([...studySessions, {
            id: Date.now(),
            subjectId,
            hours: parseFloat(hours),
            date: new Date().toISOString().split('T')[0]
        }]);

        setSubjects(subjects.map(subject =>
            subject.id === subjectId
                ? { ...subject, hours: subject.hours + parseFloat(hours) }
                : subject
        ));
    };

    return (
        <div className="planner-page study-planner-page">
            <div className="planner-header">
                <h1>Study Planner</h1>
                <p>Create study schedules, track learning progress, and optimize your study sessions for better results.</p>
            </div>

            <div className="planner-content">
                <div className="subject-input-section">
                    <div className="input-group">
                        <input
                            type="text"
                            value={newSubject}
                            onChange={(e) => setNewSubject(e.target.value)}
                            placeholder="Add a subject to study..."
                            onKeyPress={(e) => e.key === 'Enter' && addSubject()}
                        />
                        <button onClick={addSubject} className="add-subject-btn">Add Subject</button>
                    </div>
                </div>

                <div className="subjects-section">
                    <h2>Your Subjects</h2>
                    {subjects.length === 0 ? (
                        <div className="empty-state">
                            <p>No subjects yet. Add your first subject above!</p>
                        </div>
                    ) : (
                        <div className="subject-list">
                            {subjects.map(subject => (
                                <div key={subject.id} className="subject-item">
                                    <div className="subject-info">
                                        <h3>{subject.name}</h3>
                                        <p>Total hours studied: {subject.hours}</p>
                                    </div>
                                    <div className="study-session-input">
                                        <input
                                            type="number"
                                            step="0.5"
                                            min="0"
                                            placeholder="Hours"
                                            onKeyPress={(e) => {
                                                if (e.key === 'Enter' && e.target.value) {
                                                    addStudySession(subject.id, e.target.value);
                                                    e.target.value = '';
                                                }
                                            }}
                                        />
                                        <button
                                            onClick={(e) => {
                                                const input = e.target.previousElementSibling;
                                                if (input.value) {
                                                    addStudySession(subject.id, input.value);
                                                    input.value = '';
                                                }
                                            }}
                                            className="log-session-btn"
                                        >
                                            Log Session
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="study-stats">
                    <h3>Study Statistics</h3>
                    <p>Total study time: {subjects.reduce((sum, subject) => sum + subject.hours, 0)} hours</p>
                    <p>Study sessions completed: {studySessions.length}</p>
                </div>
            </div>
        </div>
    );
};

export default StudyPlanner;
