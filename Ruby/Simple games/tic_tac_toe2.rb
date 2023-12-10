require 'colorize'
PIECES = ["X".red, "O".blue]

class Game
  def get_move(board, turn)
    place =  (turn==0) ? "First" : "Second"
    print "#{place} player's move: "
    loop do
      index = gets.chomp
      if board[index.to_i-1] == nil && index.to_i > 0 && index.to_i < 10
        board[index.to_i-1] = PIECES[turn]
        return index
      else
        print "Enter a valid selection: "
      end
    end
  end

  def display_board(board, board_template, index)
    if index
      board_template.sub!(" #{index}", " #{board[index.to_i - 1]}")
    end
    puts board_template
  end

  def player_won?(board)
    rows = board.each_slice(3).to_a
    columns = []
    (0...3).each do |index|
      columns.push([board[index], board[3 + index], board[6 + index]])
    end
    diagonal = [[board[0], board[4], board[8]], [board[2], board[4], board[6]]]
    total = rows + columns + diagonal
    win_list = total.select {|item| item.uniq.length == 1 && item[0]}
    return (win_list.length > 0) ? true : false
  end

  def start
    board = Array.new(9) {nil}
    board_template = %q(
      1 | 2 | 3
      ---------
      4 | 5 | 6
      ---------
      7 | 8 | 9
    )
    turn = 0
    index = false
    9.times do
      display_board(board, board_template, index)
      index = get_move(board, turn)
      if player_won?(board)
        display_board(board, board_template, index)
        puts "Game over #{PIECES[turn]} won!"
        return
      end
      turn = (turn==0) ? 1 : 0
    end
    puts "It's a draw"
  end
end
Game.new.start
