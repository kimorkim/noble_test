const bluetooth = require('node-bluetooth');
var Peripheral;
var sender;

function Ble() {
    const device = new bluetooth.DeviceINQ();
}

Ble.prototype.startScan = function() {
  device.listPairedDevices(console.log);
}


Ble.prototype.stopScan = function() {
   
}


module.exports = new Ble();
