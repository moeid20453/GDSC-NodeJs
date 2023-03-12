let express = require("express");
const app = express();
let bodyParser = require("body-parser");
let path = require("path");
let staticFiles = path.join(__dirname, "public");
require("dotenv").config();
const session = require('../helpers/session.auth');

let indexRoutes = require("../routes/index.routes")
const cors = require("cors");
let { handleCorsPolicy } = require("../helpers/cors");



let {connection} = require("./database");
connection();


app.set('view-engine', 'ejs');
app.use(express.static(staticFiles));

app.use(express.json());
app.use(bodyParser.urlencoded({extended: false}));



app.use(cors());
app.use(handleCorsPolicy);
app.use(session);
app.use(indexRoutes )


app.listen(process.env.PORT, () => {console.log(`server is running at port ${process.env.PORT}`);})


