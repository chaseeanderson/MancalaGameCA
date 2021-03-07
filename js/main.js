/*----- constants -----*/
const playerRef = {
  '1': {
    name: 'Player 1',
    spaces: [0, 1, 2, 3, 4, 5]
  },         
  '-1': {
    name: 'Player 2',
    spaces: [7, 8, 9, 10, 11, 12]
  }
};
// TODO - get gem image
// const gemsImg = 
console.log(playerRef[1].spaces)

/*----- app's state (variables) -----*/
let board, gems, turn, scores, winner; 


/*----- cached element references -----*/
const scoreEls = {
  p1: document.getElementById('6'),
  p2: document.getElementById('13')
}

const cellEls = [...document.querySelectorAll('main div')];

const replayBtn = document.querySelector('button'); 
// const playableEls = [...document.querySelectorAll('#board div:nth-child(n+2):nth-child(-n+13)')]


/*----- event listeners -----*/
// cellEls.forEach(el => el.addEventListener('click', player1Click));
document.getElementById('board').addEventListener('click', player1Click);
replayBtn.addEventListener('click', init);

/*----- functions -----*/
init()



function handleSelect() {


  render()
}



function player1Click(e) {
  let selectionIdx = cellEls.indexOf(e.target)
  // Sets valid clickable spaces
  if (selectionIdx !== playerRef[1].spaces[selectionIdx]) {
    console.log(`no no billy`)
    return;
  } else {
  // Sets the amount of gems to be distributed
  gems = board[selectionIdx];
  board[selectionIdx] = 0;
  // Distributes gems
  for (let i = selectionIdx + 1; i < board.length; i++) {
    if (gems < 1) break;
    if (i === 12  && gems >= 1) {
      reLoop(); 
    }; 
    gems--
    board[i]++
    
  }

    render()
  }
  
  console.log(board)
  console.log(gems)
  
}

function reLoop () {
  for (let i = 0; i < board.length; i++) {
    if (gems < 2) break;
    gems--
    board[i]++
  }
}

function render () {

}

function init () {
board = [4, 4, 4, 4, 4, 4, 0, 4, 4, 4, 4, 4, 4, 0];

gems = 0;
turn = 1;
winner = null;

  render()
}