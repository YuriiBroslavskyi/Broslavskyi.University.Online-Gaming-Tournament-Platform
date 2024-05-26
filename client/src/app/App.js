import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleGoogleAuth = async () => {
        window.open('http://localhost:3001/auth/google', '_self');
    };

    useEffect(() => {
        if (!isLoggedIn)
            axios
                .get('http://localhost:3001/auth/account', {
                    withCredentials: true,
                })
                .then((res) => {
                    if (res?.data) console.log(res.data);
                    setIsLoggedIn(true);
                })
                .catch((e) => {
                    console.log(e);
                });
        else return;
    }, [isLoggedIn]);

    return (
        <main>
            <button onClick={() => handleGoogleAuth().then()}>
                Sign in with google
            </button>
        </main>
    );
}

export default App;
