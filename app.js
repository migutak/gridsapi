
var express = require("express");
var bodyparser = require("body-parser");
var cors = require("cors");
var grid_viewall = require("./apis/grid_viewall");
var grid_viewall_loans = require("./apis/grid_viewall_loans"); 

var swStats = require('swagger-stats');  

const app = express();
app.use(swStats.getMiddleware());

app.use(cors());
app.use(bodyparser.json({ limit: '10mb' }));
app.use(bodyparser.urlencoded({ extended: true, limit: '10mb' }));

app.use("/grids/gridviewallloans",grid_viewall_loans);
app.use("/grids/gridviewall",grid_viewall);

//if we are here then the specified request is not found
app.use((req,res,next)=> {
    const err = new Error("Not Found");
    err.status = 404;
    next(err);
});

//all other requests are not implemented.
app.use((err,req, res, next) => {
   res.status(err.status || 501);
   res.json({
       error: {
           code: err.status || 501,
           message: err.message
       }
   });
});

module.exports = app;
