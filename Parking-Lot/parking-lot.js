// Vehicle
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Vehicle = /** @class */ (function () {
    function Vehicle(spotSize) {
        this.spotSize = spotSize;
    }
    Vehicle.prototype.getSpotSize = function () {
        return this.spotSize;
    };
    return Vehicle;
}());
// Car, Limo, SemiTruck inherit from the base vehicle class
var Car = /** @class */ (function (_super) {
    __extends(Car, _super);
    function Car() {
        return _super.call(this, 1) || this;
    }
    return Car;
}(Vehicle));
var Limo = /** @class */ (function (_super) {
    __extends(Limo, _super);
    function Limo() {
        return _super.call(this, 2) || this;
    }
    return Limo;
}(Vehicle));
var SemiTruck = /** @class */ (function (_super) {
    __extends(SemiTruck, _super);
    function SemiTruck() {
        return _super.call(this, 3) || this;
    }
    return SemiTruck;
}(Vehicle));
// Driver Class
var Driver = /** @class */ (function () {
    function Driver(id, vehicle) {
        this.id = id;
        this.vehicle = vehicle;
    }
    Driver.prototype.getId = function () {
        return this.id;
    };
    Driver.prototype.getVehicle = function () {
        return this.vehicle;
    };
    Driver.prototype.charge = function (amount) {
        this.paymentDue += amount;
    };
    return Driver;
}());
// Parking Floor
var ParkingFloor = /** @class */ (function () {
    function ParkingFloor(spotCount) {
        for (var i = 0; i < spotCount; i++) {
            this.spots.push(i);
        }
    }
    ParkingFloor.prototype.getParkingSpots = function () {
        return this.spots;
    };
    ParkingFloor.prototype.getVehicleSpots = function () {
        return this.vehicleMap;
    };
    ParkingFloor.prototype.getVehicleSpot = function (vehicle) {
        return this.vehicleMap.get(vehicle);
    };
    ParkingFloor.prototype.parkVehicle = function (vehicle) {
        var size = vehicle.getSpotSize();
        var l = 0;
        var r = 0;
        while (r < this.spots.length) {
            if (this.spots[r] != 0) {
                l = r + 1;
            }
            if (r - l + 1 === size) {
                for (var k = l; k < r + 1; k++) {
                    this.spots[k] = 1;
                }
                this.vehicleMap.set(vehicle, [l, r]);
                return true;
            }
            r += 1;
        }
        return false;
    };
    ParkingFloor.prototype.removeVehicle = function (vehicle) {
        var occupiedSpot = this.vehicleMap.get(vehicle);
        var left;
        var right;
        if (occupiedSpot) {
            left = occupiedSpot[0];
            right = occupiedSpot[1];
        }
        else {
            return;
        }
        for (var i = left; i <= right; i++) {
            this.spots[i] = 0;
        }
        this.vehicleMap.delete(vehicle);
    };
    return ParkingFloor;
}());
// Parking Garage
var ParkingGarage = /** @class */ (function () {
    function ParkingGarage(floorCount, spotsPerFloor) {
        this.parkingFloors = [];
        for (var i = 0; i < floorCount; i++) {
            this.parkingFloors.push(new ParkingFloor(spotsPerFloor));
        }
    }
    ParkingGarage.prototype.parkVehicle = function (vehicle) {
        this.parkingFloors.forEach(function (parkingFloor) {
            if (parkingFloor.parkVehicle(vehicle)) {
                return true;
            }
        });
        return false;
    };
    ParkingGarage.prototype.removeVehicle = function (vehicle) {
        this.parkingFloors.forEach(function (parkingFloor) {
            if (parkingFloor.getVehicleSpot(vehicle)) {
                parkingFloor.removeVehicle(vehicle);
                return true;
            }
        });
        return false;
    };
    return ParkingGarage;
}());
// Parking System
var ParkingSystem = /** @class */ (function () {
    function ParkingSystem() {
    }
    return ParkingSystem;
}());
var dateTime = new Date().getHours();
console.log(dateTime);
