# Express Google Authentication

Is an example implementation of google authentication with express.js and passport.js

## Author

Hulak Mykhailo

[Send me an email](miha.gulak@gmail.com)

[Find me on telegram](https://t.me/@midjiro)

## Getting Started

1.  Create a new project on google cloud platform
1.  Follow [this](https://youtu.be/TKnnrGU9MFw?si=RUbJ3RjKTFT7n3eR) tutorial to setup a consent screen, grab your credentials
1.  Create a new cluster at [mongodb](https://www.mongodb.com/) and copy a connection string
1.  Clone repo with

`git clone https://github.com/midjiro/express-google-auth.git`

1.  Create a default.json file inside of server/config folder with the following code

```
    {
        "CLIENT_ID": "...",
        "CLIENT_SECRET": "...",
        "SESSION_SECRET": "...",
        "CONNECTION_STRING": "...",
        "PORT": 3001
    }
```

1.  Replace dots by copied data,your session secret key and mongodb connection string.

1.  Run `npm install` both in client and server directories

1.  Now you are ready to run the project. Happy hacking!
