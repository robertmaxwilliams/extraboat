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
<h1>There will be a game here</h1>
<h2><i>"wow!"</i> - actual user</h2>
<p>What are you waiting for?</p>
<div id="svg-holder"><div>
<script src="js/game.js"></script>


</div>
</body>
</html>
