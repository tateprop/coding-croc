require "colorize"
PIECE = ["X".red, "O".blue]

class Game

  def get_move(turn, board)
    player = turn==0 ? "First" : "Second"
    print  "\n#{player} please make yout move: "
    loop do
      index = gets.chomp.to_i
      if index > 0 && index < 10 && !board[index-1]
        board[index-1] = PIECE[turn]
        return
      else
        print "Invalid move. Try again: "
      end
    end
  end

  def display_board(board)
     line_split = "---------"
     puts "\n"
     5.times do |row_number|
       if row_number % 2 == 0
         row = Array.new(5) {" | "}
         row_index = 0
         3.times do |loop_count|
          board_index = (row_number/2).truncate() * 3 + loop_count
          board_value = board[board_index]
          row[row_index] = board_value ? board_value : board_index + 1
          row_index += 2
         end
         puts row.join()
       else
        puts line_split
       end
     end
  end

  def game_win?(board)
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
    turn = 0
    9.times do
      display_board(board)
      get_move(turn, board)
      if game_win?(board)
        display_board(board)
        puts "Game over. #{PIECE[turn]} wins!"
        return
      end
      turn = (turn == 0) ? 1 : 0
    end
    display_board(board)
    puts "It's a draw!"
  end
end

Game.new.start
