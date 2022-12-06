require "csv"
filepath = "input.csv"

CRATES = [
          %w[R P C D B G],
          %w[H V G],
          %w[N S Q D J P M],
          %w[P S L G D C N M],
          %w[J B N C P F L S],
          %w[Q B D Z V G T S],
          %w[B Z M H F T Q],
          %w[C M D B F],
          %w[F C Q G],
          ]

# instructions as an array of strings, e.g. "move 2 from 2 to 3"
instructions = []

CSV.foreach(filepath) do |row|
  instructions << row[0]
end

instructions.each do |instruction|
  moves = instruction.scan(/\d+/).map(&:to_i) # e.g. [2, 2, 3]
  number_of_moves = moves[0]
  from_index = moves[1] - 1
  to_index = moves[2] - 1
  crate_length = CRATES[from_index].length
  slice_from = (crate_length) - number_of_moves

  CRATES[to_index] << CRATES[from_index].slice(slice_from, number_of_moves)
  CRATES[to_index].flatten!

  CRATES[from_index].pop(number_of_moves)
end

puts "Top of the stack:"
puts "1. #{CRATES[0][-1]}"
puts "2. #{CRATES[1][-1]}"
puts "3. #{CRATES[2][-1]}"
puts "4. #{CRATES[3][-1]}"
puts "5. #{CRATES[4][-1]}"
puts "6. #{CRATES[5][-1]}"
puts "7. #{CRATES[6][-1]}"
puts "8. #{CRATES[7][-1]}"
puts "9. #{CRATES[8][-1]}"
