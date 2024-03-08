import React from 'react';
import { NavLink } from 'react-router-dom';

export const Header = () => {
    return (
        <header className='navbar'>
            <h1 className='navbar__logo'>Express Auth</h1>
            <nav className='navbar__menu'>
                <NavLink
                    to='/'
                    className={({ isActive }) =>
                        isActive
                            ? 'navbar__link navbar__link--active'
                            : 'navbar__link'
                    }
                >
                    Home
                </NavLink>
                <NavLink
                    to='/login'
                    className={({ isActive }) =>
                        isActive
                            ? 'navbar__link navbar__link--active'
                            : 'navbar__link'
                    }
                >
                    Login
                </NavLink>
            </nav>
        </header>
    );
};
