import React, { useState } from 'react';
import useData from '../hooks/useData';

const MealPlanner = () => {
    const { data: apiResponse, loading, error } = useData('http://localhost:5000/api/foods');
    const [selectedFoods, setSelectedFoods] = useState([]);

    // Extract the foods array from the API response
    const foods = apiResponse?.data || [];

    if (loading) return <div className="loading">Loading meal data...</div>;
    if (error) return <div className="error">Error: {error}</div>;

    const addFood = (food) => {
        setSelectedFoods([...selectedFoods, { ...food, id: Date.now() }]);
    };

    const removeFood = (id) => {
        setSelectedFoods(selectedFoods.filter(food => food.id !== id));
    };

    return (
        <div className="planner-page meal-planner-page">
            <div className="planner-header">
                <h1>Meal Planner</h1>
                <p>Plan your daily meals, track nutrition, and discover healthy recipes tailored to your dietary goals.</p>
            </div>

            <div className="planner-content">
                <div className="planner-sidebar">
                    <h2>Available Foods</h2>
                    <div className="food-list">
                        {foods.length > 0 ? foods.map((food, index) => (
                            <div key={index} className="food-item">
                                <div className="food-info">
                                    <h3>{food.name}</h3>
                                    <p>{food.calories} cal | {food.protein}g protein</p>
                                </div>
                                <button
                                    className="add-btn"
                                    onClick={() => addFood(food)}
                                >
                                    Add
                                </button>
                            </div>
                        )) : (
                            <div className="empty-state">
                                <p>No foods available. Please check if the server is running.</p>
                            </div>
                        )}
                    </div>
                </div>

                <div className="planner-main">
                    <h2>Your Meal Plan</h2>
                    {selectedFoods.length === 0 ? (
                        <div className="empty-state">
                            <p>Start adding foods to create your meal plan!</p>
                        </div>
                    ) : (
                        <div className="selected-foods">
                            {selectedFoods.map((food) => (
                                <div key={food.id} className="selected-food-item">
                                    <div className="food-details">
                                        <h4>{food.name}</h4>
                                        <p>{food.calories} calories | {food.protein}g protein</p>
                                    </div>
                                    <button
                                        className="remove-btn"
                                        onClick={() => removeFood(food.id)}
                                    >
                                        Remove
                                    </button>
                                </div>
                            ))}
                            <div className="meal-summary">
                                <h3>Total Nutrition</h3>
                                <p>
                                    Calories: {selectedFoods.reduce((sum, food) => sum + food.calories, 0)} |
                                    Protein: {selectedFoods.reduce((sum, food) => sum + food.protein, 0)}g
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MealPlanner;
