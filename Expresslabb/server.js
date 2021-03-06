const { createServer } = require("http");
const { createReadStream } = require("fs");
const { decode } = require('querystring');

var myModule = require("./myModule");

const sendFile = (response,status, type, filePath) =>{
    response.writeHead(status, { "Content-Type": type });
    createReadStream(filePath).pipe(response);
};

createServer((request, response) => {
  if (request.method === "POST") {
    let body = "";
    request.on("data", data => {
      body += data;
    });
    request.on("end", () => {
      const { name, email, message } = decode(body);
      myModule.updateDb(email, name, message);
      console.log(`email: ${email}, name: ${name}, message:${message}`);
    });

  }

    switch (request.url) {
        case"/":
          return sendFile(response, 200, "text/html", "./hostahemsida.html");
        case"/style.css":
          return sendFile(response, 200, "text/css", "./style.css");
        case"/volvo240.jpg":
          return sendFile(response, 200, "image/jpeg","./volvo240.jpg");
        case"/error.html":
          return sendFile(response, 200, "text/html", "./error.html");
        default:
            return sendFile(response, 200, "text/html", "./error.html");


    }
}).listen(8080);

console.log("Melker's personal website running on port 8080");