$(document).ready(function () {
    //Global Variables
    var typicalElementInput = $('#typicalElement');
    var tempTypicalElementVal;
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
    typicalElementInput.keyup(function () {
        //We store our value of the input and use it to pass it to the K input in the sigma
        tempTypicalElementVal = $(this).val();
        _index();
        //This draws the circles based on the input number
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
    //----------------------------------------------------------------------//
    //-------------------------------Functions------------------------------//
    //----------------------------------------------------------------------//
    //Let's use this function to connect the value with our K input field
    // function
    function _index() {
        if (tempTypicalElementVal.length == 0) {
            k = '';
        } else if (tempTypicalElementVal.length > 0) {
            k = tempTypicalElementVal + "k" + " + 1";
        }
        //Here we append to our new field
        $('.typical-element-index').val(k);
    }
    //Draws circles through an index output
    function circles() {
        two.clear();
        var diameter;
        var xSpacing;
        var circleLineWidth;
        var circleColor;
        for (var i = 1; i <= typicalElementInput.val(); i++) {
            // console.log("we are here " + i);
            console.log(params.height);
            if (typicalElementInput.val() > 20) {
                diameter = 5;
                xSpacing = 15;
                circleLineWidth = 1;
                circleColor = '#204dd4';
            }
            if (typicalElementInput.val() >= 10 && typicalElementInput.val() <= 20) {
                diameter = 10;
                xSpacing = 25;
                circleLineWidth = 2;
                circleColor = '#0f9cd4';
            }
            if (typicalElementInput.val() < 10) {
                diameter = 20;
                xSpacing = 60;
                circleLineWidth = 4;
                circleColor = '#217cd4';
            }
            var circle = two.makeCircle(xSpacing * i, (params.height) / 2, diameter);
            circle.fill = circleColor;
            circle.linewidth = circleLineWidth;
        }
        two.update();
    }
    // console.log(typicalElement.val());
    // test = [].map.call(forLoopIndex, function( input){
    // 	return input.value;
    // }).join( '|' );
});