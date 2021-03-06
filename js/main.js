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
  p1: document.querySelector('p1score'),
  p2: document.querySelector('p2score')
}
const cellEls = [...document.querySelectorAll('main div')];
const replayBtn = document.querySelector('button'); 
const playableEls = [...document.querySelectorAll('#board div:nth-child(n+2):nth-child(-n+13)')]


/*----- event listeners -----*/
playableEls.forEach(el => el.addEventListener('click', handleSelect));
replayBtn.addEventListener('click', init);

/*----- functions -----*/
init()

function handleSelect() {

console.log('billygoat')
  // render()
}

function render () {

}

function init () {


  render()
}
