# frozen_string_literal: false

def substrings(string, dictionary)
  string.downcase!
  out = dictionary.collect do |word|
    count = string.scan(/#{word}/).length
    [word, count] if count.positive?
  end
  out.compact!
  Hash[out]
end
dictionary = %w[below down go going horn how howdy it i low own part partner sit]
pp substrings("Howdy partner, sit down! How's it going?", dictionary)
