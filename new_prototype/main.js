$(document).ready(function () {
    //----------------------------------------------------------------------//
    //-----------------------------Global Variables-------------------------//
    //----------------------------------------------------------------------//
    var typicalElementInput = $('#typicalElement');
    var indexOnSigma = $('.index');
    var sigmaIndex = $('#forloop-init');
    var forloops = $('.forLoopIndex');
    var sigmaLimit = $('.limit');
    var sigmaDefinition = $('#sigma-definition');
    var forloopDefinition = $('#forloop-definition');
    var sigmaSymbol = $('#summation');
    var sigmaExit = $('#sigma-exit');
    var forLoopMax = $('#forloop-max');
    var forSymbol = $('#forSymbol');
    var forloopExit = $('#forloop-exit');
    var tempTypicalElementVal;
    var k;
    var forLoopIndex = [];
    var n;
    var test = [];
    var tempSigmaLimitVal;
    var tempSigmaIndex;
    var amountOfCircles;
    //----------------------------------------------------------------------//
    //------------------------Two.js Global Variables-----------------------//
    //----------------------------------------------------------------------//
    var elem = document.getElementById('draw-shapes').children[0];
    var params = {
        width: 550,
        height: 200
    };
    var two = new Two(params).appendTo(elem);
    //----------------------------------------------------------------------//
    //----------------------------Hidden Elements---------------------------//
    //----------------------------------------------------------------------//
    sigmaDefinition.hide();
    forloopDefinition.hide();
    //----------------------------------------------------------------------//
    //----------------------------Event Listeners---------------------------//
    //----------------------------------------------------------------------//
    //
    //When clicked on the sigma symbol we get a div with the definition of it
    sigmaSymbol.click(function () {
        sigmaDefinition.slideToggle(500, function () {
            //And we can drag it!
            sigmaDefinition.draggable();
        });
    });
    //If we wanna close it!!
    sigmaExit.click(function () {
        sigmaDefinition.hide();
    });
    //
    //When clicked on the forloop symbol we get a definition for forloops
    forSymbol.click(function () {
        forloopDefinition.slideToggle(500, function () {
            //And we can drag it!
            forloopDefinition.draggable();
        });
    });
    //If we wanna close it!!
    forloopExit.click(function () {
        console.log("I'm being clicked");
        forloopDefinition.hide();
    });
    //Now we need to obtain our maximun in the for loop to get our index
    forloops.keyup(function () {
        //THIS WAS MY FIRST TRY, TO PUSH THE DATA TO AN ARRAY
        // if (forLoopIndex.length < 2 && forLoopIndex >= 0) {
        // forloops.each(function () {
        //     forLoopIndex.push($(this).val());
        //     appendingToSigmaLimit();
        //     console.log(sigmaLimit.val());
        //     console.log(forLoopIndex);
        // });
        // } else if (forLoopIndex.length > 2) {
        //     forLoopIndex = [];
        // }
        //THIS IS A SECOND METHOD LOOPING THROUGH IT
        // forloops.each(function (i, e) {
        //     forLoopIndex[i] = $(this).val();
        //     appendingToSigmaLimit;
        //     console.log(i);
        //     console.log(forLoopIndex);
        //});
        //AND THIS IS THE MOST EFFICIENT WAY TO DO IT.
        //It allows the size of the Array to stay the same
        // forLoopIndex[0] = 0;
        forLoopIndex[$(this).index('.forLoopIndex')] = $(this).val();
        appendingToSigmaLimit();
        appendingToSigmaIndex();
        console.log('The amount of circles is: ' + amountOfCircles);
        console.log(forLoopIndex);
        //We use the difference between the initial value of the iterator and the limit to set our number of circles
        amountOfCircles = (forLoopIndex[1] - forLoopIndex[0]);
        //This draws the circles based on the input number
        circles();
    });
    //The initial value of the index operator int he forloop
    sigmaIndex.keyup(function () {
        // console.log("We are here");
        forLoopIndex[0] = $(this).val();
        indexOnSigma.val(forLoopIndex[0]);
    });
    //The initial value of the index in the Symbol
    indexOnSigma.keyup(function () {
        forLoopIndex[0] = $(this).val();
        sigmaIndex.val(forLoopIndex[0]);
    });
    //We store the value of our k index in a variable from the limit of our for loop to store in our summation equation.
    //This will determine the amount of circles we want to draw.
    forLoopMax.keyup(function () {
        //We store our value of the input and use it to pass it to the K input in the sigma
        tempTypicalElementVal = $(this).val();
        _index();
    });
    //----------------------------------------------------------------------//
    //-------------------------------Functions------------------------------//
    //----------------------------------------------------------------------//
    //Let's use this function to connect the value with our K input field
    function appendingToSigmaLimit() {
        if (tempSigmaLimitVal == 0) {
            tempSigmaLimitVal = 1;
            console.log(tempSigmaLimitVal);
            sigmaLimit.val(tempSigmaLimitVal);
        } else {
            tempSigmaLimitVal = Math.floor((forLoopIndex[1] - forLoopIndex[0]) / forLoopIndex[2]);
            sigmaLimit.val(tempSigmaLimitVal);
        }
    }

    function appendingToSigmaIndex() {
        sigmaIndex.val(forLoopIndex[0]);
    }

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
        for (var i = 1; i <= amountOfCircles; i++) {
            if (amountOfCircles > 20) {
                diameter = 5;
                xSpacing = 15;
                circleLineWidth = 1;
                circleColor = '#204dd4';
            }
            if (amountOfCircles >= 10 && forLoopMax.val() <= 20) {
                diameter = 10;
                xSpacing = 25;
                circleLineWidth = 2;
                circleColor = '#0f9cd4';
            }
            if (amountOfCircles < 10) {
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
});