const http = require('http');
const url = require('url');

const viewCounts = {
  '/': 0,
  '/about': 0
};

const server = http.createServer((req, res) => {
  const path = url.parse(req.url).pathname;
  viewCounts[path]++;

  if (path === '/') {
    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
    res.end(`
      <html>
      <head>
        <title>Страница /</title>
      </head>
      <body>
        <h1>Корневая страница</h1>
        <p>Просмотров: ${viewCounts['/']}</p>
        <a href="/about">Ссылка на страницу /about</a>
      </body>
      </html>
    `);
  } else if (path === '/about') {
    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
    res.end(`
      <html>
      <head>
        <title>Страница /about</title>
      </head>
      <body>
        <h1>Страница about</h1>
        <p>Просмотров: ${viewCounts['/about']}</p>
        <a href="/">Ссылка на страницу /</a>
      </body>
      </html>
    `);
  } else {
    res.writeHead(404, {'Content-Type': 'text/html; charset=utf-8'});
    res.end('<h1>Страница не найдена!</h1>');
  }
});

server.listen(3000, () => {
  console.log('Сервер запущен на порту 3000');
});