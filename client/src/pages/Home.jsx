import { useState, useEffect } from 'react';
import axios from 'axios';

export const Home = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        if (user === null)
            axios
                .get('http://localhost:3001/auth/account', {
                    withCredentials: true,
                })
                .then((res) => {
                    if (res?.data) {
                        setUser(res.data);
                    }
                })
                .catch((e) => {
                    console.log(e);
                });
        else return;
    }, [user]);

    if (user) {
        return (
            <article className='profile'>
                <img
                    src={user?.picture}
                    alt='Unable to load profile photo'
                    className='profile__picture'
                />
                <h2 className='profile__name'>{user.displayName}</h2>
                <a href={'mailto:' + user.email} className='profile__email'>
                    {user.email}
                </a>
            </article>
        );
    }

    return (
        <section>
            <h2>There are no profile information to display...</h2>
        </section>
    );
};
