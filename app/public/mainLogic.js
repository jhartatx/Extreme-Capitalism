//dice

var dbl = 0;
function rolldice() {
    var x = Math.floor(Math.random() * ((6 - 1) + 1) + 1);
    var y = Math.floor(Math.random() * ((6 - 1) + 1) + 1);
    var dicetotal = x + y;
    $('.dice1').attr('id', "dice" + x);
    $('.dice2').attr('id', "dice" + y);
    if (x == y) { //<----checking if there is a double
        dbl++; //<---increment double count
        if(dbl%3==0) $('.out').attr('id', "jail");
        //Now reroll the dice, but if you hit 3 doubles in a row, you get message go to jail.
        rolldice();
    }
};
