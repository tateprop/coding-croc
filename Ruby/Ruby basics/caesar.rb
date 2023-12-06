# frozen_string_literal: true

def shiftChar(char, shift)
  letters = ('a'..'z').to_a
  if letters.include? char.downcase
    upper = (char == char.upcase)
    index = letters.find_index(char.downcase)
    new_index = (index + shift) % 26
    new_char = upper ? letters[new_index].upcase : letters[new_index]
    return new_char
  end
  char
end

def caesar_cipher(string, shift)
  string.split('').collect { |char| shiftChar(char, shift) }.join
end
puts caesar_cipher('What a string!', 5)
