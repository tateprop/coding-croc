require 'colorized_string'

a = ColorizedString["This is light blue with red background"].colorize(:color => :light_blue, :background => :red)
COLORS = ["magenta", "yellow", "cyan", "light_red", "blue", "green"]

class Game
  def generate_code
    return Array.new(4) {rand(1..6).to_s}
  end

  def get_guess(turn)
    print "Turn ##{turn+1}: Type in four numbers (1-6): "
    loop do
      guess = gets.chomp.chars
      ok = (guess.length == 4) ? true : false
      guess.each do |value|
        unless value.to_i > 0 && value.to_i < 7
          ok = false
        end
      end
      if ok
        return guess
      else
        print "Invalid guess. Try again: "
      end
    end
  end

  def display_board(guess, code)
    output = ["\n"]

    guess.each do |value|
      colored = ColorizedString["  #{value}  "].colorize(:background => COLORS[value.to_i-1].to_sym)
      output.push(colored)
    end

    output.push(" Clues: ")
    code_copy = code.dup
    clues = []
    pp code
    code.each_with_index do |value, index|
      if value == guess[index]
        clues.push("•")
      elsif code_copy.include?(guess[index])
        clues.push("○")
        code_copy.delete_at(1)
      end
    end
    clues.sort!
    output += clues
    output.push("\n\n")
    puts output.join(" ")
  end

  def start
    code = generate_code
    12.times do |turn|
      guess = get_guess(turn)
      if guess == code
        display_board(guess, code)
        puts "Well done. You win!"
        return
      end
      display_board(guess, code)
    end
    puts "\nLooks like you failed"
  end
end
Game.new.start
