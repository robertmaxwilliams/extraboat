<!DOCTYPE html>
<link rel="stylesheet" type="text/css" href="style.css">
<body>
<?php
   $path = $_SERVER['DOCUMENT_ROOT'];
   $path .= "/header.html";
   include_once($path);
?>

<script>
document.getElementById("forts-and-ruins").style.color = "black";
</script>

<div class="body">
<h1>Forts and Ruins</h1>
<h2><i>"wow!"</i> - actual user</h2>
<p>In this game, you want to build as many forts (in purple) as you can.</p>
<p>To build a fort, surround an empty square with fields, placed by clicking.</p>
<p>Each turn, all fields of a randomly selected color die from disease.</p>
<p>Good luck!</p>
<div class="game" id="svg-holder"></div>
<script src="js/svg.js"></script>
<script src="js/game.js"></script>
<p><i>Forts and Ruins web alpha v.1.0.0</i></p>
</div>

</body>
</html>
