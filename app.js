var conf = require('./config');
var gatewayAPI = require('./gatewayAPI');
gatewayAPI.setDriver(conf.Driver);
gatewayAPI.setUser(conf.User);
gatewayAPI.setPassword(conf.Password);

gatewayAPI.getConnectedDevices(function(error, results){
    console.log(error);
    console.log(results);
});
