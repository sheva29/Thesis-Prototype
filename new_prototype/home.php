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

				<!--Definition of Sigma -->
				<article id="sigma-definition">
					<h2 id="sigma-title"> &Sigma;</h2>
					<h2 id="sigma-exit"> X </h2>
					<p id="sigma-content" >
						The summation sign. This appears as the symbol, S, which is the Greek upper
						 case letter, S. The summation sign, S, instructs us to sum the elements of a sequence. 
						 A typical element of the sequence which is being summed appears to the right of the summation sign.
					</p>
				</article>
				<!--Definition of Sigma ENDS HERE -->

				<!--Definition of forloop -->
				<article id="forloop-definition">
					<h2 id="forloop-title"> forloop</h2>
					<h2 id="forloop-exit"> X </h2>
					<p id="forloop-content" >
						The summation sign. This appears as the symbol, S, which is the Greek upper
						 case letter, S. The summation sign, S, instructs us to sum the elements of a sequence. 
						 A typical element of the sequence which is being summed appears to the right of the summation sign.
					</p>
				</article>
				<!--Definition of forloop ENDS HERE -->

				<input class="index" type="text" name="fname" size="1">

				<h2 id="typical-element"> X </h2>

				<input class="typical-element-index" type="text" name="fname" size="6">
				

				</form>


			</section>

			<section class="code1">

				<h2 id="forSymbol" class="forloop" >for( int i = </h2>

				<input class="forLoopIndex" id="forloop-init" type="text" name="i" size="1" placeholder="i">

				<h2 class="forloop"> ; i < </h2>

				<input class="forLoopIndex" id="forloop-max" type="text" name="n" size="1" placeholder="n">


				<h2 class="forloop"> ; i = i + </h2>

				<input class="forLoopIndex" id="typicalElement" type="text" name="k" size="1" placeholder="10">


				<h2 class="forloop"> ){ </h2>

				<br>

				<h2 id="circle-equation">  circle(posX, posY, radiusZ); </h2>
				
				<br>

				<h2 id="last-curly-bracket"> } </h2>



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
