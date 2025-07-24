import React, { useState } from 'react';
import useData from '../hooks/useData';

const MealPlanner = () => {
    const { data: apiResponse, loading, error } = useData('http://localhost:5000/api/foods');
    const [selectedFoods, setSelectedFoods] = useState([]);
    const [savedMeals, setSavedMeals] = useState(() => {
        const saved = localStorage.getItem('savedMeals');
        return saved ? JSON.parse(saved) : [];
    });
    const [currentMealName, setCurrentMealName] = useState('');
    const [showSavedMeals, setShowSavedMeals] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('protein');

    // Extract the foods array from the API response
    const foods = apiResponse?.data || [];

    // Group foods by category and sort by nutrient content (highest to lowest)
    const proteinFoods = foods.filter(food => food.category === 'protein').sort((a, b) => b.protein - a.protein);
    const carbFoods = foods.filter(food => food.category === 'carbs').sort((a, b) => b.carbs - a.carbs);
    const fatFoods = foods.filter(food => food.category === 'fats').sort((a, b) => b.fat - a.fat);
    const fruitFoods = foods.filter(food => food.category === 'fruits').sort((a, b) => b.carbs - a.carbs);

    if (loading) return <div className="loading">Loading meal data...</div>;
    if (error) return <div className="error">Error: {error}</div>;

    const addFood = (food) => {
        setSelectedFoods([...selectedFoods, { ...food, id: Date.now() }]);
    };

    const removeFood = (id) => {
        setSelectedFoods(selectedFoods.filter(food => food.id !== id));
    };

    const saveMeal = () => {
        if (currentMealName.trim() && selectedFoods.length > 0) {
            const newMeal = {
                id: Date.now(),
                name: currentMealName.trim(),
                foods: selectedFoods,
                totalNutrition: {
                    calories: selectedFoods.reduce((sum, food) => sum + food.calories, 0),
                    protein: selectedFoods.reduce((sum, food) => sum + food.protein, 0),
                    carbs: selectedFoods.reduce((sum, food) => sum + food.carbs, 0),
                    fat: selectedFoods.reduce((sum, food) => sum + food.fat, 0)
                },
                createdAt: new Date().toLocaleDateString()
            };

            const updatedMeals = [...savedMeals, newMeal];
            setSavedMeals(updatedMeals);
            localStorage.setItem('savedMeals', JSON.stringify(updatedMeals));

            // Reset current meal
            setSelectedFoods([]);
            setCurrentMealName('');
            alert('Meal saved successfully!');
        } else {
            alert('Please enter a meal name and select at least one food item.');
        }
    };

    const loadMeal = (meal) => {
        setSelectedFoods(meal.foods);
        setCurrentMealName(meal.name);
        setShowSavedMeals(false);
    };

    const deleteMeal = (mealId) => {
        const updatedMeals = savedMeals.filter(meal => meal.id !== mealId);
        setSavedMeals(updatedMeals);
        localStorage.setItem('savedMeals', JSON.stringify(updatedMeals));
    };

    const startNewMeal = () => {
        setSelectedFoods([]);
        setCurrentMealName('');
    };

    // Helper to format numbers to max 3 decimal places
    const formatNum = (num) => Number(num).toFixed(3).replace(/\.?0+$/, '');

    return (
        <div className="planner-page meal-planner-page">
            <div className="planner-header">
                {/* <h1>Meal Planner</h1> */}
                {/* <p>Create a balanced meal by selecting items from the macronutrient categories.</p> */}
                <div className="meal-actions">
                    <button
                        className="action-btn new-meal-btn"
                        onClick={startNewMeal}
                    >
                        New Meal
                    </button>
                    <button
                        className="action-btn saved-meals-btn"
                        onClick={() => setShowSavedMeals(!showSavedMeals)}
                    >
                        Saved Meals ({savedMeals.length})
                    </button>
                </div>
            </div>

            <div className="planner-content">
                {/* Saved Meals Modal */}
                {showSavedMeals && (
                    <div className="saved-meals-modal">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h2>My Saved Meals</h2>
                                <button
                                    className="close-btn"
                                    onClick={() => setShowSavedMeals(false)}
                                >
                                    ×
                                </button>
                            </div>
                            <div className="saved-meals-list">
                                {savedMeals.length === 0 ? (
                                    <p className="no-meals">No saved meals yet. Create your first meal!</p>
                                ) : (
                                    savedMeals.map((meal) => (
                                        <div key={meal.id} className="saved-meal-item">
                                            <div className="meal-info">
                                                <h3>{meal.name}</h3>
                                                <p className="meal-date">Created: {meal.createdAt}</p>
                                                <div className="meal-nutrition">
                                                    <span>{meal.totalNutrition.calories} cal</span>
                                                    <span>P: {meal.totalNutrition.protein}g</span>
                                                    <span>C: {meal.totalNutrition.carbs}g</span>
                                                    <span>F: {meal.totalNutrition.fat}g</span>
                                                </div>
                                                <div className="meal-foods">
                                                    {meal.foods.map((food, index) => (
                                                        <span key={index} className="food-tag">
                                                            {food.name}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="meal-actions">
                                                <button
                                                    className="load-btn"
                                                    onClick={() => loadMeal(meal)}
                                                >
                                                    Load
                                                </button>
                                                <button
                                                    className="delete-btn"
                                                    onClick={() => deleteMeal(meal.id)}
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                        <div className="modal-backdrop" onClick={() => setShowSavedMeals(false)}></div>
                    </div>
                )}

                {/* Selected Foods Summary - Moved above category cards */}
                <div className="selected-foods-summary">
                    {/* <h2>Your Balanced Meal</h2> */}
                    {selectedFoods.length === 0 ? (
                        <div className="empty-state">
                            <p>Select an item...</p>
                        </div>
                    ) : (
                        <div className="meal-breakdown">
                            <div className="meal-name-section">
                                <input
                                    type="text"
                                    placeholder="Enter meal name (e.g., 'Breakfast', 'Post-workout')"
                                    value={currentMealName}
                                    onChange={(e) => setCurrentMealName(e.target.value)}
                                    className="meal-name-input"
                                />
                                <button
                                    className="save-meal-btn"
                                    onClick={saveMeal}
                                    disabled={!currentMealName.trim() || selectedFoods.length === 0}
                                >
                                    Save Meal
                                </button>
                            </div>
                            <div className="selected-foods">
                                {selectedFoods.map((food) => (
                                    <div key={food.id} className="selected-food-item">
                                        <div className="food-image">
                                            <img src={food.image} alt={food.name} />
                                        </div>
                                        <div className="food-details">
                                            <h4>{food.name}</h4>
                                            <p>{food.calories} cal | P: {food.protein}g | C: {food.carbs}g | F: {food.fat}g</p>
                                            <span className={`category-badge ${food.category}`}>{food.category}</span>
                                        </div>
                                        <button
                                            className="remove-btn"
                                            onClick={() => removeFood(food.id)}
                                        >
                                            ×
                                        </button>
                                    </div>
                                ))}
                            </div>
                            <div className="meal-summary">
                                <h3>Total Nutrition</h3>
                                <div className="nutrition-grid">
                                    <div className="nutrition-item">
                                        <span className="label">Calories</span>
                                        <span className="value">{formatNum(selectedFoods.reduce((sum, food) => sum + food.calories, 0))}</span>
                                    </div>
                                    <div className="nutrition-item">
                                        <span className="label">Protein</span>
                                        <span className="value">{formatNum(selectedFoods.reduce((sum, food) => sum + food.protein, 0))}g</span>
                                    </div>
                                    <div className="nutrition-item">
                                        <span className="label">Carbs</span>
                                        <span className="value">{formatNum(selectedFoods.reduce((sum, food) => sum + food.carbs, 0))}g</span>
                                    </div>
                                    <div className="nutrition-item">
                                        <span className="label">Fat</span>
                                        <span className="value">{formatNum(selectedFoods.reduce((sum, food) => sum + food.fat, 0))}g</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                <div className="select-category-buttons">
                    <button
                        className={`category-btn${selectedCategory === 'protein' ? ' active' : ''}`}
                        onClick={() => setSelectedCategory('protein')}
                    >
                        Protein
                    </button>
                    <button
                        className={`category-btn${selectedCategory === 'carbs' ? ' active' : ''}`}
                        onClick={() => setSelectedCategory('carbs')}
                    >
                        Carbs
                    </button>
                    <button
                        className={`category-btn${selectedCategory === 'fats' ? ' active' : ''}`}
                        onClick={() => setSelectedCategory('fats')}
                    >
                        Fats
                    </button>
                    <button
                        className={`category-btn${selectedCategory === 'fruits' ? ' active' : ''}`}
                        onClick={() => setSelectedCategory('fruits')}
                    >
                        Fruits
                    </button>
                </div>

                <div className="category-cards">
                    {selectedCategory === 'protein' && (
                        <div className="category-card protein-card">
                            <div className="category-header">
                                <h2>🥩 Protein</h2>
                                <p>{proteinFoods.length} options</p>
                            </div>
                            <div className="food-list">
                                {proteinFoods.map((food) => (
                                    <div key={food.id} className="food-item">
                                        <div className="food-image">
                                            <img src={food.image} alt={food.name} />
                                        </div>
                                        <div className="food-info">
                                            <h3>{food.name}</h3>
                                            <p>{food.calories} cal | {food.protein}g protein</p>
                                            <span className="serving-size">{food.servingSize}</span>
                                        </div>
                                        <button
                                            className="add-btn"
                                            onClick={() => addFood(food)}
                                        >
                                            Add
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                    {selectedCategory === 'carbs' && (
                        <div className="category-card carbs-card">
                            <div className="category-header">
                                <h2>🍞 Carbs</h2>
                                <p>{carbFoods.length} options</p>
                            </div>
                            <div className="food-list">
                                {carbFoods.map((food) => (
                                    <div key={food.id} className="food-item">
                                        <div className="food-image">
                                            <img src={food.image} alt={food.name} />
                                        </div>
                                        <div className="food-info">
                                            <h3>{food.name}</h3>
                                            <p>{food.calories} cal | {food.carbs}g carbs</p>
                                            <span className="serving-size">{food.servingSize}</span>
                                        </div>
                                        <button
                                            className="add-btn"
                                            onClick={() => addFood(food)}
                                        >
                                            Add
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                    {selectedCategory === 'fats' && (
                        <div className="category-card fats-card">
                            <div className="category-header">
                                <h2>🥑 Fats</h2>
                                <p>{fatFoods.length} options</p>
                            </div>
                            <div className="food-list">
                                {fatFoods.map((food) => (
                                    <div key={food.id} className="food-item">
                                        <div className="food-image">
                                            <img src={food.image} alt={food.name} />
                                        </div>
                                        <div className="food-info">
                                            <h3>{food.name}</h3>
                                            <p>{food.calories} cal | {food.fat}g fat</p>
                                            <span className="serving-size">{food.servingSize}</span>
                                        </div>
                                        <button
                                            className="add-btn"
                                            onClick={() => addFood(food)}
                                        >
                                            Add
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                    {selectedCategory === 'fruits' && (
                        <div className="category-card fruits-card">
                            <div className="category-header">
                                <h2>🍎 Fruits</h2>
                                <p>{fruitFoods.length} options</p>
                            </div>
                            <div className="food-list">
                                {fruitFoods.map((food) => (
                                    <div key={food.id} className="food-item">
                                        <div className="food-image">
                                            <img src={food.image} alt={food.name} />
                                        </div>
                                        <div className="food-info">
                                            <h3>{food.name}</h3>
                                            <p>{food.calories} cal | {food.carbs}g carbs</p>
                                            <span className="serving-size">{food.servingSize}</span>
                                        </div>
                                        <button
                                            className="add-btn"
                                            onClick={() => addFood(food)}
                                        >
                                            Add
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MealPlanner;
