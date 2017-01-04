var CHOICE = [-1, -1];
function gameOver(player, board, depth){
    if( board[0] == board[3] && board[3] == board[6] && board[0] != '_'){
        if (board[0] == player)
            return 10-depth
        else
            return depth-10
    }
    else if( board[1] == board[4] && board[4] == board[7] && board[1] != '_'){
        if (board[1] == player)
            return 10-depth
        else
            return depth-10
    }
    else if( board[2] == board[5] && board[5] == board[8] && board[2] != '_'){
        if (board[2] == player)
            return 10-depth
        else
            return depth-10
    }
    else if(board[0] == board[1] && board[1] == board[2] && board[0] != '_'){
        if (board[0] == player)
            return 10-depth
        else
            return depth-10
    }
    else if( board[3] == board[4] && board[4] == board[5] && board[3] != '_'){
        if (board[3] == player)
            return 10-depth
        else
            return depth-10
    }
    else if( board[6] == board[7] && board[7] == board[8] && board[6] != '_'){
        if (board[6] == player)
            return 10-depth
        else
            return depth-10
    }
    else if( board[0] == board[4] && board[4] == board[8] && board[0] != '_'){
        if (board[0] == player)
            return 10-depth
        else
            return depth-10
    }
    else if( board[2] == board[4] && board[4] == board[6] && board[2] != '_'){
        if (board[2] == player)
            return 10-depth
        else
            return depth-10
    }
    else {
        for (var i = 2; i >= 0; i--)
            for (var j = 2; j >= 0; j--)
                if(board[3*i+j] == '_')
                    return undefined
        return 0
    }
}
function nextMoveHelper(player, board, depth, row, column, isPlayerTurn){
    var scores = new Array();
    var moves = new Array();
    // console.log(board)
    if(row >= 0 && column >= 0){
        board[3*row + column] = player
        if(!isPlayerTurn && player == 'X')
            board[3*row + column] = 'O'
        else if(!isPlayerTurn && player == 'O')
            board[3*row + column] = 'X'
    }
    score = gameOver(player, board, depth)
    if(score != undefined)
        return score
    // range = Array.apply(null, Array(5)).map(function (_, i) {return i;});            
    for (var i = 2; i >= 0; i--) 
        for (var j = 2; j >= 0; j--) 
            if(board[3*i + j] == '_'){
                scores.push(nextMoveHelper(player, JSON.parse(JSON.stringify(board)), depth + 1, i, j, !isPlayerTurn));
                moves.push([i, j]);
            }

    //print scores, moves
    if(!isPlayerTurn){
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
function nextMove(player,board, isPlayerTurn){
    nextMoveHelper(player, board, 0, -1, -1, false)
    console.log(CHOICE);
    return CHOICE
}