/*----- constants -----*/
const playerRef = {
  '1': {
    name: 'Player 1',
    spaces: [0, 1, 2, 3, 4, 5],
  },         
  '-1': {
    name: 'Player 2',
    spaces: [7, 8, 9, 10, 11, 12],
  }
};

// TODO - get gem image USE VECTOR SCALE IMAGES or whatever its called
// const gemsImg = 

/*----- app's state (variables) -----*/
let board, gems, turn, scores, winner; 


/*----- cached element references -----*/
// selects divs for player -1
const cellElsNeg1 = [...document.querySelectorAll('main div')];
// selects divs for player 1
const cellEls1 = [...document.querySelectorAll('#board div:nth-child(n+2):nth-child(-n+7)')]
// reverses player 1's array to update correct direction
const cellEls1R = cellEls1.reverse();
// replay button selector
const replayBtn = document.querySelector('button'); 
// message elements
const mainMsg = document.querySelector('h1');
const mscMsg = document.querySelector('h2');

/*----- event listeners -----*/
document.getElementById('board').addEventListener('click', handleTurn);
replayBtn.addEventListener('click', init);

/*----- functions -----*/
init()

function handleTurn(e) {
  if (turn === 1) {
    player1Click(e)
  } else {
    playerNeg1Click(e);
  }

  getWinner();
  render();
  
}

function player1Click(e) {
  if (winner) return; 
  const selectionIdx = cellEls1R.indexOf(e.target);
  // Sets valid clickable spaces
  if (selectionIdx !== playerRef[1].spaces[selectionIdx]) {
    mscMsg.textContent = `Keep your clicks to yourself!`
    return;
  } else if (!board[selectionIdx]) {
      mscMsg.textContent = `Can't really take something from nothing`
      return;
  } else {
      // Sets the amount of gems to be distributed
      gems = board[selectionIdx];
      board[selectionIdx] = 0;
      // Distributes gems
      for (let i = selectionIdx + 1; i < board.length; i++) {
        // Stops loop there are no more gems to distribute
        if (gems < 1) break;
        // Allows player to play again if they place their last gem in their own store
        if (i === 6 && gems === 1) {
          mscMsg.textContent = `Have another go!`
          turn *= -1;
        }
        // Continues gem distribution at beginning of array and skips opponent's store.
        if (i === 12  && gems >= 1) reLoop(); 
        
        gems--;
        board[i]++;
        }
      turn *= -1;
    }
  render();
}

function playerNeg1Click(e) {
  if (winner) return; 
  const selectionIdx = cellElsNeg1.indexOf(e.target);
  // Sets valid clickable spaces (-7 to set the spaces index back to 0 to start at the beginning of the array)
  if (selectionIdx !== playerRef[-1].spaces[selectionIdx - 7]) {
    mscMsg.textContent = `Keep your clicks to yourself!`
    return;
  } else if (!board[selectionIdx]) {
      mscMsg.textContent = `Can't really take something from nothing`
      return;
  } else {
      // Sets the amount of gems to be distributed
      gems = board[selectionIdx];
      board[selectionIdx] = 0;
      // Distributes gems
      for (let i = selectionIdx + 1; i < board.length; i++) {
        if (gems < 1) break;
        // Skips opponent's store
        // if (i = 6) continue;
        // Allows player to play again if they place their last gem in their own store
        if (i === 13 && gems === 1) {
          mscMsg.textContent = `Have another go!`
          turn *= -1;
        }
        if (i === 13  && gems >= 1) reLoop(); 
        
        gems--;
        board[i]++;
      } 
      turn *= -1;
    }
  render();
}

function reLoop () {
  for (let i = 0; i < board.length; i++) {
    if (!gems) break;
    // Skips opponent's store on player -1's turn
    if (turn === -1 && i === 6) continue;
    // if (turn === 1 && i === 11) continue;
    gems--
    board[i]++
  }
}

function getWinner() {
  winner = null;
  const p1BoardSum = board[0] + board[1] + board[2] + board[3] + board[4] + board[5];
  const pNeg1BoardSum = board[7] + board[8] + board[9] + board[10] + board[11] + board[12];

  if (!p1BoardSum || !pNeg1BoardSum) distributeRem();
  
  function distributeRem() {
    // adds gems left on board to respective stores
    board[6] += p1BoardSum;
    board[13] += pNeg1BoardSum;
    // sets gems not included in stores to 0
    for (let i = 0; i < board.length; i++) {
      if (i === 6 || i === 13) continue; 
      board[i] = 0;
    }
    determineWinner(board[6], board[13]);
    render();
  }
  // let p1Score = board[6];
  // let pNeg1Score = board[13];
  
  function determineWinner(p1, pNeg1) {
    if (p1 === pNeg1) winner = 'T';
    else if (p1 > pNeg1) winner = 1;
    else winner = -1;
  }
}

function render () {
  // render the board
  board.forEach(function (cell, idx) {
    div = document.getElementById(`${idx}`);
    div.textContent = board[idx];
  })

  // render messgaes
    // tie game
  if (winner === 'T') mainMsg.textContent = `Tie Game!`;
    // winner
  else if (winner) mainMsg.textContent = `${playerRef[winner].name} wins!`;
    // turn
  else mainMsg.textContent = `It's ${playerRef[turn].name}'s turn!`;
    // hide/show msc message
    mscMsg.style.visibility = winner ? 'hidden' : 'visible';
  
    setTimeout(function() {
      mscMsg.textContent = '';
    }, 3000);
}


function init () {
  board = [0, 0, 4, 0, 0, 1, 30, 0, 0, 0, 4, 0, 1, 30];
  gems = 0;
  turn = 1;
  
  getWinner();
  render()
}