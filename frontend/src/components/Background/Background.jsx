// src/components/Background/Background.jsx
// This component renders a background image and a logo for the application.
// It uses CSS modules for styling and is designed to be responsive.
import { Link } from 'react-router-dom';
import React from 'react';
import classes from './Background.module.css';

export default function Background() {
  
  return (    
    <div>
        <div className={classes.LogoContainer}/>
    </div>
  );
}
