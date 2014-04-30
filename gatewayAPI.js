/* GatewayAPI defines the methods all drivers must support
   (c) Jason Croucher 2014
*/

var driver;

/* set the driver for the wifi gateway router */
module.exports.setDriver = function(driverName){
	driver = require(driverName);
};

/* set the user for the wifi gateway router */
module.exports.setUser = function(user){
	driver.setUser(user);
};

/* set the password for the wifi gateway router */
module.exports.setPassword = function(password){
	driver.setPassword(password);
};

/* set the host for the wifi gateway router */
module.exports.setHost = function(host){
	driver.setHost(host);
};

/* Get a list of connected devices from the wifi gateway router */
module.exports.getConnectedDevices = function(callback){
	driver.getConnectedDevices(callback);
};