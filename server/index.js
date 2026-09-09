const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

const app = express();
const port = process.env.PORT || 5000;
const jwtSecret = process.env.JWT_SECRET || 'replace-this-development-secret';
const demoEmail = (process.env.DEMO_USER_EMAIL || 'candidate@example.com').toLowerCase();
const demoPassword = process.env.DEMO_USER_PASSWORD || 'password123';
const demoPasswordHash = bcrypt.hashSync(demoPassword, 10);
const usersFile = path.join(__dirname, '..', 'data', 'users.json');

app.use(cors());
app.use(express.json());

app.get('/api/health', (request, response) => {
  response.json({ status: 'ok' });
});

const readUsers = () => JSON.parse(fs.readFileSync(usersFile, 'utf8'));
const writeUsers = (users) => fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));
const createToken = (email) => jwt.sign({ email }, jwtSecret, { expiresIn: '2h' });

app.post('/api/auth/register', async (request, response) => {
  const name = request.body.name?.trim();
  const email = request.body.email?.trim().toLowerCase();
  const password = request.body.password;

  if (!name || !email || !password) {
    return response.status(400).json({ message: 'Name, email, and password are required.' });
  }

  if (password.length < 8) {
    return response.status(400).json({ message: 'Password must be at least 8 characters.' });
  }

  const users = readUsers();
  const emailTaken = email === demoEmail || users.some((user) => user.email === email);
  if (emailTaken) {
    return response.status(409).json({ message: 'An account with this email already exists.' });
  }

  const user = { id: Date.now().toString(), name, email, passwordHash: await bcrypt.hash(password, 10) };
  users.push(user);
  writeUsers(users);

  return response.status(201).json({
    user: { name: user.name, email: user.email },
    token: createToken(user.email)
  });
});

app.post('/api/auth/login', async (request, response) => {
  const email = request.body.email?.trim().toLowerCase();
  const password = request.body.password;

  if (!email || !password) {
    return response.status(400).json({ message: 'Email and password are required.' });
  }

  const registeredUser = readUsers().find((user) => user.email === email);
  const isValidUser = email === demoEmail
    ? await bcrypt.compare(password, demoPasswordHash)
    : registeredUser && await bcrypt.compare(password, registeredUser.passwordHash);
  if (!isValidUser) {
    return response.status(401).json({ message: 'Invalid email or password.' });
  }

  return response.json({
    user: { name: registeredUser?.name, email },
    token: createToken(email)
  });
});

app.listen(port, () => {
  console.log(`API server listening on http://localhost:${port}`);
});