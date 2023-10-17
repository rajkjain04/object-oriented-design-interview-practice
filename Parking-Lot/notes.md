# Design a Parking Lot

## Background

Parking lots have open spaces for vehicles to park in. Vehicles can be of different sizes, e.g. cars, limos, trucks etc.

In some cases, parking spots can be numbered and/or may have multiple levels.

Parking can be either free or paid. So parking lots can have a payment system and some cars can be charged differently.

## Clarify the requirements

1. Will there be multiple levels?

2. What kinds of vehicles will be parked and will their sizes differ?

3. Will there be special spots for certain vehicles?

4. Will the parking lot have a payment system? If so, how will it work?

5. Will parking spots be reserved or can driver choose any spot? Does the payment system assign a spot to the driver?

6. How much functionality will the driver have beyond parking and paying?

7. Do we have to implement a driver class or does the vehicle belong to the driver? How does that work?

## Answers

### Basics

1. Multiple levels in the parking lot

2. Possible vehicle types: car, limo, truck

3. We will have a payment system, with a single entrance and exit

4. Drivers are assigned a spot after paying

### Vehicles and Parking Spots

1. Vehicles can be of different sizes (car = 1, limo = 2, truck = 3)

2. A car will take up 1 spot, limo 2 and truck 3. The vehicles will take up consecutive parking spots.

3. Each parking spot will have a size of 1.
   i. A vehicle must fully take up each spot assigned to it

4. Vehicles are automatically assigned the next available parking spot on the same floor

### Payment System

1. Drivers will pay for parking and be assigned the next available spot on the lowest floor

2. Drivers pay for a variable number of hours and pay when they remove their vehicle.

3. If there is no capacity, the system should not assign a spot and should notify the driver

## Design

1. Base Vehicle class and Car, Limo and Truck classes will inherit from it.

2. Each of these will have a predefined size.

3. A Driver class will have a vehicle that belongs to it, and a total payment due.

4. We will have a ParkingGarage which will be made up of multiple ParkingFloors

5. A ParkingFloor will be made up of multiple Parking Spots which can be represented by an array (0=empty, 1=occupied)

6. The ParkingSystem will be the main controller of the ParkingGarage, which contains multiple ParkingFloors. This system will be responsible for tracking parking hours and charging drivers.

## Code

### Vehicle

A vehicle class will be the base class for all vehicles and it will have a size attribute which will be used to determine how many spots it can take up.

Cars, Limos and SemiTrucks will inherit from the Vehicle class and each will have a predefined size.

### Driver

A Driver class will have a vehicle that belongs to it and a total payment due. It will also have a method to charge the driver for Parking

### Parking Floor

A ParkingFloor class will be the container for parking spots which will be represented by the array. It will also keep a track of which vehicles are parked in which spots where [l, r] represents the range of spots occupied by the vehicle

It will park the car and remove the car and keep a track of where the car is parked.

### Parking Garage

The parking garage will contain parking floors. Parking Garage will have park vehicle and remove vehicle methods

### Parking System

The Parking System is the main controller of the Parking Garage. It will be responsible for tracking parking hours and changing drivers.
