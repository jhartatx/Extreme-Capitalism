var bank;

function Player(name, position, money, property, inJail){
  this.name = name;
  this.position = position;
  this.money = money;
  this.property = [];
  this.inJail = false;
  this.payMoney = function(number){
    this.money -= number;
  };
  this.receiveMoney = function(number){
    this.money += number;
  };
  this.movePlayer = function(rollNumber){
    this.position += position;
  };
};

var newPlayer = new Player("justin", 0, 500, "", false);

//console.log("Justin's stats: " + justin.name + justin.position + justin.money + justin.property + justin.inJail);

function payBank(amount, player) {


};

function payEach(amount, player){

};

function getPaid(amount, player){

};

function goToGo(){

};

function goToJail(){

};

function goBack(){

};

function goToRail(){

};

function goToService(){

};
