require "csv"

filepath = "./input2.csv"

input = []

CSV.foreach(filepath) do |row|
  # Here, row is an array of columns
  input << [row[0][0], row[0][2]]
end

# A = rock, 1p
# B = paper, 2p
# C = scissor, 3p

# X = rock
# Y = paper
# Z = scissor

# The winner of the whole tournament is the player with the
# highest score. Your total score is the sum of your scores
# for each round. The score for a single round is the score
# for the shape you selected (1 for Rock, 2 for Paper,
# and 3 for Scissors) plus the score for the outcome of
# the round (0 if you lost, 3 if the round was a draw,
# and 6 if you won).

# calculate the score based on input

# scoring:
points = {
  A: 1,
  B: 2,
  C: 3,
  X: 1,
  Y: 2,
  Z: 3
}

#total score
total = 0

input.each do |match|
  # points for type of choice
  total += points[match[1].to_sym]

  # points for outcome of the match
  if points[match[0].to_sym] == points[match[1].to_sym]
    total += 3
  elsif match[0] == 'A' && match[1] == 'Y'
    total += 6
  elsif match[0] == 'B' && match[1] == 'Z'
    total += 6
  elsif match[0] == 'C' && match[1] == 'X'
    total += 6
  end

end

pp "Total score is #{total}."

# "Anyway, the second column says how the round needs to end:
# X means you need to lose,
# Y means you need to end the round in a draw, and
# Z means you need to win. Good luck!"

#total score
total_2 = 0

#lose method
def lose(opponents_choice)
  if opponents_choice == 'A'
    3
  elsif opponents_choice == 'B'
    1
  elsif opponents_choice == 'C'
    2
  end
end

# win method
def win(opponents_choice)
  if opponents_choice == 'A'
    2
  elsif opponents_choice == 'B'
    3
  elsif opponents_choice == 'C'
    1
  end
end

input.each do |match|
  # points for type of choice
  # total += points[match[1].to_sym]

  if match[1] == 'Y'
    total_2 += 3 + points[match[0].to_sym]
  elsif match[1] == 'X'
    total_2 += lose(match[0])
  elsif match[1] == 'Z'
    total_2 += 6 + win(match[0])
  end
end

pp "Total score for round 2 is #{total_2}."
