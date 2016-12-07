var noble = require('noble');
var Peripheral;
var sender;

function Ble() {
    noble.on('scanStart', function () {
        console.log(arguments);
    });
    noble.on('scanStop', function () {
        console.log(arguments);
    });
    noble.on('discover', function(peripheral) {
        Peripheral = peripheral;
        // console.log(peripheral);
        // console.log(peripheral.advertisement.localName);
        if(peripheral.advertisement && peripheral.advertisement.localName && peripheral.advertisement.localName.indexOf('KocoaFab_BLE') >= 0) {
            peripheral.connect(function (e) {
                if(!e) {
                    peripheral.discoverAllServicesAndCharacteristics(function (e, s, c) {
                        // var i = 0;
                        // var max = c.length;
                        // console.log(c.length);
                        // sender = setInterval(function() {
                        //     var buffer = Buffer.from('F');
                        //     console.log(c[i]);
                        //     c[i].write(buffer, false, function (e) {
                        //         console.log(e);
                        //     });
                        //     i++;
                        //     if(i >= max) {
                        //         i = 0;
                        //     }
                        // }, 5000);
                        var Characteristic = c.find(function (c) {
                            return c.properties && c.properties.indexOf('writeWithoutResponse') >= 0;
                        });
                        console.log(Characteristic);
                        sender = setInterval(function() {
                            var buffer = Buffer.from('F');
                            Characteristic.write(buffer, false, function (e) {
                                console.log(e);
                            });
                        }, 1000);
                    });
                }
            });
        }
    });
}

Ble.prototype.startScan = function() {
    var a = noble.startScanning([], false, function () {
        console.log(arguments);
    });
}


Ble.prototype.stopScan = function() {
    if(sender) {
        clearInterval(sender);
    }
    if(Peripheral) {
        Peripheral.disconnect();
    }
    noble.stopScanning();
}


module.exports = new Ble();
