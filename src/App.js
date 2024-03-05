import logo from './logo.svg';
import './App.css';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import { useState } from 'react';

function App() {

  const [user,setUser] = useState({
    profile: null,
    error: null,

  });
  
  if(user.profile) return (<section>
    <h1>Logged in successfully</h1>
    <p>We are glad to see you in our community, {user.profile.name}</p>
  </section>);
  else if(user.error) return (<section>
    <h1>Something went wrong...</h1>
    <p>{user.error.message}</p>
  </section>);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
        </a>
        <span>
          <GoogleLogin
            onSuccess={credentialResponse => {
              const credentials = jwtDecode(credentialResponse?.credential);
              console.log(credentials)
              setUser({profile: credentials, error: null});
            }}
            onError={(error) => {
              setUser({profile: null, error})
            }}
          />
        </span>
      </header>
    </div>
  );
}

export default App;