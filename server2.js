import { createServer } from "http";
const PORT = 8000;
const users = [
  { id: 1, name: "John Doe" },
  { id: 2, name: "Jane Zainab" },
];

//logger middleware
const logger = (req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
};

//JSON middleware
const jsonMiddleware = (req, res, next) => {
  res.setHeader("Content-Type", "application/json");
  next();
};
const getUserbyIdHandler = (req, res) => {
  const id = req.url.split("/")[3];
  const user = users.find((user) => user.id === parseInt(id));
  res.setHeader("Content-Type", "application/json");
  if (user) {
    res.write(JSON.stringify(user));
  } else {
    res.statusCode = 404;
    res.write(
      JSON.stringify({
        message: "User not found",
      })
    );
  }
  next();
};
//Not Found Handler
const notFoundHandler = (req, res) => {
  res.statusCode = 404;
  res.write(
    JSON.stringify({
      message: "Route not found",
    })
  );
  res.end();
};
// Route Handler for GET /api/users
const getUsersHandler = (req, res) => {
  res.write(JSON.stringify(users));
  res.end();
};
const server = createServer((req, res) => {
  logger(req, res, () => {
    jsonMiddleware(req, res, () => {
      if (req.url === "/api/users" && req.method === "GET") {
        getUsersHandler(req, res);
      } else if (req.url.match(/\/api\/users\/\d+/) && req.method === "GET") {
        getUserbyIdHandler(req, res);
      } else {
        notFoundHandler(req, res);
      }
    }
    );
  });
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
