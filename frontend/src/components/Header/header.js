import React from 'react';
import { Link } from 'react-router-dom';
import classes from './header.module.css';



export default function Header() 
{
    return (
        <header className={classes.header}>
        <div className={classes.container}>
            <Link to="/" className={classes.logo}>
            NutriByte!
            {/* <img src="../public/NutriByteLogo.png" alt="Logo" className={classes.logoImage} /> */}
            </Link>            
            
            <nav>
                <img src="/NutriByteLogo.png" alt="Logo" className={classes.logoImage} />
            </nav>
            <ul className={classes.navList}>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/search">Search</Link></li>
            <li><Link to="/compare">Compare</Link></li>
            <li><Link to="/custom">Custom Meals</Link></li>
            <li><Link to="/macros">Macros</Link></li>
            </ul>
        </div>
        </header>
    );
}