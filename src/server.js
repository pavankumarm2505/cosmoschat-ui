const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

const users = {
  'example_user': { id: 123, username: 'example_user', password: 'password' }
};


app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users[username];

  if (user && user.password === password) {
    req.session.user = { id: user.id, username: user.username };
    res.json({ message: 'Login successful', user: { id: user.id, username: user.username } });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});


app.get('/chat/history', (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const chatHistory = retrieveChatHistory(req.session.user.id); // Implement this function to get chat history from your database
  res.json(chatHistory);
});

// Update chat status
app.post('/chat/status', (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  updateChatStatus(req.session.user.id, req.body.status); // Implement this function to update chat status in your database
  res.json({ message: 'Chat status updated' });
});

// Mock function to retrieve chat history
function retrieveChatHistory(userId) {
  // Replace with actual database retrieval logic
  return [
    { sender: 'ChatGPT', message: 'hello, I am ChatGPT!', direction: 'incoming' }
  ];
}

// Mock function to update chat status
function updateChatStatus(userId, status) {
  // Replace with actual database update logic
  console.log(`Updating chat status for user ${userId} to ${status}`);
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
