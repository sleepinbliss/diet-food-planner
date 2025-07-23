import React, { useState } from 'react';
import { FaChartPie, FaHome, FaUtensils, FaTasks, FaBook, FaBrain, FaInfoCircle, FaChevronRight, FaChevronLeft } from "react-icons/fa";

const Navbar = () => {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleSidebar = () => {
        setIsExpanded(!isExpanded);
    };

    const menuItems = [
        { path: '/', label: 'Home', icon: FaHome },
        { path: '/meal', label: 'Meal Planner', icon: FaUtensils },
        { path: '/productivity', label: 'Productivity', icon: FaTasks },
        { path: '/study', label: 'Study Planner', icon: FaBook },
        { path: '/mental', label: 'Mental Wellness', icon: FaBrain },
        { path: '/about', label: 'About', icon: FaInfoCircle }
    ];

    return (
        <nav className={`sidebar ${isExpanded ? 'expanded' : 'collapsed'}`}>
            <div className="navHeader">
                <div className="logo-section">
                    {/* <FaChartPie className="main-logo" /> */}
                    {isExpanded}
                </div>
                <button className="toggle-btn" onClick={toggleSidebar}>
                    {isExpanded ? <FaChevronLeft /> : <FaChevronRight />}
                </button>
            </div>

            <ul className="nav-menu">
                {menuItems.map((item, index) => {
                    const IconComponent = item.icon;
                    return (
                        <li key={index} className="nav-item">
                            <a href={item.path} className="nav-link">
                                <IconComponent className="nav-icon" />
                                {isExpanded && <span className="nav-text">{item.label}</span>}
                            </a>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
};

export default Navbar;