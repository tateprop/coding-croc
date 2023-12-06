# frozen_string_literal: true

# this comment satisfies rubocop
module ToBeIncluded
  def output(out)
    puts out
  end
end

# the ToBeIncluded module is mixed in with the invldue mixin
class Human
  include ToBeIncluded
  attr_accessor :name

  # this auto makes getter and setter for @name
  # attr_reader/ attr_writer also available
  # attr takes symobols as args

  def initialize(name)
    @name = name
  end

  def greetings
    puts "Hello!! My name is #{name}"
  end

  def change_name(new_name)
    self.name = new_name
  end
  # def getter
  #   @name
  # end

  # def setter(new)
  #   @name = new
  # end
end

man = Human.new('John')
man.greetings
man.change_name('Paul')
man.greetings
