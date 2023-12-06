# frozen_string_literal: true

def bubble_sort(array)
  copy = array
  l = array.length
  array.each_with_index do |_x, index1|
    array.each_with_index do |_y, index2|
      if index2 < l - index1 - 1 && copy[index2 + 1] < copy[index2]
        copy[index2], copy[index2 + 1] = copy[index2 + 1], copy[index2]
      end
    end
  end
  copy
end
pp bubble_sort([4, 3, 78, 2, 0, 2])
