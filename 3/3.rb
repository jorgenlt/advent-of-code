require "csv"

priority = {
  a: 1,
  b: 2,
  c: 3,
  d: 4,
  e: 5,
  f: 6,
  g: 7,
  h: 8,
  i: 9,
  j: 10,
  k: 11,
  l: 12,
  m: 13,
  n: 14,
  o: 15,
  p: 16,
  q: 17,
  r: 18,
  s: 19,
  t: 20,
  u: 21,
  v: 22,
  w: 23,
  x: 24,
  y: 25,
  z: 26,
  A: 27,
  B: 28,
  C: 29,
  D: 30,
  E: 31,
  F: 32,
  G: 33,
  H: 34,
  I: 35,
  J: 36,
  K: 37,
  L: 38,
  M: 39,
  N: 40,
  O: 41,
  P: 42,
  Q: 43,
  R: 44,
  S: 45,
  T: 46,
  U: 47,
  V: 48,
  W: 49,
  X: 50,
  Y: 51,
  Z: 52
}

filepath = "./input3.csv"

all_common = []

CSV.foreach(filepath) do |row|
  array = row[0].split('')
  half = array.length / 2
  compartment1 = array.slice(0, half)
  compartment2 = array.slice(half, array.length - 1)
  common = compartment1 & compartment2
  all_common << common.join
end

sum_of_all_common = 0

all_common.each do |element|
  sum_of_all_common += priority[element.to_sym]
end

puts "The sum of the priorities of all common items is #{sum_of_all_common}."

array = []

CSV.foreach(filepath) do |row|
  array << [row[0]]
end

common_between_the_groups = []

i = 0
while i < array.length
  common1 = array[i].join.split('') & array[i+1].join.split('')
  common2 = common1 & array[i+2].join.split('')
  common_between_the_groups << common2
  i += 3
end


sum_of_all_common_between_the_groups = 0

common_between_the_groups.each do |element|
  sum_of_all_common_between_the_groups += priority[element[0].to_sym]
end

puts "Sum of the priorities in the groups are #{sum_of_all_common_between_the_groups}"
