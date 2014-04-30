/* XFinity TC8305C Wireless Gateway Driver
   (c) Jason Croucher 2014
*/

//get required modules
var request = require('request');
var request = request.defaults({jar: true})
var htmlparser = require("htmlparser2");

//set default username and password
var duser = "admin";
var dpassword = "password";

var connectedDevices = Array();

//implement setPassword for gatewayAPI
module.exports.setPassword = function(password){
    dpassword = password;
};

//implement setUser for gatewayAPI
module.exports.setUser = function(user){
    duser = user;
};

//implement getConnectedDevices for gatewayAPI
module.exports.getConnectedDevices = function(callback){
    getConnectedDevices(function (error, results){
        callback(error, results);
    });
}

var gettingHost = false;

var parser = new htmlparser.Parser({
    onopentag: function(name, attribs){
        gettingHost = (name === "td" && attribs.class === "cdc_host_name");
    },
    ontext: function(text){
        if(gettingHost){
            connectedDevices.push(text);
            gettingHost = false;
        }
    },
    onclosetag: function(tagname){
        gettingHost != (tagname === "td");
    }
});

function getConnectedDevices(callback){
    request('http://10.0.0.1', function (error, response, body) {
    if (!error && response.statusCode == 200) {
        //console.log(body) // Print the google web page.
        request.post('http://10.0.0.1/goform/home_loggedout', {form:{loginUsername:duser, loginPassword:dpassword}}, function (error, response, body){
            request('http://10.0.0.1/connected_devices_computers.asp', function (error, response, body){
                console.log(body);
                
                parser.write(body);
                parser.end();
                
                callback(error, connectedDevices);

            });
        });
    }
})

}
