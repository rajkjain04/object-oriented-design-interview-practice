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
