require 'csv'

filepath = 'input.csv'

array = []

CSV.foreach(filepath) do |row|
  arr_with_str_num = []
  [row[0], row[1]].each { |e| arr_with_str_num << e.split('-') }

  arr = []
  arr_with_str_num.each { |e| arr << [e[0].to_i, e[1].to_i] }

  array << arr
end

array_with_all_nums = []
array.each do |e|
  to_push = []

  to_push << Array(e[0][0]..e[0][1])
  to_push << Array(e[1][0]..e[1][1])

  array_with_all_nums << to_push
end

count = 0

array_with_all_nums.each do |e|
  if (e[0] - e[1]).empty? || (e[1] - e[0]).empty?
    count += 1
  end
end

puts "In #{count} assignment pairs does one range fully contain the other."


count2 = 0

array_with_all_nums.each do |e|
  if !(e[0] & e[1]).empty?
    count2 += 1
  end
end

puts "The ranges overlap in #{count2} assignment pairs."
