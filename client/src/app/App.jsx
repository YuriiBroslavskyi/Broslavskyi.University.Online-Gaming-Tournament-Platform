import { Outlet } from 'react-router-dom';
import { Header } from '../components/Header';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { userContext } from '../context/userContext';

function App() {
    const [user, setUser] = useState(null);

    const logout = async () => {
        try {
            await axios.get(`${process.env.REACT_APP_SERVER_URL}/auth/logout`, { withCredentials: true })
            setUser(null);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        if (user === null)
            axios
                .get(`${process.env.REACT_APP_SERVER_URL}/auth/account`, {
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
    return (

        <>
            <userContext.Provider value={{ user, setUser }}>
                <Header logout={logout} />
                <main>
                    <Outlet />
                </main>
            </userContext.Provider>
        </>
    );
}

export default App;
