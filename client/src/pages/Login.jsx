import React from 'react';

export const Login = () => {
    const handleGoogleAuth = async () => {
        window.open(`${process.env.REACT_APP_SERVER_URL}/auth/google`, '_self');
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
