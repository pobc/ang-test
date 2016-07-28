function SomeClass(greeter){
    this.greeter = greeter;
}
SomeClass.prototype.greetName = function(name){
    return this.greeter.greet(name);
};
$(function(){
    var gr ={a:1};
    gr.greet = function (n) {
        return n;
    };
    var aa = new SomeClass();
    aa.greeter = gr;
    console.log(aa.greetName(11));
});

