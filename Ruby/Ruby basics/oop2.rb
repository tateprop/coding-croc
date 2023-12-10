# frozen_string_literal: true

# Human class
class Human
  attr_accessor :race

  def initialize(race)
    @race = race
  end

  def speak
    'Hello!'
  end
end

# Man class
class Man < Human
  attr_accessor :name

  def initialize(race, name)
    super(race)
    @name = name
  end

  def speak
    "#{super} I am a man"
    # super refers to parent class it looks through class to find func with same name
  end
end

john = Man.new('White', 'John')
puts john.speak
puts john.race
puts john.name
