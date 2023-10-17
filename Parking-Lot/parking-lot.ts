// Vehicle

class Vehicle {
  spotSize: number;

  constructor(spotSize: number) {
    this.spotSize = spotSize;
  }

  getSpotSize(): number {
    return this.spotSize;
  }
}

// Car, Limo, SemiTruck inherit from the base vehicle class

class Car extends Vehicle {
  constructor() {
    super(1);
  }
}

class Limo extends Vehicle {
  constructor() {
    super(2);
  }
}

class SemiTruck extends Vehicle {
  constructor() {
    super(3);
  }
}

// Driver Class
class Driver {
  id: number;
  vehicle: Vehicle;
  paymentDue: number;

  constructor(id: number, vehicle: Vehicle) {
    this.id = id;
    this.vehicle = vehicle;
  }

  getId(): number {
    return this.id;
  }

  getVehicle(): Vehicle {
    return this.vehicle;
  }

  charge(amount: number) {
    this.paymentDue += amount;
  }
}

// Parking Floor

class ParkingFloor {
  spots: number[];
  spotCount: number;
  vehicleMap: Map<Vehicle, [number, number]>;

  constructor(spotCount: number) {
    for (let i = 0; i < spotCount; i++) {
      this.spots.push(i);
    }
  }

  getParkingSpots(): number[] {
    return this.spots;
  }

  getVehicleSpots(): Map<Vehicle, [number, number]> {
    return this.vehicleMap;
  }

  parkVehicle(vehicle: Vehicle): boolean {
    let size = vehicle.getSpotSize();
    let l = 0;
    let r = 0;

    while (r < this.spots.length) {
      if (this.spots[r] != 0) {
        l = r + 1;
      }

      if (r - l + 1 === size) {
        for (let k = l; k < r + 1; k++) {
          this.spots[k] = 1;
        }
        this.vehicleMap.set(vehicle, [l, r]);
        return true;
      }
      r += 1;
    }

    return false;
  }

  removeVehicle(vehicle: Vehicle): void {}
}
