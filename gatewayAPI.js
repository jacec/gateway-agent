var driver;

module.exports.setDriver = function(driverName){
	driver = require(driverName);
};

module.exports.setUser = function(user){
	driver.setUser(user);
};

module.exports.setPassword = function(password){
	driver.setPassword(password);
};

module.exports.getConnectedDevices = function(callback){
	driver.getConnectedDevices(callback);
};