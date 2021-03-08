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
// const scoreEls = {
//   p1: document.getElementById('6'),
//   p2: document.getElementById('13')
// }

// selects divs for player -1
const cellElsNeg1 = [...document.querySelectorAll('main div')];
// selects divs for player 1
const cellEls1 = [...document.querySelectorAll('#board div:nth-child(n+2):nth-child(-n+7)')]
// reverses player 1's array to update correct direction
const cellEls1R = cellEls1.reverse();

const replayBtn = document.querySelector('button'); 


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
  render()
}

function player1Click(e) {
  if (winner) return; 
  const selectionIdx = cellEls1R.indexOf(e.target);
  // Sets valid clickable spaces
  if (selectionIdx !== playerRef[1].spaces[selectionIdx]) {
    console.log(`no no billy`)
    return;
  } else if (!board[selectionIdx]) {
    console.log(`thats a 0!`)
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
          console.log(`go again billy!`)
          turn *= -1;
        }
        // Continues gem distribution at beginning of array and skips opponent's store.
        if (i === 12  && gems >= 1) reLoop(); 
        
        gems--;
        board[i]++;
        }
      turn *= -1;
    }
  console.log(turn)  
  render();
}

function playerNeg1Click(e) {
  if (winner) return; 
  const selectionIdx = cellElsNeg1.indexOf(e.target);
  // Sets valid clickable spaces (-7 to set the spaces index back to 0 to start at the beginning of the array)
  if (selectionIdx !== playerRef[-1].spaces[selectionIdx - 7]) {
    console.log(`no no billy`)
    return;
  } else if (!board[selectionIdx]) {
      console.log(`thats a 0!`)
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
          console.log(`go again billy!`)
          turn *= -1;
        }
        if (i === 13  && gems >= 1) reLoop(); 
        
        gems--;
        board[i]++;
      } 
      turn *= -1;
    }
  console.log(turn)
  render();
}

function reLoop () {
  for (let i = 0; i < board.length; i++) {
    if (gems < 2) break;
    // Skips opponent's store on player -1's turn
    if (turn === -1 && i === 6) continue;
    gems--
    board[i]++
  }
}

function getWinner() {
  winner = null;
  const p1BoardSum = board[0] + board[1] + board[2] + board[3] + board[4] + board[5];
  const pNeg1BoardSum = board[7] + board[8] + board[9] + board[10] + board[11] + board[12];
  
  const p1Score = board[6];
  const pNeg1Score = board[13];
  
  if (!p1BoardSum || !pNeg1BoardSum) determineWinner(p1Score, pNeg1Score);

  function determineWinner(score1, scoreNeg1) {
    if (score1 > scoreNeg1) {
      winner = playerRef[1];
    } else winner = playerRef[-1];
  }
}

function render () {
  // render the board
  board.forEach(function (cell, idx) {
    div = document.getElementById(`${idx}`)
    div.textContent = board[idx]
  })
}


function init () {
  board = [1, 1, 1, 1, 1, 1, 0, 4, 4, 4, 4, 4, 4, 0];
  gems = 0;
  turn = 1;
  
  getWinner();
  render()
}