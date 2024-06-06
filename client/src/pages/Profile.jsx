import React, { useContext, useState } from 'react';
import { userContext } from '../context/userContext';
import axios from 'axios';

export const Profile = () => {
    const { user, setUser } = useContext(userContext);
    const [newDisplayName, setNewDisplayName] = useState('');
    const [newPicture, setNewPicture] = useState(null);

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        const form = e.target;

        const formData = new FormData(form);

        try {
            const updatedUser = await axios.put('http://localhost:3001/profile/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                withCredentials: true,
            }
            );
            setUser(updatedUser);
        } catch (error) {
            console.error(error);
        }
    };

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
                <form className='profile__form' onSubmit={handleFormSubmit}>
                    <input
                        name='displayName'
                        type='text'
                        placeholder='New display name'
                        value={newDisplayName}
                        onChange={(e) => setNewDisplayName(e.target.value)}
                        className='profile__input'
                    />
                    <input
                        name='picture'
                        type='file'
                        accept='image/*'
                        onChange={({ target }) => setNewPicture(target.files.item(0))}
                        className='profile__input'
                    />
                    <button type='submit' className='profile__button'>
                        Update Profile
                    </button>
                </form>
            </article>
        );
    }

    return (
        <section>
            <h2>There is no profile information to display...</h2>
        </section>
    );
};
