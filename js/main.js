/*----- constants -----*/
const playerRef = {
  '1': {
    name: 'PLAYER 1',
    spaces: [0, 1, 2, 3, 4, 5],
  },         
  '-1': {
    name: 'PLAYER 2',
    spaces: [7, 8, 9, 10, 11, 12],
  }
};

// TODO - get gem image USE VECTOR SCALE IMAGES or whatever its called
// const gemsImg = 

/*----- app's state (variables) -----*/
let board, gems, turn, scores, winner; 


/*----- cached element references -----*/
// Selects divs for player -1
const cellElsNeg1 = [...document.querySelectorAll('main div')];
// Selects divs for player 1
const cellEls1 = [...document.querySelectorAll('#board div:nth-child(n+2):nth-child(-n+7)')]
// Reverses player 1's array to update correct direction
const cellEls1R = cellEls1.reverse();
// Replay button selector
const replayBtn = document.querySelector('button'); 
// Message elements
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

/*MAIN TURN-BASED FUNCTIONS*/
function player1Click(e) {
  if (winner) return; 
  const selectionIdx = cellEls1R.indexOf(e.target);
  
  // Sets valid clickable spaces
  if (selectionIdx !== playerRef[1].spaces[selectionIdx]) {
    mscMsg.textContent = `keep your clicks to yourself!`
    return;
  } else if (!board[selectionIdx]) {
    mscMsg.textContent = `can't really take something from nothing`
    return;
  } 
  
  // Play the round
  
    else {
      // Sets the amount of gems to be distributed
      gems = board[selectionIdx];
      board[selectionIdx] = 0;
      
      // Distributes gems
      distr3(selectionIdx, gems)

      turn *= -1;
    
  render();
      }
}

function distr3 (selec, gems) {
  if (!gems) return;
  board[selec + 1]++

  // Allows player to play again if they place their last gem in their own store
  if (selec === 6 && gems === 1) {
    mscMsg.textContent = `have another go!`
    turn *= -1;
  }
  
  // Captures opponent's gems 
  if (board[selec] === 0 && selec !== 6 && gems === 1) capture(12 - i);
  
  // Continues gem distribution at beginning of array and skips opponent's store.
  if (selec === 11  && gems >= 1) reLoop(); 

  console.log(`gems: ${gems}`)
  console.log(`board: ${board}`)
  console.log(`index: ${selec}`)
  console.log(`turn: ${turn}`)
        
  render();
  return setTimeout(function () {distr3 (selec + 1, gems - 1)}, 3000)
}


function playerNeg1Click(e) {
  if (winner) return; 
  const selectionIdx = cellElsNeg1.indexOf(e.target);

  // Sets valid clickable spaces 
  if (selectionIdx !== playerRef[-1].spaces[selectionIdx - 7]) {
    mscMsg.textContent = `keep your clicks to yourself!`
    return;
  } else if (!board[selectionIdx]) {
      mscMsg.textContent = `can't really take something from nothing`
      return;
  } 
  
  // Play the round  

    else {
      // Sets the amount of gems to be distributed
      gems = board[selectionIdx];
      board[selectionIdx] = 0;

      // Distributes gems
      for (let i = selectionIdx + 1; i < board.length; i++) {
        if (gems < 1) break;

        // Allows player to play again if they place their last gem in their own store
        if (i === 13 && gems === 1) {
          mscMsg.textContent = `have another go!`
          turn *= -1;
        }

        // Captures opponent's gems 
        if (board[i] === 0 && i !== 13 && gems === 1) capture(Math.abs(i - 12)); // THE PROBLEM IS HERE

        // Starts loop at the beginning if end is reached
        if (i === 13  && gems >= 1) reLoop(); 
        
        gems--;
        board[i]++;
        console.log(`gems: ${gems}`)
        console.log(`board: ${board}`)
        console.log(`index: ${i}`)
        console.log(`turn: ${turn}`)
      }

      turn *= -1;
    }
  render();
}

/*HELPER FUNCTIONS*/

function capture (n) {
  if (turn === 1) {
    board[6] += board[n];
    board[n] = 0;
  } else {
    board[13] += board[n];
    board[n] = 0;
  }
  console.log(`gotcha!`)
  console.log(`turn: ${turn}`)
}

function reLoop () {
  for (let i = 0; i < board.length; i++) {
    if (gems === 1) break;

    // Starts loop again if there are more gems to distribute
    if (i === 13 && gems > 0) reLoop();
    
    // Turn-based conditions after the first pass of the board
    
    if (turn === -1) {
      // Skips opponent's store on player -1's turn
      if (i === 6) continue;
      // Captures opponent's gems 
      if (board[i] === 0 && i !== 13 && gems === 2) capture(Math.abs(i - 12));
    }  
    
    if (turn === 1) {
      // Skips opponent's store on player 1's turn
      if (i === 13) board[i]--;
      // Captures opponent's gems 
      if (board[i] === 0 && i !== 6 && gems === 2) capture(12 - i);
    }

    gems--
    board[i]++
    console.log(`gems: ${gems}`)
    console.log(`board: ${board}`)
    console.log(`index: ${i}`)
    console.log(`turn: ${turn}`)
  }  
}

function getWinner() {
  winner = null;
  const p1BoardSum = board[0] + board[1] + board[2] + board[3] + board[4] + board[5];
  const pNeg1BoardSum = board[7] + board[8] + board[9] + board[10] + board[11] + board[12];

  // Determines when one player has run out of gems on their side
  if (!p1BoardSum || !pNeg1BoardSum) distributeRem();
  
  // Adds remaining gems left on other player's board to their store before determining winner
  function distributeRem() {
    board[6] += p1BoardSum;
    board[13] += pNeg1BoardSum;

    // Sets gems not included in stores to 0
    for (let i = 0; i < board.length; i++) {
      if (i === 6 || i === 13) continue; 
      board[i] = 0;
    }

    determineWinner(board[6], board[13]);
    render();
  }
  
  function determineWinner(p1, pNeg1) {
    if (p1 === pNeg1) winner = 'T';
    else if (p1 > pNeg1) winner = 1;
    else winner = -1;
  }
}

function render () {
  // Render the board
  board.forEach(function (cell, idx) {
    div = document.getElementById(`${idx}`);
    div.textContent = board[idx];
  })

  // Render messgaes
    // Tie game
  if (winner === 'T') mainMsg.textContent = `TIE GAME!`;
    // Winner
  else if (winner) mainMsg.textContent = `${playerRef[winner].name} WINS!`;
    // Turn
  else mainMsg.textContent = `IT'S ${playerRef[turn].name}'S TURN!`;
    // Hide/Show msc message
    mscMsg.style.visibility = winner ? 'hidden' : 'visible';
    setTimeout(function() {
      mscMsg.textContent = '';
    }, 3000);

  // Hide/Show play again button
  replayBtn.style.visibility = winner ? 'visible' : 'hidden';
}

function init () {
  board = [4, 4, 4, 4, 4, 4, 0, 4, 4, 4, 4, 4, 4, 0];
  gems = 0;
  turn = 1;
  
  getWinner();
  render()
}