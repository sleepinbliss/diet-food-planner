import React, { useState } from 'react';
import { GiHamburgerMenu } from "react-icons/gi";
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const itemVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { duration: 0.4, delay: .1 }
        },
        exit: {
            opacity: 0,
            transition: { duration: 0.1 } // No delay
        }
    };

    const menuVariants = {
        hidden: {
            opacity: 1,
            scaleY: 0,
            transformOrigin: 'top'
        },
        visible: {
            opacity: 1,
            scaleY: 1,
            transformOrigin: 'top',
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 15, // Lower damping = more bounce
                mass: 0.8
            }
        },
        exit: {
            opacity: 1,
            scaleY: 0,
            transformOrigin: 'top',
            transition: { duration: 0.2 }
        }
    };

    return (
        <nav>
            <div className="navHeader">
                <h2>Easy Planner</h2>
                <GiHamburgerMenu onClick={toggleMenu} />
            </div>

            <AnimatePresence>
                {isMenuOpen && (
                    <motion.ul
                        variants={menuVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        style={{
                            position: 'absolute', // Remove from normal flow
                            top: '100%',          // Position below navbar
                            left: 0,
                            right: 0,
                            paddingBottom: '1rem',
                            backgroundColor: 'var(--color05)', // Give it a background
                            zIndex: 1000,         // Make sure it's on top
                            listStyle: 'none',
                            margin: 0
                        }}
                    >
                        <motion.li
                            variants={itemVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                        >
                            <a href="/">Home</a>
                        </motion.li>
                        <motion.li
                            variants={itemVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                        >
                            <a href="/about">About</a>
                        </motion.li>
                    </motion.ul>
                )}
            </AnimatePresence>
        </nav >
    );
};

export default Navbar;