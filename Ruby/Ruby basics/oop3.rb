class Vehicle
  @@INSTANCES = 0
  def initialize
    @@INSTANCES += 1
  end
  def print_instances
    puts @@INSTANCES
  end
  def self.gas_mileage(gallons, miles)
    puts "#{miles / gallons} miles per gallon of gas"
  end
end

class MyCar < Vehicle
  NUMBER_OF_DOORS = 4
end

class MyTruck < Vehicle
  NUMBER_OF_DOORS = 2
end
