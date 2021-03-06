/*----- constants -----*/
const playerRef = {
  '1': {
    name: 'Player 1'
  },         
  '-1': {
    name: 'Player 2'
  }
};
// TODO - get gem image
// const gemsImg = 


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
  const selection = cellEls.indexOf(e.target)
  // Sets the amount of gems to be distributed
  gems = board[selection];
  board[selection] = 0;
  // Distributes gems
  while (gems > 0) {
    for (let i = selection + 1; i < board.length; i++) {
      gems--
      board[i]++
      if (board[i] === 13) break; // START HERE TODAY. LOOP ISNT STOPPING
      render()
    }
  }
  console.log(board)
  
  // const divId = document.getElementById(`${playableIdx}`)
  // console.log(playableIdx)
  // console.log(divId)
  
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
