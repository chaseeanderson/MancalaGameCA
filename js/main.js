/*----- constants -----*/
const playerRef = 
{
  '1': {
    name: 'PLAYER 1',
    spaces: [0, 1, 2, 3, 4, 5],
  },         
  '-1': {
    name: 'PLAYER 2',
    spaces: [7, 8, 9, 10, 11, 12],
  }
};

// Sounds
const player = new Audio();


/*----- app's state (variables) -----*/
let board, gems, turn, winner, isPlaying; 


/*----- cached element references -----*/
// Selects divs for player -1
const cellElsNeg1 = [...document.querySelectorAll('main div')];
// Selects divs for player 1
const cellEls1 = [...document.querySelectorAll('#board div:nth-child(n+2):nth-child(-n+7)')]
// Reverses player 1's array to update correct direction
const cellEls1R = cellEls1.reverse();
// Replay button selector
const replayBtn = document.querySelector('#reset'); 
// Message elements
const mainMsg = document.querySelector('h1');
const mscMsg = document.querySelector('h2');
// Background player
const bgPlayerBtn = document.querySelector('#bg-player');
const bgPlayer = document.querySelector('audio');

/*----- event listeners -----*/
document.getElementById('board').addEventListener('click', handleTurn);
replayBtn.addEventListener('click', init);
bgPlayerBtn.addEventListener('click', toggleBg);


/*----- functions -----*/
init();

function handleTurn(e) {
  if (turn === 1) {
    player1Click(e);
  } else {
    playerNeg1Click(e);
  }

  getWinner();
  render();
}

function player1Click(e) {
  mscMsg.textContent = '';
  if (winner) return; 
  const selectionIdx = cellEls1R.indexOf(e.target);
  
  // Sets valid clickable spaces
  if (selectionIdx !== playerRef[1].spaces[selectionIdx]) {
    mscMsg.textContent = `keep your clicks to yourself!`;
    return;
  } else if (!board[selectionIdx]) {
    mscMsg.textContent = `can't really take something from nothing`;
    return;
  }
  
  // Play the round
  
    else {
      // Sets the amount of gems to be distributed
      gems = board[selectionIdx];
      board[selectionIdx] = 0;
      
      // Distributes gems
      distribute1(selectionIdx + 1, gems);

      render();
    }
}

function playerNeg1Click(e) {
  mscMsg.textContent = '';
  if (winner) return; 
  const selectionIdx = cellElsNeg1.indexOf(e.target);

  // Sets valid clickable spaces 
  if (selectionIdx !== playerRef[-1].spaces[selectionIdx - 7]) {
    mscMsg.textContent = `keep your clicks to yourself!`;
    return;
  } else if (!board[selectionIdx]) {
      mscMsg.textContent = `can't really take something from nothing`;
      return;
    } 
  
  // Play the round  

  else {
    // Sets the amount of gems to be distributed
    gems = board[selectionIdx];
    board[selectionIdx] = 0;
    
    // Distributes gems
    distributeNeg1(selectionIdx + 1, gems)

    render();
  }
}

function distribute1 (space, gems) {
  // Allows loop to start at beginning once end is reached
  space = space % 14;

  // Base case
  if (!gems) {
    turn *= -1;
    render();
    return;
  }
  playBeep();
  board[space]++;
  
  /*Board Conditions*/

  // Skips opponents store
  if (space === 13) {
    board[space]--;
    gems++;
  }
  // Allows player to play again if they place their last gem in their own store
  if (space === 6 && gems === 1) {
    playMsc();
    mscMsg.textContent = `have another go!`;
    turn *= -1;
  }
  // Captures opponent's gems 
  if (board[space] === 1 && space !== 6 && space === playerRef[1].spaces[space] && gems === 1) {
    playMsc();
    capture(12 - space); 
  }

  render();
  return setTimeout(function () {distribute1 (space + 1, gems - 1)}, 600);
}

function distributeNeg1 (space, gems) {
  // Allows loop to start at beginning once end is reached
  space = space % 14;

  // Base case
  if (!gems) {
    turn *= -1;
    render();
    return;
  }
  
  playBeep();
  board[space]++;
  
  /*Board Conditions*/

  // Skips opponents store
  if (space === 6) {
    board[space]--;
    gems++;
  }
  // Allows player to play again if they place their last gem in their own store
  if (space === 13 && gems === 1) {
    playMsc();
    mscMsg.textContent = `have another go!`;
    turn *= -1;
  }
  // Captures opponent's gems 
  if (board[space] === 1 && space !== 13 && space === playerRef[-1].spaces[space - 7] && gems === 1) {
    playMsc();
    capture(12 - space); 
  }
        
  render();
  return setTimeout(function () {distributeNeg1 (space + 1, gems - 1)}, 600);
}

function capture (n) {
  if (turn === 1) {
    board[6] += board[n];
    board[n] = 0;
  } else if (turn === -1) {  
    board[13] += board[n];
    board[n] = 0;
  }
  mscMsg.textContent = `grab those gems!`;
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
    playWinner();
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
    // Hide/Show play again button
  replayBtn.style.visibility = winner ? 'visible' : 'hidden';
}

function init () {
  board = [4, 4, 4, 4, 4, 4, 0, 4, 4, 4, 4, 4, 4, 0];
  gems = 0;
  turn = 1;
  isPlaying = false;
  
  getWinner();
  render();
}

// Sound functions
function playBeep() {
  player.src = 'https://freesound.org/data/previews/515/515643_10246545-lq.mp3';
  player.play();
}

function toggleBg() {
  if (!isPlaying) { 
    bgPlayer.play();
    isPlaying = true;
    bgPlayerBtn.textContent = 'PAUSE ME';
  } else {
    bgPlayer.pause();
    isPlaying = false;
    bgPlayerBtn.textContent = 'PLAY ME';
  }
}

function playMsc() {
  player.src = 'https://freesound.org/data/previews/159/159011_1326056-lq.mp3';
  player.play();
}

function playWinner() {
  player.src = 'https://freesound.org/data/previews/167/167535_1657645-lq.mp3';
  bgPlayer.pause();
  player.play();
}