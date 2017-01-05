var CHOICE = [-1, -1];

function isThreeSame(board, x, y, z) {
    if (board[x] == board[y] && board[y] == board[z] && board[x] != '_') {
        return true;
    }
    return false;
}

function gameOver(player, board, depth) {
    if (isThreeSame(board, 0, 3, 6)) {
        if (board[0] == player)
            return 10 - depth
        else
            return depth - 10
    }
    else if (isThreeSame(board, 1, 4, 7)) {
        if (board[1] == player)
            return 10 - depth
        else
            return depth - 10
    }
    else if (isThreeSame(board, 2, 5, 8)) {
        if (board[2] == player)
            return 10 - depth
        else
            return depth - 10
    }
    else if (isThreeSame(board, 0, 1, 2)) {
        if (board[0] == player)
            return 10 - depth
        else
            return depth - 10
    }
    else if (isThreeSame(board, 3, 4, 5)) {
        if (board[3] == player)
            return 10 - depth
        else
            return depth - 10
    }
    else if (isThreeSame(board, 6, 7, 8)) {
        if (board[6] == player)
            return 10 - depth
        else
            return depth - 10
    }
    else if (isThreeSame(board, 0, 4, 8)) {
        if (board[0] == player)
            return 10 - depth
        else
            return depth - 10
    }
    else if (isThreeSame(board, 2, 4, 6)) {
        if (board[2] == player)
            return 10 - depth
        else
            return depth - 10
    }
    else {
        for (var i = 2; i >= 0; i--)
            for (var j = 2; j >= 0; j--)
                if (board[3 * i + j] == '_')
                    return undefined
        return 0
    }
}
function nextMoveHelper(player, board, depth, row, column, isPlayerTurn) {
    var scores = new Array();
    var moves = new Array();
    // console.log(board)
    if (row >= 0 && column >= 0) {
        board[3 * row + column] = player
        if (!isPlayerTurn && player == 'X')
            board[3 * row + column] = 'O'
        else if (!isPlayerTurn && player == 'O')
            board[3 * row + column] = 'X'
    }
    score = gameOver(player, board, depth)
    if (score != undefined)
        return score
    // range = Array.apply(null, Array(5)).map(function (_, i) {return i;});            
    for (var i = 2; i >= 0; i--)
        for (var j = 2; j >= 0; j--)
            if (board[3 * i + j] == '_') {
                scores.push(nextMoveHelper(player, JSON.parse(JSON.stringify(board)), depth + 1, i, j, !isPlayerTurn));
                moves.push([i, j]);
            }

    //print scores, moves
    if (!isPlayerTurn) {
        max_score = Math.max.apply(null, scores);//max(scores)
        max_index = scores.indexOf(max_score)
        CHOICE = moves[max_index]
        //print "choice" , CHOICE
        // console.log(CHOICE);
        return max_score
    } else {
        min_score = Math.min.apply(null, scores);
        min_index = scores.indexOf(min_score)
        CHOICE = moves[min_index]
        //print "choice", CHOICE
        return min_score
    }
    console.log(CHOICE);
}
function nextMove(player, board) {
    nextMoveHelper(player, board, 0, -1, -1, false);
    console.log(CHOICE);
    return CHOICE
}

function isGameOver() {
    var score = gameOver('X', board(), 0);
    if (score !== undefined) {
        return true;
    }
    return false;
}