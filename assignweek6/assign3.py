class Car:
    def __init__(self, make, model):
        self.make = make
        self.model = model
    def start_engine(self):
        try:
            if self.make == "Unknown":
                raise ValueError("Unknown car")
        except ValueError as e:
            print(e)
        
my_car = Car("Unknown","Unknown")
print(f"my car: {my_car.make}\nModel: {my_car.model}")
my_car.start_engine()
