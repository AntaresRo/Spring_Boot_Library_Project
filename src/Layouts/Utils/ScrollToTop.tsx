import React from 'react';
import { Link } from 'react-router-dom';

export const ScrollToTop = () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
};