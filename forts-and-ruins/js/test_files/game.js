
/*
Forts and ruins will only run the gamegame part, setting size and such is done
on the webpage. SO, with a board size, the game starts.
There is a blank board and a type selector. you click a square, and the selcted type
is laid there.
Then, the game shows, on the selector, a random type being selected,
and then all squares of that type dying unless they touch a living square
Then is is the user's turn.

Or maybe I'll use hexagons... nah later...
*/

// Global variables

//color managment
var dirtcolors = ['#966341', '#9c6744', '#915d3a']
var fortcolors = ['#496645','#5d7046','#7d7046','#d6b458','#ed572d','#9b76b8']
var fortselect = 0

//geometric stuff
var cols = 16
var rows = 16
var width = 600
var height = 600
var w = width/cols
var h = height/rows
var side = width/fortcolors.length

var navh = side * 1.25

//holder for all this
var draw = SVG('svg-holder').size(600, 600+navh).spof()



//here we make all the dirt squares and keep them
//TODO: later trash the array? is it needed? lol idk
var dirtsquares = []
//nested iteration to explore each place
for (let i = 0; i < cols; i++){
  for (let j = 0; j < rows; j++){
    //x and y set with the good ol' grid formula
    var x = i * (width/cols)
    var y = j * (height/rows)
    //color picked randomly from dirtcolors
    var color = dirtcolors[Math.floor(Math.random()*3)]
    //draw and locate tole
    var tile = draw.rect(w+1, h+1).fill(color).move(x,y+navh)
    //add onclick style thing
    var newfort = function() {addfort(i, j)}
    tile.on('click', newfort)

    //and push is onto the useless array of these tiles
    dirtsquares.push(tile)
  }
}

//here we draw the color picker
var buttons = []
var side = width/fortcolors.length
for (let i = 0; i < fortcolors.length; i++) {
  var color = fortcolors[i]
  var button = draw.rect(side, side).fill(color).move(side*i, 0)
  var newfort = function() {selectcolor(i)}
  button.on('click', newfort)
  buttons.push(button)
}
var colorbar = draw.rect(width, side/4).fill(fortcolors[fortselect]).move(0, side)

//adds a fort to the screen
//TODO: need to be able to die and such
function addfort(i, j) {
  var color = fortcolors[fortselect]
  draw.rect(w+1, h+1).fill(color).move(i*w, j*h+navh)
  fogfade()


}

function selectcolor(i){
  fortselect = i
  colorbar.fill(fortcolors[fortselect])
}


//if this ever breaks rebuild it from ground up
function fogfade(){
  var cover = draw.rect(width, height + navh).fill('#000000')

  var step = 25 //in MS
  var times = 20
  var counter = times
  function onestep(){
    console.log(counter)
    counter = counter - 1
    cover.opacity(0.9)

    if (counter <= 0) {
      clearInterval(timer)
    }
  }
  var timer = setInterval(onestep, step);


}

function blackout(){
  var cover = draw.rect(width, height + navh).fill('#000000')
  cover.opacity(0.5)
}
