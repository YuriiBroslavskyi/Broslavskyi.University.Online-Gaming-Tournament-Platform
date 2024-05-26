import React from 'react';
import { Typography, Button } from '@mui/material';
import Link from '@mui/material/Link';

const AboutPage = () => {

    return (
        <div>
            <Typography variant="h4" gutterBottom>
                About Page
            </Typography>
            <Typography variant="body1" gutterBottom>
                <strong>Name and Surname:</strong> Yurii Broslavskyi
            </Typography>
            <Typography variant="body1" gutterBottom>
                <strong>Name of Project:</strong> Online Gaming Tournament Platform
            </Typography>
            <Typography variant="body1" gutterBottom>
                <strong>Telegram:</strong>{' '}
                <Link href="https://t.me/Yura_ne_yura" target="_blank" rel="noopener" color="secondary">
                    My telegram
                </Link>
            </Typography>
            <Typography variant="body1" gutterBottom>
                <strong>Email:</strong> yurii.broslavskyi@lnu.edu.ua
            </Typography>
            <Typography variant="body1" gutterBottom>
                <strong>Github:</strong>{' '}
                <Link href="https://github.com/YuriiBroslavskyi/Broslavskyi.University.Online-Gaming-Tournament-Platform" target="_blank" rel="noopener" color="secondary">
                    Link to github repository of this project
                </Link>
            </Typography>
        </div>
    );
};

export default AboutPage;
