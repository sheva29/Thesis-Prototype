$(document).ready(function() {

	var typicalElement;
	var k;

	var forLoopIndex = [];
	var forloops = $('.forLoopIndex');
	var n;
	var test = [] ;

	//two.js  General variables
	var elem = document.getElementById('draw-shapes').children[0];
	var params = { width: 285, height: 200 };
	var two = new Two(params).appendTo(elem);


	//We store the value of our k index in a variable from the end of our for loop to store in our summation equation
	$('#typicalElement').keyup(function(){

		typicalElement = $(this).val();
		console.log(typicalElement); 

		k = typicalElement + "k" + " + 1" ;
		
		//We use .val to append to a input
		$(".typical-element-index").val( k );
		console.log(k); 		

	});

	//Now we need to obtain our maximun in the for loop to get our index
	forloops.keyup(function(){

		if( forLoopIndex.length < 2){

			forloops.each(function(){

					forLoopIndex.push($(this).val());
					console.log(forLoopIndex);					
									
				
			});

		}else if( forLoopIndex.length > 2){

			forLoopIndex = [];
		}



	});
	
	for( var i = 1; i < 6; i++){

		var circle = two.makeCircle(50*i, 100, 20);
		
		circle.fill = '#FF8000';
		circle.stroke = 'orangered'; // Accepts all valid css color
		circle.linewidth = 5;

	}

	two.update();
	


		// test = [].map.call(forLoopIndex, function( input){

		// 	return input.value;

		// }).join( '|' );
	

});