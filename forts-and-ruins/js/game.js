
/*
fields and ruins will only run the gamegame part, setting size and such is done
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
var fieldcolors = ['#496645','#5d7046','#7d7046','#d6b458','#ed572d','#9b76b8']
var fieldselect = 0

//geometric stuff
var cols = 16
var rows = 16
var width = 600
var height = 600
var w = width/cols
var h = height/rows
var side = width/fieldcolors.length

var navh = side * 1.25


//adds a field to the screen
//TODO: need to be able to die and such
var fields = []
var fieldsbycolor = [[],[],[],[],[],[]]
var livefieldids = []
var forts = []

var draw = SVG('svg-holder').size(600, 600+navh).spof()

startgame()
function startgame(){
  draw.clear()
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
      var newfield = function() {addfield(i, j); fogfade()}
      tile.on('click', newfield)

      //and push is onto the useless array of these tiles
      dirtsquares.push(tile)
    }
  }

  //here we draw the color picker
  var buttons = []
  var side = width/fieldcolors.length
  var livefieldids = []
  for (let i = 0; i < fieldcolors.length; i++) {
    var color = fieldcolors[i]
    var button = draw.rect(side, side).fill(color).move(side*i, 0)
    var newfield = function() {selectcolor(i)}
    button.on('click', newfield)
    buttons.push(button)
  }
  var colorbar = draw.rect(width, side/4).fill(fieldcolors[fieldselect]).move(0, side)



  var i = Math.floor(cols/2).toString()
  var iplus = (Math.floor(cols/2) + 1).toString()
  var j = Math.floor(rows/2).toString()
  addfort(i + ',' + j)
  addfield(iplus, j)

}
function addfield(i, j) {
  var color = fieldcolors[fieldselect]
  var field = draw.rect(w+1, h+1).fill(color).move(i*w, j*h+navh)
  field['color'] = fieldselect

  var fieldid = i.toString() + ',' + j.toString()
  field['id'] = fieldid
  fields[fieldid] = field
  fieldsbycolor[fieldselect].push(fieldid)
  livefieldids.push(fieldid)
}

function selectcolor(i){
  fieldselect = i
  colorbar.fill(fieldcolors[fieldselect])
}

//places forts and animates deathfog, consider renaming function
function contains(array, x){
  /*
  how update:
  fields : contains DOM objects for fields, and each has 0-5 color index
  fieldsbycolor : array of arrays, at each inex has id for fields of that color
  livefieldids : all field ids, until they are removed upon death
  forts : DOM objects for forts

  the last id in 'livefieldids' is the most recent field placed
  ids of all dirt squares sharing a side with the last one is determined
  each potential fort (those dirt squares) is checked if it has a live field on all sides
  if so, a fort is placed there

  each fort is checked for having at least one live field touching a side
  if not it is colored in darker

  all fields of the chosen color are removed from livefields and colored in

  */

  //array.includes(x) is the same but I think it is not supported well
  return (array.indexOf(x) > -1)
}

//this splice non-function is garbage, but I have no net so I'll fix it later
function cut(array, i){
  return array.splice(0, i).concat(array.splice(1, array.length))
}

//animate death color and updated dead things
function fogfade(){
  var deadnum = Math.floor(Math.random() * fieldcolors.length)
  var deadcolor = fieldcolors[deadnum]
  var cover = draw.rect(width, height + navh).fill(deadcolor)

  //place fort in field hole
  potentialforts = nearby(livefieldids[livefieldids.length-1])
  console.log("potential forts: ", potentialforts)
  for (var i = 0; i < potentialforts.length; i++){
    if (!contains(livefieldids, potentialforts[i])){
      console.log("not field:", potentialforts[i])
      var tocheck = nearby(potentialforts[i])
      var isalive = true
      for (var j = 0; j < tocheck.length; j++){
        console.log("   checking:", tocheck[j])
        if (!contains(livefieldids, tocheck[j])){
          isalive = false
          console.log("   died", tocheck[j])
        }
      }
      if (isalive){
        addfort(potentialforts[i])
       }
     }
   }

   //removes dead fields
   for (var i = 0; i < fieldsbycolor[deadnum].length; i++){
     var deadfield = fields[fieldsbycolor[deadnum][i]]
     console.log("deadfield: ", deadfield.id)
     deadfield.fill('#202b29')
     var index = livefieldids.indexOf(deadfield.id)
     livefieldids = cut(livefieldids, index)
   }
   fieldsbycolor[deadnum] = []


   //removes dead forts
   var anyalive = false
   for (var i = 0; i < forts.length; i++){
     surrounds = nearby(forts[i].id)
     var isalive = false
     for (var j = 0; j < 4; j++){
       if (contains(livefieldids, surrounds[j])){
         isalive = true
         console.log("lives because: ", forts[i], surrounds[j])
       }
     }
     if (!isalive) {
       forts[i].fill('#4d1d35')
       forts[i].isalive = false
     }
     if (forts[i].isalive){
       anyalive = true
     }
   }

   if (anyalive == false){
     gameover()
   }

  var step = 25 //in MS
  var times = 10
  var counter = times
  function onestep(){
    counter = counter - 1
    cover.opacity(counter/times)

    if (counter <= 0) {
      clearInterval(timer)
      cover.remove()
    }
  }
  var timer = setInterval(onestep, step);

}

function addfort(id){
  var iandj = id.split(',');
  i = Number(iandj[0])
  j = Number(iandj[1])
  var fort = draw.rect(w+1, h+1).fill('#85325b').move(i*w, j*h+navh)
  fort.id = id
  fort.isalive = true
  forts.push(fort)
}

function nearby(fieldid){
  var iandj = fieldid.split(',');
  i = Number(iandj[0])
  j = Number(iandj[1])

  return [(i+1).toString() + ',' + (j).toString(),
          (i-1).toString() + ',' + (j).toString(),
          (i).toString() + ',' + (j+1).toString(),
          (i).toString() + ',' + (j-1).toString()]
}

function gameover(){
  console.log("GAMEOVER")
  draw.rect(width, height + navh).fill(fieldcolors[fieldselect]).opacity(0.5).click(startgame)
  var score = (forts.length* 50) + (fields.length * 10)
  var text = draw.text("Game Over").dy(height/3).size(60).fill('#ffffff')
  text.cx(width/2)
  var text2 = draw.text("\nScore: " + score).dy(height/3+60).size(60).fill('#ffffff')
  text2.cx(width/2)
  var text3 = draw.text("click anywhere to restart").dy(height/3+300).size(30).fill('#ffffff')
  text3.cx(width/2)

}
