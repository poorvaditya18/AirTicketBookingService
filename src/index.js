const express = require("express");
const bodyParser = require("body-parser");

// PORT--> default 3002
const { PORT } = require("./config/serverConfig");

//routes
const apiRoutes = require("./routes/index");

//db
const db = require("./models/index");

const app = express();

const setupAndStartServer = () => {
  //config body-parser
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use("/api", apiRoutes);

  app.listen(PORT, () => {
    console.log(`Server started on ${PORT}`);
    if (process.env.DB_SYNC) {
      db.sequelize.sync({ alter: true });
    }
  });
};

setupAndStartServer();
