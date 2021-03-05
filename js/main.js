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
let scoreEls = {
  p1: document.querySelector('p1score'),
  p2: document.querySelector('p2score')
}

let cellEls = [...document.querySelectorAll('main div')];
console.log(cellEls)


/*----- event listeners -----*/


/*----- functions -----*/
