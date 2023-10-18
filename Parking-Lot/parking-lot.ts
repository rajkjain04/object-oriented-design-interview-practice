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
    this.paymentDue = 0;
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
    this.spots = [];
    this.spotCount = spotCount;
    this.vehicleMap = new Map<Vehicle, [number, number]>();
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

  getVehicleSpot(vehicle: Vehicle): [number, number] | undefined {
    return this.vehicleMap.get(vehicle);
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

  removeVehicle(vehicle: Vehicle): void {
    let occupiedSpot: [number, number] | undefined =
      this.vehicleMap.get(vehicle);

    let left: number;
    let right: number;
    if (occupiedSpot) {
      left = occupiedSpot[0];
      right = occupiedSpot[1];
    } else {
      return;
    }

    for (let i = left; i <= right; i++) {
      this.spots[i] = 0;
    }

    this.vehicleMap.delete(vehicle);
  }
}

// Parking Garage

class ParkingGarage {
  floorCount: number;
  spotsPerFloor: number;
  parkingFloors: ParkingFloor[];

  constructor(floorCount: number, spotsPerFloor: number) {
    this.floorCount = floorCount;
    this.spotsPerFloor = spotsPerFloor;
    this.parkingFloors = [];

    for (let i = 0; i < floorCount; i++) {
      this.parkingFloors.push(new ParkingFloor(spotsPerFloor));
    }
  }

  parkVehicle(vehicle: Vehicle): boolean {
    this.parkingFloors.forEach((parkingFloor: ParkingFloor) => {
      if (parkingFloor.parkVehicle(vehicle)) {
        return true;
      }
    });

    return false;
  }

  removeVehicle(vehicle: Vehicle): boolean {
    this.parkingFloors.forEach((parkingFloor: ParkingFloor) => {
      if (parkingFloor.getVehicleSpot(vehicle)) {
        parkingFloor.removeVehicle(vehicle);
        return true;
      }
    });
    return false;
  }
}

// Parking System
class ParkingSystem {
  parkingGarage: ParkingGarage;
  hourlyRate: number;
  timeParked: Map<number, number>;

  constructor(parkingGarage: ParkingGarage, hourlyRate: number) {
    this.parkingGarage = parkingGarage;
    this.hourlyRate = hourlyRate;
    this.timeParked = new Map<number, number>();
  }

  parkVehicle(driver: Driver): boolean {
    let currentHour = new Date().getHours();
    let isParked = this.parkingGarage.parkVehicle(driver.getVehicle());

    if (isParked) {
      this.timeParked.set(driver.getId(), currentHour);
    }

    return isParked;
  }

  removeVehicle(driver: Driver): boolean {
    if (!this.timeParked.has(driver.getId())) {
      return false;
    }

    let originalHour = this.timeParked.get(driver.getId());
    let currentHour = new Date().getHours();
    let totalHoursParked: number;

    if (originalHour) {
      totalHoursParked = currentHour - originalHour;
    } else {
      totalHoursParked = 0;
    }

    driver.charge(totalHoursParked * this.hourlyRate);

    this.timeParked.delete(driver.getId());

    return this.parkingGarage.removeVehicle(driver.getVehicle());
  }
}
