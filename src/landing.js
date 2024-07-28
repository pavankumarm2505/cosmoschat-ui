import React from 'react';

const Landing = ({onStartChat})=> {
    return(
        <div className='landing-page'>
            <header className='landing-header'>
                <h1>CosmoChat UI</h1>
                <p>Welcome to your own chat assistant</p>
                <button className='chat-button' onClick={onStartChat}>
                    Start Chat
                </button>
            </header>
            <footer className='lna-footer'>
            <p>&copy; 2024 CosmoChat UI. All rights reserved.</p>
            </footer>
        </div>

    );
};

export default Landing;