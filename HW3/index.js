const express = require('express');
const path = require('path');
const fs = require('fs').promises;

const app = express();
const PORT = 3000;
const viewsPath = path.join(__dirname, 'views');
const viewCountsFile = path.join(__dirname, 'viewCounts.json');

let viewCounts = {
  '/': 0,
  '/about': 0
};

const loadViewCounts = async () => {
  try {
    const data = await fs.readFile(viewCountsFile, 'utf8');
    viewCounts = JSON.parse(data);
  } catch (err) {
    console.error('Error loading view counts:', err);
  }
};

const saveViewCounts = async () => {
  try {
    await fs.writeFile(viewCountsFile, JSON.stringify(viewCounts, null, 2));
  } catch (err) {
    console.error('Error saving view counts:', err);
  }
};

app.use((req, res, next) => {
  viewCounts[req.path]++;
  saveViewCounts();
  next();
});

app.get('/', (req, res) => {
  res.sendFile(path.join(viewsPath, 'index.html'));
});
  
app.get('/about', (req, res) => {
  res.sendFile(path.join(viewsPath, 'about.html'));
});

app.get('/viewCount', (req, res) => {
    let path = req.path;
    if (path === '/viewCount') {
      path = req.headers.referer.endsWith('/about') ? '/about' : '/';
    }
    const count = viewCounts[path] || 0;
    res.json({ count });
  });

loadViewCounts().then(() => {
  app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
  });
});