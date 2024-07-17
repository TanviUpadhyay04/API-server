const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.json());


let users = [
  {
    id: 1,
    username: 'user1',
    email: 'user1@example.com',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 2,
    username: 'user2',
    email: 'user2@example.com',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

app.get('/users', (req, res) => {
  if (users.length === 0) {
    return res.status(404).json({ error: "No user found" });
  }
  res.status(200).json({ users });
});


app.get('/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const user = users.find(user => user.id === userId);

  if (!user) {
    return res.status(404).json({ error: "User doesn't exist" });
  }

  res.status(200).json(user);
});


app.post('/users', (req, res) => {
  const { username, email } = req.body;

  if (!username || !email) {
    return res.status(400).json({ error: "Username and email are required" });
  }


  const newUser = {
    id: users.length + 1,
    username,
    email,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };

  
  users.push(newUser);

 
  res.status(200).json(newUser);
});


app.patch('/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const user = users.find(user => user.id === userId);

  if (!user) {
    return res.status(404).json({ error: "User doesn't exist" });
  }

  const { username, email } = req.body;

  if (username) {
    user.username = username;
  }
  if (email) {
    user.email = email;
  }
  user.updated_at = new Date().toISOString();

  res.status(200).json(user);
});


app.delete('/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const userIndex = users.findIndex(user => user.id === userId);

  if (userIndex === -1) {
    return res.status(404).json({ error: "User doesn't exist" });
  }


  users.splice(userIndex, 1);


  res.status(204).send();
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
