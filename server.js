var express = require('express');
var moment = require('moment');
var app = express();

app.set('port', process.env.PORT || 8081);

app.get('/', function (req, res) {
    res.send('Hello World!');
});

/* Prevent a favicon not found. Send 204 - no content */
app.get('/favicon.ico', function (req, res) {
    res.status(204);
});

app.get("/:date", function (req, res) {
    var tekst = req.params.date;
    var outputDate = defineDate(tekst);
    
    res.send(outputDate);
});

app.listen(8081, function() {
    console.log('Example app running');
});

function isInt(value) {
    /* check if the input-parameter is an integer 
    ** return true if integer, return false if not an integer 
    */
    
    if (isNaN(value)) {
        return false;
    }
    var x = parseFloat(value);
    return (x | 0) === x;
}

function defineDate (inputDate) {
    var unixDate = "";
    var humanDate = "";
    
    if (inputDate === "") {
        return undefined;
    };
    
    if (isInt(inputDate) == true) {
        /* Input paramter is integer. Convert Unix Timestamp to human date */

        unixDate = moment.unix(inputDate);
        console.log("day = " + unixDate);
        humanDate = moment(unixDate).format("MMMM Do, YYYY");
        console.log("testDate : " + humanDate);
    }
    else {
        if ((moment(inputDate, "MMMM DD, YYYY").isValid())) {
        /* Input paramter is not integer. Convert human date to Unix Timestamp */
            console.log("inputDate : " + inputDate);
            var testDate = moment(inputDate, "MMMM DO, YYYY");
            unixDate = moment(testDate).format("X");
            console.log("unixDate : " + unixDate);
            humanDate = moment(testDate).format("MMMM Do, YYYY");
            console.log("humanDate : " + humanDate);

        }
        else {
            /* Invalid date */
            console.log("Undefined");
            return undefined;
        };
    };
    return unixDate + ", " + humanDate;
}

