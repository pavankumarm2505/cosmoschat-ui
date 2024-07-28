import React, {useState} from 'react';
import Landing from './landing';
import Chat from './chat';
import Login from './login';
import './App.css';


function App() {
  const [chatVis, setChatVis] = useState(false);
  const [user, setUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const handleStartChat = () => {
    setChatVis(true);
  }

 

  const handleLogin = async (user) => {
    setUser(user);
    // Fetch chat history
    const response = await fetch('http://localhost:5000/chat/history', {
      method: 'GET',
      credentials: 'include'
    });
    if (response.ok) {
      const history = await response.json();
      setMessages(history);
    }
  };

  const handleLogout = async () => {
    const response = await fetch('http://localhost:5000/logout', {
      method: 'POST',
      credentials: 'include'
    });
    if (response.ok) {
      setUser(null);
      setChatVis(false);
      setMessages([]);
      localStorage.removeItem('authToken');
    }
  };
  return (
    <div className="App">
      {!user ? (
        <Login onLogin={handleLogin} />
      ) : !chatVis ? (
        <Landing onStartChat={handleStartChat} />
      ) : (
        <Chat messages={messages} onLogout={handleLogout} />
      )}
    </div>
  );
}

export default App;
