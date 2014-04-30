/* main app for the GatewayAgent
   (c) Jason Croucher 2014
*/
var conf = require('./config');
var gatewayAPI = require('./gatewayAPI');

//Set gateway params based on configuration
gatewayAPI.setDriver(conf.Driver);
gatewayAPI.setUser(conf.User);
gatewayAPI.setPassword(conf.Password);
gatewayAPI.setHost(conf.Host);

//test connected devices
gatewayAPI.getConnectedDevices(function(error, results){
    console.log(error);
    console.log(results);
});
