$(document).ready(function () {
    //General Variables
    var typicalElement = $('#typicalElement');
    var k;
    var forLoopIndex = [];
    var forloops = $('.forLoopIndex');
    var n;
    var test = [];
    //two.js  General variables
    var elem = document.getElementById('draw-shapes').children[0];
    var params = {
        width: 550,
        height: 200
    };
    var two = new Two(params).appendTo(elem);
    //We store the value of our k index in a variable from the end of our for loop to store in our summation equation
    typicalElement.keyup(function () {
        typicalElement = $(this).val();
        // console.log(typicalElement); 
        k = typicalElement + "k" + " + 1";
        //We use .val to append to a input
        $(".typical-element-index").val(k);
        // console.log(k); 		
        typicalElement = $('#typicalElement');
        console.log(typicalElement.val());
        circles();
    });
    //Now we need to obtain our maximun in the for loop to get our index
    forloops.keyup(function () {
        if (forLoopIndex.length < 2) {
            forloops.each(function () {
                forLoopIndex.push($(this).val());
                // console.log(forLoopIndex);					
            });
        } else if (forLoopIndex.length > 2) {
            forLoopIndex = [];
        }
    });

    function circles() {
        two.clear();
        var diameter;
        var ySpacing;
        var circleLineWidth;
        for (var i = 1; i <= typicalElement.val(); i++) {
            console.log("we are here " + i);
            if (typicalElement.val() > 10) {
                diameter = 5;
                ySpacing = 20;
            }
            if (typicalElement.val() < 10) {
                diameter = 20;
                ySpacing = 60;
            }
            var circle = two.makeCircle(50 * i, ySpacing, diameter);
            circle.fill = '#00baf2';
            circle.linewidth = circleLineWidth;
        }
        two.update();
    }
    console.log(typicalElement.val());
    // test = [].map.call(forLoopIndex, function( input){
    // 	return input.value;
    // }).join( '|' );
});