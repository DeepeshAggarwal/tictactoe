#!/bin/python
import random
import copy
CHOICE = ()
def gameOver(player, board, depth):
    if board[0][0] == board[1][0] and board[1][0] == board[2][0] and board[0][0] != '_':
        if board[0][0] == player:
            return 10-depth
        else:
            return depth-10
    elif board[0][1] == board[1][1] and board[1][1] == board[2][1] and board[0][1] != '_':
        if board[0][1] == player:
            return 10-depth
        else:
            return depth-10
    elif board[0][2] == board[1][2] and board[1][2] == board[2][2] and board[0][2] != '_':
        if board[0][2] == player:
            return 10-depth
        else:
            return depth-10
    elif board[0][0] == board[0][1] and board[0][1] == board[0][2] and board[0][0] != '_':
        if board[0][0] == player:
            return 10-depth
        else:
            return depth-10
    elif board[1][0] == board[1][1] and board[1][1] == board[1][2] and board[1][0] != '_':
        if board[1][0] == player:
            return 10-depth
        else:
            return depth-10
    elif board[2][0] == board[2][1] and board[2][1] == board[2][2] and board[2][0] != '_':
        if board[2][0] == player:
            return 10-depth
        else:
            return depth-10
    elif board[0][0] == board[1][1] and board[1][1] == board[2][2] and board[0][0] != '_':
        if board[0][0] == player:
            return 10-depth
        else:
            return depth-10
    elif board[0][2] == board[1][1] and board[1][1] == board[2][0] and board[0][2] != '_':
        if board[2][0] == player:
            return 10-depth
        else:
            return depth-10
    else:
        for i in range(3):
            for j in range(3):
                if board[i][j] == '_':
                    return None
        return 0
    
def nextMoveHelper(player, board, depth, row, column, isPlayerTurn):
    global CHOICE
    #print row, column
    scores = []
    moves = []
    if row >= 0 and column >= 0:
        board[row][column] = player
        if not isPlayerTurn and player == 'X':
            board[row][column] = 'O'
        elif not isPlayerTurn and player == 'O':
            board[row][column] = 'X'
    #print depth, board
    score = gameOver(player, board, depth)
    if score != None:
        #print score
        return score            
    for i in range(3):
        for j in range(3):
            if board[i][j] == '_':
                scores.append(nextMoveHelper(player, copy.deepcopy(board), depth + 1, i, j, not isPlayerTurn))
                moves.append((i, j))

    #print scores, moves
    if not isPlayerTurn:
        max_score = max(scores)
        max_index = scores.index(max_score)
        CHOICE = moves[max_index]
        #print "choice", CHOICE
        return max_score
    else:
        min_score = min(scores)
        min_index = scores.index(min_score)
        CHOICE = moves[min_index]
        #print "choice", CHOICE
        return min_score
    

# Complete the function below to print 2 integers separated by a single space which will be your next move 
def nextMove(player,board):
    nextMoveHelper(player, board, 0, -1, -1, False)
    print CHOICE[0], CHOICE[1]
    

#If player is X, I'm the first player.
#If player is O, I'm the second player.
player = raw_input()

#Read the board now. The board is a 3x3 array filled with X, O or _.
board = []
for i in xrange(0, 3):
    board.append(list(raw_input()))

nextMove(player,board);  


