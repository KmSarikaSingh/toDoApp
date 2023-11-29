import React from 'react';
import {useTheme} from './ThemeContext';

const Content = () => {
  const { isDarkMode } = useTheme();

  return (
   
    <div className={isDarkMode ? 'dark-mode-content' : 'light-mode-content'}>
    <p>Koushik</p>
   </div>
   
  );
};

export default Content;