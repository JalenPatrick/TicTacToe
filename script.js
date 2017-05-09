/*Tic-Tac-Toe in jQuery and Javascript*/

$(document).ready(function(){

    //initial variables for tic-tac-toe game
    var playerTurn = 1
    var moveCount = 0
    var gameOver = false
    var xPoints = 0
    var oPoints = 0

    // 0 = O, 1 = X
    var table = $(".table")   //variable for click on table

    //variables for the top row of the board
    var topLeft = $("#T1")
    var topMiddle = $("#T2")
    var topRight = $("#T3")

    //variables for the middle row of the board
    var centerLeft = $("#C1")
    var centerMiddle = $("#C2")
    var centerRight = $("#C3")

    //variables for the bottom row of the board
    var bottomLeft = $("#B1")
    var bottomMiddle = $("#B2")
    var bottomRight = $("#B3")

    var currentPlayer = $(".currentPlayer")

    var gameMessage = $(".gameResult")

    var xScore = $("#xPoints")
    var oScore = $("#oPoints")

    //game always begins with player X
    xTurn()
    gameMessage.html("Game In Progress...")
    xScore.html(xPoints)
    oScore.html(oPoints)

    //function which adds X or O to a cell based on click action
    $(".cell").click(function() {
      cell = $(this)

      var occupied = cellOccupied(cell)
      if (occupied == true) {
        //cell is occupied nothing happens
      } else {
        //increase the total number of combined moves made
        moveCount = moveCount + 1

        //X player's turn to make a move (playerTurn = 1)
        if (playerTurn == 1) {
          oTurn()
          cell.addClass("X")
          playerTurn = 0
          var victoryX = checkVictory("X")
          if (victoryX == true) {
            changeMessage("Victory for X!")
            xPoints = xPoints + 1
            winner()
          }
          //game has ended in a draw
          else if (moveCount == 9) {
            changeMessage("Tie game!")
            draw()
          }
        }
      //O player's turn to make a move (playerTurn = 0)
      else if (playerTurn == 0) {
          xTurn()
          cell.addClass("O")
          playerTurn = 1
          var victoryO = checkVictory("O")
          if (victoryO == true) {
            changeMessage("Victory for O!")
            oPoints = oPoints + 1
            winner()
          }
        }
      }
    }); //cell click function


    //function which initiates game reset on click of "newGame" div
    $(".newGame").click(function() {
      changeMessage("Game In Progress...")
      resetGame()
    }); //newGame click function


    //function which initiates score reset on click of "resetScore" div
    $(".resetScore").click(function() {
      resetScore()
    });

    /*function to check if a cell is occupied
     *a cell is considered occupied if it has an X or O currently in it
     *also prevents the game from continuing once a player has won*/
    function cellOccupied(cell) {
      if (cell.hasClass("X") || cell.hasClass("O") || gameOver == true || moveCount == 9) {
        return true
      } else {
        return false
      }
    }

    //function to check for one of the 8 possible winning combinations on the board//
    function checkVictory(player) {
      //top row victory
      if ((topLeft.hasClass(player)) && (topMiddle.hasClass(player)) && (topRight.hasClass(player))) {
        highlightWin(topLeft, topMiddle, topRight)
        return true
       }
      //middle row victory
      else if ((centerLeft.hasClass(player)) && (centerMiddle.hasClass(player)) && (centerRight.hasClass(player))) {
        highlightWin(centerLeft, centerMiddle, centerRight)
        return true
      }
      // bottom row victory
      else if ((bottomLeft.hasClass(player)) && (bottomMiddle.hasClass(player)) && (bottomRight.hasClass(player))) {
        highlightWin(bottomLeft, bottomMiddle, bottomRight)
        return true
      }
      //left column victory
      else if ((topLeft.hasClass(player)) && (centerLeft.hasClass(player)) && (bottomLeft.hasClass(player))) {
        highlightWin(topLeft, centerLeft, bottomLeft)
        return true
      }
      //middle column victory
      else if ((topMiddle.hasClass(player)) && (centerMiddle.hasClass(player)) && (bottomMiddle.hasClass(player))) {
        highlightWin(topMiddle, centerMiddle, bottomMiddle)
        return true
      }
      //right column victory
      else if ((topRight.hasClass(player)) && (centerRight.hasClass(player)) && (bottomRight.hasClass(player))) {
        highlightWin(topRight, centerRight, bottomRight)
        return true
      }
      //diagonal from top left victory
      else if ((topLeft.hasClass(player)) && (centerMiddle.hasClass(player)) && (bottomRight.hasClass(player))) {
        highlightWin(topLeft, centerMiddle, bottomRight)
        return true
      }
      //diagonal from top right victory
      else if ((topRight.hasClass(player)) && (centerMiddle.hasClass(player)) && (bottomLeft.hasClass(player))) {
        highlightWin(topRight,centerMiddle, bottomLeft)
        return true
      }
      else {
        return false
      }
    }

    //function to change on screen messages for player X
    function xTurn() {
      currentPlayer.html("X's Turn To Play!")
      currentPlayer.removeClass("blueText")
      currentPlayer.addClass("redText")
    }

    //function to change on screen messages for player O
    function oTurn() {
      currentPlayer.html("O's Turn To Play!")
      currentPlayer.removeClass("redText")
      currentPlayer.addClass("blueText")
    }

    //function to change on screen messages upon a winner
    function winner() {
      currentPlayer.removeClass("redText").removeClass("blueText")
      currentPlayer.html("Winner!")
      xScore.html(xPoints)
      oScore.html(oPoints)
      gameOver = true;
    }

    //function to change on screen messages upon a tie
    function draw() {
      currentPlayer.removeClass("redText").removeClass("blueText")
      currentPlayer.html("Game over!")
      gameOver = true;
    }

    //function to highlight the winning squares on the board
    function highlightWin(square1, square2, square3) {
      square1.addClass("winColor")
      square2.addClass("winColor")
      square3.addClass("winColor")
    }

    //function that changes the message at the bottom of the screen
    function changeMessage(text) {
        //update the message
        gameMessage.html(text)
    }

    //function to completely reset the game
    function resetGame(){
      //clear all of the cells in the board
      topLeft.removeClass("X").removeClass("O").removeClass("winColor")
      topMiddle.removeClass("X").removeClass("O").removeClass("winColor")
      topRight.removeClass("X").removeClass("O").removeClass("winColor")
      centerLeft.removeClass("X").removeClass("O").removeClass("winColor")
      centerMiddle.removeClass("X").removeClass("O").removeClass("winColor")
      centerRight.removeClass("X").removeClass("O").removeClass("winColor")
      bottomLeft.removeClass("X").removeClass("O").removeClass("winColor")
      bottomMiddle.removeClass("X").removeClass("O").removeClass("winColor")
      bottomRight.removeClass("X").removeClass("O").removeClass("winColor")

      //reset the gameplay variables
      playerTurn = 1
      moveCount = 0
      gameOver = false;

      //clear the win/draw notifications
      xTurn()
    }

    //function to reset the scores
    function resetScore() {
      xPoints = 0
      oPoints = 0
      xScore.html(xPoints)
      oScore.html(oPoints)
    }


}); //doccument ready
