import { Link } from 'react-router-dom';
import React from 'react';
import classes from './Navbar.module.css';




export default function Navbar() {
  
  return (
    <nav className="flex justify-between bg-gray-100 p-4">
      <div className="flex items-center  p-4 bg-white shadow-md">
          <img src="/NutriByteLogo.png" alt="" className={classes.image} />
          <h1 className={classes.brandname}>NutriByte</h1>
        
      </div>

      <div className="flex gap-4 items-center">
        <div className={classes.divider}>
          <Link to="/">Home</Link>
          <Link to="/search">Search</Link>
          {/* <Link to="SearchByBrand">Search by Brand</Link> */}
          <Link to="/compare">Compare</Link>
          <Link to="/custom">Custom Meals</Link>
          <Link to="/macros">Macros</Link>
        </div>
      </div>
    </nav>
  );
}
