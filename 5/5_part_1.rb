require 'csv'

filepath = 'input.csv'

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
  from = moves[1]
  to = moves[2]

  number_of_moves.times do
    CRATES[to - 1] << CRATES[from - 1].last
    CRATES[from - 1].delete_at(-1)
  end
end

puts 'Top of the stack:'
puts "1. #{CRATES[0][-1]}"
puts "2. #{CRATES[1][-1]}"
puts "3. #{CRATES[2][-1]}"
puts "4. #{CRATES[3][-1]}"
puts "5. #{CRATES[4][-1]}"
puts "6. #{CRATES[5][-1]}"
puts "7. #{CRATES[6][-1]}"
puts "8. #{CRATES[7][-1]}"
puts "9. #{CRATES[8][-1]}"
