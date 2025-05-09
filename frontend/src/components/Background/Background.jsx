// src/components/Background/Background.jsx
// This component renders a background image and a logo for the application.
// It uses CSS modules for styling and is designed to be responsive.

import React from 'react';
import classes from './Background.module.css';

export default function Background({ children })
{
  return (
    <div className={classes.LogoContainer}>
      <div className={classes.Logo} />
      {children}
    </div>
  );
}
