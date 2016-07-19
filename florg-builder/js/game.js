// module aliases
// Matter aliases
var Body = Matter.Body,
    Example = Matter.Example,
    Engine = Matter.Engine,
    World = Matter.World,
    Common = Matter.Common,
    Bodies = Matter.Bodies,
    Events = Matter.Events,
    Mouse = Matter.Mouse,
    MouseConstraint = Matter.MouseConstraint,
    Runner = Matter.Runner,
    Render = Matter.Render;

// create an engine
var engine = Engine.create();

// create a renderer
var render = Render.create({
    element: document.getElementById('canvas-container'),
    engine: engine
});


// define our categories (as bit fields, there are up to 32 available)
var defaultCategory = 0x0001,
  evenCategory = 0x0002,
  oddCategory = 0x0004,
  blueCategory = 0x0008;

// create many bodies



var root = Bodies.rectangle(400, 200, 80, 80, {collisionFilter: {
                    mask: defaultCategory | evenCategory,
                    category: evenCategory
                }});
var leftleg = Bodies.rectangle(500, 100, 10, 160, {collisionFilter: {
                    mask: defaultCategory | oddCategory,
                    category: oddCategory
                }});
var rightleg = Bodies.rectangle(550, 100, 10, 160, {collisionFilter: {
                    mask: defaultCategory | oddCategory,
                    category: oddCategory
                }});
var leftfoot = Bodies.rectangle(600, 100, 10, 80, {collisionFilter: {
                    mask: defaultCategory | evenCategory,
                    category: evenCategory
                }});
var rightfoot = Bodies.rectangle(650, 100, 10, 80, {collisionFilter: {
                    mask: defaultCategory | evenCategory,
                    category: evenCategory
                }});
var ground = Bodies.rectangle(400, 610, 810, 60, {
                    isStatic: true, collisionFilter: {
                    mask: defaultCategory | evenCategory | oddCategory,
                    category: defaultCategory
                   }});

// add all of the bodies to the world
World.add(engine.world, [root, leftleg, rightleg, leftfoot, rightfoot, ground]);

// run the engine
Engine.run(engine);

// run the renderer
Render.run(render);

//mouse and mouseConstraint
element = render.canvas//document.getElementById('canvas-container')
var mouseConstraint = MouseConstraint.create(engine, {
    mouse: Mouse.create(element)
});
World.add(engine.world, mouseConstraint);
var helpme = function(stuff){
  console.log(stuff)
}
Events.on(mouseConstraint, "mouseup", helpme)

lefthip = Matter.Constraint.create({
  bodyA: root,
  bodyB: leftleg,
  length: 1,
  pointA: {x:-20, y: +20},
  pointB: {x:0, y: -70},
  stiffness: 0.2
})

righthip = Matter.Constraint.create({
  bodyA: root,
  bodyB: rightleg,
  length: 1,
  pointA: {x:+20, y: +20},
  pointB: {x:0, y: -70},
  stiffness: 0.2
})

leftankle = Matter.Constraint.create({
  bodyA: leftleg,
  bodyB: leftfoot,
  length: 1,
  pointA: {x:0, y: +70},
  pointB: {x:0, y: 0},
  stiffness: 0.2
})

rightankle = Matter.Constraint.create({
  bodyA: rightleg,
  bodyB: rightfoot,
  length: 1,
  pointA: {x:0, y: +70},
  pointB: {x:0, y: 0},
  stiffness: 0.2
})

World.add(engine.world, [lefthip, righthip, leftankle, rightankle])
