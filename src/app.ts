import express from 'express';
import db from "./Utilities/authorization";
import routeruse from './Order/route';
const app = express();


// parse requests of content-type - application/json
app.use(express.json());  /* bodyParser.json() is deprecated */

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));   /* bodyParser.urlencoded() is deprecated */

// db.sequelize.sync(); //TODO

app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

routeruse(app);

const PORT =  8085;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
