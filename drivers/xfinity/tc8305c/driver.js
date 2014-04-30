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
var dhost = "http://10.0.0.1";

var connectedDevices = Array();
var device = {};

//implement setPassword for gatewayAPI
module.exports.setPassword = function(password){
    dpassword = password;
};

//implement setUser for gatewayAPI
module.exports.setUser = function(user){
    duser = user;
};

//implement setUser for gatewayAPI
module.exports.setHost = function(host){
    dhost = host;
};

//implement getConnectedDevices for gatewayAPI
module.exports.getConnectedDevices = function(callback){
    getConnectedDevices(function (error, results){
        callback(error, results);
    });
}

//create parse flags
var gettingHost = false;
var gettingIP = false;
var gettingMac = false;

//Manage parser
var parser = new htmlparser.Parser({
    onopentag: function(name, attribs){
        gettingHost = (name === "td" && attribs.class === "cdc_host_name");
        gettingIP = (name === "td" && attribs.class === "cdc_ip_address");
        gettingMac = (name === "td" && attribs.class === "cdc_mac");

    },
    ontext: function(text){
        if(gettingHost){ 
            device.host = text;
            gettingHost = false;
        }
        if(gettingIP){
            device.ip = text;
            gettingIP = false;
        }
        if(gettingMac){
            device.mac = text;
            gettingMac = false;
            connectedDevices.push(device);
            device = {};
        }
    },
    onclosetag: function(tagname){
        //gettingHost != (tagname === "td");
    }
});

//local get connected devices functions
function getConnectedDevices(callback){
    request(dhost, function (error, response, body) {
    if (!error && response.statusCode == 200) {
        //Login to gateway router
        request.post(dhost + '/goform/home_loggedout', {form:{loginUsername:duser, loginPassword:dpassword}}, function (error, response, body){
            if(!error){
                //now get connected devices
                request(dhost + '/connected_devices_computers.asp', function (error, response, body){
                    //parse response
                    parser.write(body);
                    parser.end();
                    callback(null, connectedDevices);

                });    
            }
            else{
                callback(error, null);
            }
            
        });
    }
    else {
        callback(error, null);
    }
})

}
