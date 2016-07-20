"use strict";

// Important Definitions
// Syntax Parser: A program that reads your code and determins what it does and if its grammer is valid.
// Lexical Enviroment: Where something sits physically in the code you write.
// Execution Context: A wrapper to help manage the code that is currently running.
// Creation Phase: when the browser sets up memory space for variable and function which is called "Hoisting".
// Execution Phase: when it executed the code line by line how it was written.
// Name/Value Pairs: A name which maps to a unique value.
// Object: a collection of name/value pairs.
// Single Threaded Behavior: One command at a time.
// Synchronous Execution: One line at a time.
// Function Invocation: Running a function is invocing a function.
// variable Enviorment: Where the variables live.
// Scope: Where a variable is available in your code.
// Asynchronous: More than one at a time.
// Dynamic Typing: You dont tell the engine what type of data a variable holds, if figures it out while your code is running.
// Primitive Type: A type of Data that represents a single value.
// Operator Precedence: which operator function gets called first.
// Operator Associativity: what order operator functions get called in: left-to-right or right-to-left.
// Coercion: Converting a value from one type to another.
// Namespace: A container/holder for variables and functions.
// First Class Functions: Everything you can do with other types you can do with functions.
// Expression: A unit of code that results in a value.
// By value: Copy of a value and pasing it to it.
// By Reference: values set to an Objects will point to the same address in memory.
// Mutate: to change something.
// Immutable: means it can't be changed.
// Argumanets: The parameters you pass to a function.
// Inheritance: One object gets access to the properties and methods of another object.
// Reflection: An object can look at iself, listing and changing its properties and methods.
// Function constructor: A normal function used to construct object, which creates a new this variable tht points to the new object.

// global variable
var v = 'Global variable';
console.log(window.v);

// Associotivity Examnple
var a1 = 2, a2 = 3, a3 = 4;

a1 = a2 = a3;
console.log(a1);
console.log(a2);
console.log(a3); // all are the same value, and since = operator's associotivity is right to left the result is then explained.

// Coercion Example
var c1 = 1 + '00';
console.log(c1);

console.log(3 < 2 < 1); // the < associotivity is left to right and gets performed one operator at a time. 

// Hoisting tricky example
 var salary = "$1000";
 (function () {
     console.log("Original salary was " + salary);
     var salary = "$5000";
     console.log("My New Salary " + salary);
 })();

// The 'this' variable example
var c = {
    name: 'Amir',
    log: function() {
        this.name = 'changed name';
        console.log(this);
        
        var changeName = function(newName) {
            this.name = 'changed name again';
        }.call(this); // call invoces the function and keeps the current context by passing the this variable in to the function.
    }
}

c.log();

// function clousure example
function greets(hi) {
    return function(name) {
        console.log(hi + ' ' + name);
    }
}

greets('Hello')('Amir');
var sayHi = greets('Hola');
sayHi('Jose');


// without a clousure
function buildFunctions() {
    var arr = [];
    for (var i = 0; i < 3; i++) {
        arr.push( function() {
                return console.log(i);
            }
        );
    }
    console.log(arr);
    return arr;
}

var fs = buildFunctions();
fs[0]();
fs[1]();
fs[2]();

// with a clousure now and then the code works now as expected.
function buildFunctions1() {
    var arr = [];
    for (var i = 0; i < 3; i++) {
        arr.push(
            (function(j) {
                return function() {
                    console.log(j);
                }
            }(i))
        );
    }
    return arr;
}

var fs = buildFunctions1();
fs[0]();
fs[1]();
fs[2]();

// function factory example
function makeGreeting(lang) {
    return function (firstname, lastname) {
        if (lang === 'en') {
            console.log('Hello ' + firstname + ' ' + lastname );
        }
        
        if (lang === 'es') {
            console.log('Hola ' + firstname + ' ' + lastname );
        }
    }
}

var greetEnglish = makeGreeting('en');
var greetSpanish = makeGreeting('es');
greetEnglish('Amir', 'Arafat');
greetSpanish('Amir', 'Arafat');


// closures and callbacks
function sayHiLater() {
    var greeting = 'Hi!';
    
    setTimeout(function() {
        console.log(greeting);
    }, 3000);
}

sayHiLater();

function callBackExample(callback) {
    var l = 0;
    var t = "Some String";
    
    callback(l, t);
}

callBackExample(function(l, t) {
   console.log('all done! Here is l: ' + l + ' and t: ' + t);
});

//Apply, Call, Bind examples
var person = {
    firstname: 'Amir',
    lastname: 'Arafat',
    
    getFullName: function() {
        var fullname = this.firstname + ' ' + this.lastname;
        
        return fullname;
    }
}

var logName = function(lang1, lang2) {    
    console.log('Logged: ' + this.getFullName());
    console.log('Arguments: ' + lang1 + ' ' + lang2);
    console.log('-------------------------------------------');
};
var logPersonName = logName.bind(person);
logPersonName('en', 'es');
logName.call(person, 'en', 'es');
logName.apply(person, ['en', 'es']);

(function(lang1, lang2) {    
    console.log('Logged: ' + this.getFullName());
    console.log('Arguments: ' + lang1 + ' ' + lang2);
    console.log('-------------------------------------------');
}).apply(person, ['Ar', 'es']);

// function borrowing
var person2 = {
    firstname: 'John',
    lastname: 'Doe'
}

console.log(person.getFullName.apply(person2));

// function currying
function multiply(a, b) {
    return a * b;
}

var multiplyByTwo = multiply.bind(this, 2);
console.log(multiplyByTwo(10));


// Functional Programming
function mapForEach(arr, fn) {
    var newArr = [];
    for (var i = 0; i < arr.length; i++) {
        newArr.push(fn(arr[i]))
    };
    return newArr;
}

var arr1 = [1,2,3];
console.log(arr1);

var arr2 = mapForEach(arr1, function(item) {
   return item * 2; 
});

console.log(arr2);

var arr3 = mapForEach(arr1, function(item) {
   return item > 2; 
});
console.log(arr3);

var checkPastLimit = function(limiter, item) {
    console.log(limiter, item);
    return item > limiter;
}

var arr4 = mapForEach(arr1, checkPastLimit.bind(this, 1));
console.log(arr4);

var checkPastLimitSimple = function(limiter) {
    return function(limiter, item) {
        return item > limiter;
    }.bind(this, limiter);
}

var arr5 = mapForEach(arr1, checkPastLimitSimple(2));
console.log(arr5);

//Underscore example of functional programming
var arr6 = _.map(arr1, function(item){ return item * 3 });
console.log(arr6);

var arr7 = _.filter([1,2,3,4,5,6,7,8,9,10,11,12,13,14], function(item){ return item % 2 === 0 })
console.log(arr7);

// Prototypal Inheritance
var contact = {
    firstname: 'default',
    lastname: 'default',
    getFullName: function() {
        return this.firstname + ' ' + this.lastname;
    }
}

var john = {
    firstname: 'John',
    lastname: 'Doe'
}

john.__proto__ = contact; // this is bad practice but shows the prototype object and how we can add to it.
console.log(john.getFullName());

for (var prop in john) {
    if (john.hasOwnProperty(prop)){ // hasOwnProperty will only return the object props not the prototype ones as well.
        console.log(prop + ': ' + john[prop]);
    }
}

var jane = {
    address: '111 main st.',
    getFormalFullName: function() {
        return this.lastname + ', ' + this.firstname;
    }
}

var jim = {
    getFirstName: function() {
        return firstname;
    }
}

// reflection example from undersore using extend
_.extend(john, jane, jim);
console.log(john);

// Building Objects and Function constructors and 'new'.
// Use Capital name when using function constructors to know that you need to use the new key word.
function Animals(name1, name2) {
    this.dog = name1;
    this.cat = name2;        
}

Animals.prototype.getAllPets = function() {
    return this.dog + ', ' + this.cat;
}

var pets = new Animals('sam', 'buttons'); // changes the execution context to a new object and then this changes to the object not the window.
var pets2 = new Animals('bingo', 'spider'); 
console.log(pets);
console.log(pets2);
console.log(pets.getAllPets());
console.log(pets2.getAllPets());

// Using prototypes instead of including functions directly in the function constructor saves lots of space because it creates the function or method once 
// instead of having it coppied everywhere the object gets created.

//Built in function constructors in JS
var fc1 = new Number(5);
var fc2 = new String("test");
var fc3 = new Date('12/10/1987');
console.log(fc1, fc2, fc3);

// adding additional feature to the string Function Constructor but bad for comparisons and math.
String.prototype.isLengthGreaterThan = String.prototype.isLengthGreaterThan || function(limit) {
    return this.length > limit;
}

String.prototype.repeatify = String.prototype.repeatify || function(times) {
    var str = "";
    for (var i = 0; i < times; i++) {
        str += this;
    }
    
    return str;
}

console.log("John Doe".isLengthGreaterThan(30));
console.log("Hello".repeatify(3));

//Arrays and for in don't use together instead use for loop.
Array.prototype.myCustomFeature = 'cool!'
var arr = ['John', 'Jane', 'Jim'];

for (var prop in arr) {
    console.log(prop + ': ' + arr[prop]);
}

// Pure prototypal inheritance and Object.create in modern browsers ie9+, ff4.0+, Chrome & Safari 5+
//Object.create Pollyfill
if (typeof Object.create != 'function') {
  Object.create = (function() {
    var Temp = function() {};
    return function (prototype) {
      if (arguments.length > 1) {
        throw Error('Second argument not supported');
      }
      if(prototype !== Object(prototype) && prototype !== null) {
        throw TypeError('Argument must be an object or null');
     }
     if (prototype === null) { 
        throw Error('null [[Prototype]] not supported');
      }
      Temp.prototype = prototype;
      var result = new Temp();
      Temp.prototype = null;
      return result;
    };
  })();
}

var lunchMeal = {
    sandwich: 'Philly Cheese Steak',
    drink: 'Coke',
    createMeal: function() {
        return 'I am eating a ' + this.sandwich + ' with a ' + this.drink;
    }
};

var meal = Object.create(lunchMeal);
meal.sandwich = "Turkey Sandwich";
meal.drink = "Sprite";
console.log(meal);

// ES6 Class and how it creates Objects
class Weekend {
    constructor(day1, day2) {
        this.day1 = day1;
        this.day2 = day2;
    }
    
    getWeekend() {
        return 'The weekend is ' + this.day1 + ' and ' + this.day2; 
    }
}

var party = new Weekend('Saturday', 'Sunday');
console.log(party.getWeekend());
// Use Extends to set the prototype to another object


// typeof and instanceof and the different ways they work
var a = 3;
console.log(typeof a);

var b = "Hello";
console.log(typeof b);

var c = {};
console.log(typeof c);

var d = [];
console.log(typeof d); // weird!
console.log(Object.prototype.toString.call(d)); // better!

function Person(name) {
    this.name = name;
}

var e = new Person('Jane');
console.log(typeof e);
console.log(e instanceof Person);

console.log(typeof undefined); // makes sense
console.log(typeof null); // a bug since, forever...

var z = function() { };
console.log(typeof z);





















































