import express from 'express';
import bodyParser from 'body-parser';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname));

// Serve the HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Handle form submission
app.post('/process', async (req, res) => {
  const { email, password } = req.body;

  // Create a data object
  const data = {
    email,
    password: password // Note: In a real application, never store passwords in plain text
  };

  try {
    // Read existing data
    let users = [];
    try {
      const fileContents = await fs.readFile('users.json', 'utf8');
      users = JSON.parse(fileContents);
    } catch (error) {
      // If file doesn't exist or is empty, start with an empty array
      console.log('No existing users file, starting fresh.');
    }

    // Add new user
    users.push(data);

    // Write updated data back to file
    await fs.writeFile('users.json', JSON.stringify(users, null, 2));

    res.send('Registration successful!');
  } catch (error) {
    console.error('Error saving data:', error);
    res.status(500).send('An error occurred while saving your data.');
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});