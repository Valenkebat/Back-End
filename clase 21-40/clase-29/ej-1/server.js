const express = require("express");
const cluster = require("cluster");
const os = require("os");

const numCpus = os.cpus().length

if (cluster.isPrimary) {
    console.log(numCpus)
    console.log(process.pid)
    for (let i = 0; i < numCpus; i++) {
        cluster.fork()        
    }
} else {
  const app = express();

  const PORT = parseInt(process.argv[2]) || 8080;

  app.get("/", (req, res) => {
    res.send(
      ` servidor express en ${PORT} - PID - ${
        process.pid
      } - ${new Date().toLocaleString()}`
    );
  });

  app.listen(PORT, (error) => {
    console.log(error);
  });
}

//tasklist /fi "imagename eq node.exe"
