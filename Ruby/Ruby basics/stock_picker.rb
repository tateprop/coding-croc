# frozen_string_literal: true

def stock_picker(prices)
  max_distance = 0
  big_boy = []
  prices.each_with_index do |price1, index1|
    prices.each_with_index do |price2, index2|
      if index2 > index1 && price2 - price1 > max_distance
        max_distance = price2 - price1
        big_boy = [index1, index2]
      end
    end end
  big_boy
end
pp stock_picker([17, 3, 6, 9, 15, 8, 6, 1, 10])
