import time
class OverSpeedError(Exception):
        pass

class Car(OverSpeedError):
    def __init__(self,make ,model, fuel_level, speed): 
        self.make = make
        self.model = model
        self.fuel_level = fuel_level
        self.speed = speed

    def start_engine(self):
        try:
            if self.make == "Unknown":
                raise ValueError("Unknown car engine")
            else:
                print("Vrooooooooooom!!!!!!")
        except ValueError as e:
            print(e)

    def check_fuel(self):
        if self.fuel < 5:
            raise ValueError("Low fuel")
        else:
            print(f"Fuel level: {self.fuel}")
    def drive(self, consumption):
        self.fuel -= consumption
        self.fuel_level()
    
    def acceleration(self):
        try:
            if self.speed > 120:
                raise OverSpeedError ("Dangerous it's too Fast")
        except OverSpeedError as e:
            print(e)
        else:
            print(f"Speed: {self.speed}")
    
    @staticmethod
    def read_color_from_file(file_path):
        try:
            with open(file_path, 'r') as file:
                content = file.read().strip()
                print(content)
        except FileNotFoundError:
            print(f"Error: The file at {file_path} was not found.")
        except ValueError as ve:
            print(ve)
        except Exception as e:
            print(f"An unexpected error occurred: {e}")
    def diagnostics(self):
        while self.fuel_level > 4:
            print(f"Speed: {self.speed}  Fuel: {self.fuel_level}")
            time.sleep(1)
       
my_car = Car("Toyota", "Corolla", 8, 120)
my_car.acceleration()
Car.read_color_from_file('D:/assignweek6/assign6.py/color.txt')
Car.read_color_from_file('bamboo.txt')
my_car.diagnostics()