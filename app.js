let express = require("express");
const app = express();
let path = require("path");
let staticFiles = path.join(__dirname, "public");
let bodyParser = require("body-parser");
require("dotenv").config();
const session = require('./helpers/session.auth');
const cors = require("cors");
let { handleCorsPolicy } = require("./helpers/cors");

let connection = require("./connection/db.connection");
connection();
let userRoutes = require("./routes/user.routers");
let blogRoutes = require("./routes/blogs.Router");


app.set('view-engine', 'ejs');
app.use(express.static(staticFiles));

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.json());



app.use(cors());
app.use(handleCorsPolicy);
app.use(session);
app.use(userRoutes);
app.use(blogRoutes);

app.listen(process.env.PORT, () => {console.log(`server is running at port ${process.env.PORT}`);})


