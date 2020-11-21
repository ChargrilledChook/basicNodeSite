const url = require("url");
const http = require("http");
const fileSystem = require("fs");

const PORT = 8080;

http
  .createServer((req, res) => {
    const urlPath = url.parse(req.url, true);
    let filename = "." + urlPath.pathname;
    console.log(urlPath.pathname);
    filename = filename === "./" ? "./index.html" : filename;
    fileSystem.readFile(filename, (err, data) => {
      if (err) {
        errorPage = "./404.html";
        fileSystem.readFile(errorPage, (err, data) => {
          if (err) {
            res.writeHead(404, { "Content-Type": "text/html" });
            return res.end("404 Not Found");
          }
          res.writeHead(200, { "Content-Type": "text/html" });
          res.write(data);
          return res.end();
        });
      }
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(data);
      return res.end();
    });
  })
  .listen(PORT);
