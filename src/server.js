const express = require("express");
const redis = require("redis");

const server = express();
const redisClient = redis.createClient({
  host: "redis-server",
  port: "6379",
});
redisClient.set("visits", 0);

server.get("/", (req, res) => {
  console.log("new connection");
  redisClient.get("visits", (err, visits) => {
    res.send(`Number of visits is ${visits}`);
    redisClient.set("visits", parseInt(visits) + 1);
  });
});

server.listen(4001, () => {
  console.log(`Server listening at http://localhost:${4001}`);
});
