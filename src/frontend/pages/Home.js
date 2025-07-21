import React, { useState, useEffect } from 'react';
import useData from '.../hooks/useData';

const Home = () => {
    const { data: foods, loading, error } = useData('http://localhost:5000/api/foods');

    if (loading) return <div>Loading foods...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="home-page">
            <h1>Diet Food Planner</h1>
            <p>Your complete nutrition database</p>

            <div className="food-grid">
                {foods?.data?.map(food => (
                    <div key={food.id} className="food-card">
                        <h3>{food.name}</h3>
                        <p><strong>Category:</strong> {food.category}</p>
                        <p><strong>Calories:</strong> {food.calories}</p>
                        <p><strong>Protein:</strong> {food.protein}g</p>
                        <div className="serving-size">
                            <small>{food.servingSize}</small>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}