const app = require("./app");

const port = process.env.NODE_ENV == "development" ? process.env.DEV_PORT : process.env.PROD_PORT 
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});