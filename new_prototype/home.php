<html>

	<head>

		<!-- My css -->
		<link rel ="stylesheet" href="style.css">
		<!--jQuery -->
		<script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
		<!--jQuery UI-->
		<link rel="stylesheet" href="//ajax.googleapis.com/ajax/libs/jqueryui/1.10.4/themes/smoothness/jquery-ui.css" />
		<script src="//ajax.googleapis.com/ajax/libs/jqueryui/1.10.4/jquery-ui.min.js"></script>
		<!--We include two.js here-->
		<script src="two.min.js"></script>


	</head>

	<body>

		<div class="main">

			<section class="math1">


				<input class="limit" type="text" name="fname" size="1">

				<h1 id="summation">&Sigma;</h1>

				<input class="index" type="text" name="fname" size="1">

				<h2 id="typical-element"> X </h2>

				<input class="typical-element-index" type="text" name="fname" size="6">
				<!-- <p class=""> -->

				</form>


			</section>

			<section class="code1">

				<h2 class="forloop" >for( int i = </h2>

				<input class="forLoopIndex" id="forloop-init"type="text" name="i" size="1" placeholder="i">

				<h2 class="forloop"> ; i < </h2>

				<input class="forLoopIndex" id="forloop-max" type="text" name="n" size="1" placeholder="n">


				<h2 class="forloop"> ; i = i + </h2>

				<input class="forLoopIndex" id="typicalElement" type="text" name="k" size="1" placeholder="10">


				<h2 class="forloop"> ); </h2>


			</section>

			<div id="draw-shapes">
			<div>

		</div>

	<script>
	
		//Main JS file
		<?php include "main.js"; ?>

	</script>

	</body>


</html>
