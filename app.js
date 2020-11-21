const url = require("url");
const http = require("http");
const fileSystem = require("fs");

const indexPage = "./index.html";
const errorPage = "./404.html";
const PORT = 8080;

http
  .createServer((req, res) => {
    const urlPath = url.parse(req.url, true);
    let filename = "." + urlPath.pathname + ".html";

    if (urlPath.pathname === "/" || urlPath.pathname === "")
      filename = indexPage;

    fileSystem.readFile(filename, (err, data) => {
      if (err) {
        return fileSystem.readFile(errorPage, (err2, errorData) => {
          if (err2) throw err2;

          res.writeHead(404, { "Content-Type": "text/html" });
          res.write(errorData);
          return res.end();
        });
      }
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(data);
      return res.end();
    });
  })
  .listen(PORT);
