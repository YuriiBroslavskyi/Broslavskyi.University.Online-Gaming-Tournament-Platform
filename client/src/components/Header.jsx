import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { userContext } from '../context/userContext';
import axios from 'axios';

export const Header = ({logout}) => {
    const user = useContext(userContext);

    return (
        <header className='navbar'>
            <h1 className='navbar__logo'>Online Gaming Tournament Platform</h1>
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
                {
                    user ?
                        <>
                            <button
                                onClick={logout}
                            >
                            Logout
                            </button>
                            <NavLink
                                to='/create-tournament'
                                className={({ isActive }) =>
                                    isActive
                                        ? 'navbar__link navbar__link--active'
                                        : 'navbar__link'
                                }
                            >
                                Create Tournament
                            </NavLink>
                            <NavLink
                                to='/profile'
                                className={({ isActive }) =>
                                    isActive
                                        ? 'navbar__link navbar__link--active'
                                        : 'navbar__link'
                                }
                            >
                                Profile
                            </NavLink>
                        </> :
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
                }


                <NavLink
                    to='/league-joining'
                    className={({ isActive }) =>
                        isActive
                            ? 'navbar__link navbar__link--active'
                            : 'navbar__link'
                    }
                >
                    League Joining
                </NavLink>
            </nav>
        </header>
    );
};
