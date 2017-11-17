
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

    this.money =+ number;
  };
  this.movePlayer = function(number){
    this.position += rollNumber;
  };
  //**the go to mail function below may not be necessary depending on how we write the functions to tell players where to go
  this.goToJail = function(){
    this.position = 11;
    this.inJail = true;
  };
}




var andrew = new Player("Andrew", 0, 1500, [], false);
console.log("name: " + andrew.name + " | postition number: " +andrew.position + " | property Number: " + andrew.property + " | Total money: "+ andrew.money + " | Jail Status: " + andrew.inJail);



function payBank(amount, playerAmount){
 playerAmount = playerAmount - amount;
}
andrew.payBank(50);

function bankPays(amount, playerAmount) {
  playeAmount = playerAmount + amount;
}



//payBank(50, andrew.money);
console.log(" ");
console.log("____________------------_____________-----------------_________________");
console.log("  ");
console.log("name: " + andrew.name + " | postition number: " +andrew.position + " | property Number: " + andrew.property + " | Total money: "+ andrew.money + " | Jail Status: " + andrew.inJail);
