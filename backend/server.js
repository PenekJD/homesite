const http = require("http");

const host = 'localhost';
const port = 8000;

// const requestListener = function (req, res) {
//     res.setHeader("Content-Type", "application/json");
//     res.writeHead(200);
//     res.end(`{"message": "This is a JSON response"}`);
// };


http.createServer(function(request, response) {

  console.log(request.url);

  let responseObj = {
    "data" : "welcome"
  }

  if (request.url === "/") {
    responseObj = {
      array: [
        {name: "Dima", id: (new Date('1993')).getTime() },
        {name: "Nastya", id: (new Date('1995')).getTime() },
      ]
    }
  }

  if (request.url === "/1") {
    responseObj = {
      array: [
        {name: "SpongeBob", id: (new Date('1993')).getTime() },
        {name: "Mr.Krabs", id: (new Date('1992')).getTime() },
        {name: "Mrs.Puff", id: (new Date('1991')).getTime() },
      ]
    }
  }

  if (request.url === "/products") {
    responseObj = [
      { title: "Sample 1", id: 1 },
      { title: "Sample 2", id: 2 },
      { title: "Sample 3", id: 3 },
    ];
  }

  if (request.url === "/options/1") {
    responseObj = { desc: "You are the best developer" }
  }
  if (request.url === "/options/2") {
    responseObj = { desc: "So and you" }
  }
  if (request.url === "/options/3") {
    responseObj = { desc: "Don't think that you're worse then any others" }
  }

  response.statusCode = 200;
  response.setHeader("Content-Type", "application/json");
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.write(JSON.stringify(responseObj));
  response.end();
}).listen(port);