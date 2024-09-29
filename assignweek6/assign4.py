import time
class Car:
    def __init__(self, make, model,fuel_level):
        self.make = make
        self.model = model
        self.fuel_level = fuel_level
    def start_engine(self):
        try:
            if self.make == "Unknown":
                raise ValueError("Unknown car")
        except ValueError as e:
            print(e)
    def check_fuel(self):
        if self.fuel_level < 5:
            raise ValueError("Low fuel")
        else:
            print(f"Fuel level: {self.fuel_level}")
    def drive(self,consumption):
        self.fuel_level-=consumption
        self.check_fuel()
        
my_car = Car("Unknown","Unknown",15)
print(f"my car: {my_car.make}\nModel: {my_car.model}")
my_car.start_engine()
my_car.check_fuel()
try:
    my_car.drive(3)
    my_car.drive(3)
    my_car.drive(5)  
except ValueError as e:
    print(e)

