const url = require("url");
const http = require("http");
const fileSystem = require("fs");

http
  .createServer((req, res) => {
    const urlPath = url.parse(req.url, true);
    let filename = "." + urlPath.pathname;
    fileSystem.readFile(filename, (err, data) => {
      console.log(filename);
      console.log(data);
      if (err) {
        res.writeHead(404, { "Content-Type": "text/html" });
        return res.end("404 Not Found");
      }
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(data);
      return res.end();
    });
  })
  .listen(8080);
