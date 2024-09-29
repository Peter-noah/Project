class Car:
    def __init__(self, make, model):
        self.make = make
        self.model = model
my_car = Car("Toyota","Corolla") 
print(f"my car: {my_car.make}\nModel: {my_car.model}")