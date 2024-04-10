import { useContext } from 'react';
import { userContext } from '../context/userContext';

export const Profile = () => {
    const user = useContext(userContext); 
    if (user) {
        return (
            <article className='profile'>
                <img
                    src={user.picture}
                    alt='Unable to load profile photo'
                    className='profile__picture'
                />
                <h2 className='profile__name'>{user.displayName}</h2>
                <a href={'mailto:' + user.email} className='profile__email'>
                    {user.email}
                </a>
                <p>League: {user.league}</p>
            </article>
        );
    }

    return (
        <section>
            <h2>There are no profile information to display...</h2>
        </section>
    );
};
