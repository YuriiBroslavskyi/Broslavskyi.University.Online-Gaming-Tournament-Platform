import React from 'react';

export const Login = () => {
    const handleGoogleAuth = async () => {
        window.open('http://localhost:3001/auth/google', '_self');
    };

    return (
        <section className='login'>
            <h2>Login With Google</h2>
            <button onClick={handleGoogleAuth} className='login__btn'>
                Click me!
            </button>
        </section>
    );
};
