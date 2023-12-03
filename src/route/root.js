const userRouter = require("./users");
const foodRouter = require("./food");
const orderRouter = require("./orders");
const foodRateRouter = require("./foodRate");
const searchRouter  =require("./search");

function route(app) {
  app.use("/user", userRouter);

  app.use("/food", foodRouter);

  app.use("/order",orderRouter);

  app.use("/rate",foodRateRouter);
  
  app.use("/search", searchRouter);

  app.use("/", (req, res) => {
    return res.status(200).json({ "running base": "error" });
  });
}

module.exports = route;