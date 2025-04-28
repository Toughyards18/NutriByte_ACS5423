// src/types/cssModules.d.ts
// This file is used to declare CSS modules in TypeScript. It allows you to import CSS files as modules, which means you can use the class names defined in the CSS file as properties of an object. This is useful for avoiding naming conflicts and for better organization of styles in your React components.
declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}
