function  callFunction(fun) {
    fun();
}

function sayHi() {
    console.log("hi");
}
sayHi();

var sayBye=function(){
    console.log("bye");
}
callFunction(sayBye);