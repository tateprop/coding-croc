require 'colorize'
START_MSG = "Welcome to the game"
$turn_msg = "Player ~ please type the place you can to go: "
PIECES = ["X", "O"]
$board_template = %q(
  1 | 2 | 3
  --------
  4 | 5 | 6
  --------
  7 | 8 | 9
)

class Square
  attr_accessor :index, :piece
  def initialize(index)
    @index = index
    @piece = nil
  end
end

class Game
  def initialize
    @grid = []
    @turn = 0
    @play = true
  end

  def start_game
    puts START_MSG
    initialize_board
    while @play
      @turn = @turn>0 ? 0 : 1
      puts @turn
      displayBoard()
      puts $turn_msg
      index = gets.chomp
      @grid[index.to_i - 1].piece = @turn
    end
  end

  def displayBoard
    board = $board_template.clone
    i = 1
    for elem in @grid
      unless elem.piece.nil?
        board.sub!(i.to_s, PIECES[elem.piece])
      end
      i += 1
    end
    puts board
  end


  def initialize_board
    for x in (0..8)
      elem = Square.new(x)
      @grid.push(elem)
    end
  end
end
game = Game.new
game.start_game
