// function clousure example

function buildFinctions() {
    
    var arr = [];
    
    for (var i = 0; i < 3; i++) {
        arr.push( function() {
                return console.log(i);
            }
        );
        
    }
    return arr;
}

var fs = buildFinctions();

fs[0]();
fs[1]();
fs[2]();

function buildFinctions1() {
    
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

var fs = buildFinctions1();

fs[0]();
fs[1]();
fs[2]();



//function factory example

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
    var t = "afew";
    
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
    console.log('-------------------');
};
var logPersonName = logName.bind(person);
logPersonName('en', 'es');
logName.call(person, 'en', 'es');
logName.apply(person, ['en', 'es']);

(function(lang1, lang2) {    
    console.log('Logged: ' + this.getFullName());
    console.log('Arguments: ' + lang1 + ' ' + lang2);
    console.log('-------------------');
}).apply(person, ['Ar', 'es']);

// function borrowing

var person2 = {
    firstname: 'Amir',
    lastname: 'Arafat'
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
    return item > limiter;
}

var arr4 = mapForEach(arr1, checkPastLimit.bind(this, 1));
console.log(arr4);

var checkPastLimitSimple = function(limiter) {
    return function(limiter, item) {
        return item > limiter;
    }.bind(this, limiter);
}

var arr5 = mapForEach(arr1, checkPastLimitSimple(3));
console.log(arr5);




























