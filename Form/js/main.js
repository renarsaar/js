   /*multiline comment*/
   
   // CONSOLE.LOG('Hello World');
    // console.warn('This is a warning');
    // console.error('This is an error');

//(var(global)), let, const
// with const age can't be reassigned
// const and let = use const if you know you are not going to change the value
    // let age = 30;
    // age = 42;
    // console.log(age);

// Data types = string, numbers, boolean, null, undefined, (symbol)
    // const name = 'Renar'; //string, starts with ''
    // const age = 24; //number
    // const rating = 4.5; //number also
    // const isCool = true; //boolean, true or false
    // const x = null; //null, means empty
    // const y = undefined; //undefined
    // let z; //also undefined
// We can check the type in console log=
    // console.log(typeof z);

// Data types = strings // Concatenation, older way
    // console.log('My name is ' + name + ' and age is ' + age);
// Data types strings // Template strings, newer, ES2015
    // console.log(`My name is ${name} and I am ${age}`);
    // const hello = `My name is ${name} and I am ${age}`;
    // console.log = (hello);
    // const s = 'it, technology, computers, code';
        // console.log(s.lenght); lenght does not need()
        // console.log(s.toUpperCase());
        // console.log(s.toLowerCase());
        // console.log(s.substring(0, 5).toUpperCase())
        // console.log(s.substring(0, 5))
    // console.log(s.split(''));
    // console.log(s.split(', '));

// Arrays - variables that hold multiple values
// const with a constructor = new
    //const numbers = new Array(1,2,3,4,5,6);
    //console.log(numbers);
// const with brackets = can have diff data types
    // const fruits = ['apples', 'oranges', 'pears', 'bananas', 10, true];
    // fruits[6]= 'grapes';
    // fruits.push('strawberries', 'mangos');
    // fruits.unshift('pepper');
// pop removes last element from the array
    // fruits.pop();
// Pushing to the end = push and to the beginnind = unshift
// isArray check if something is inside the array then=true answer
    // console.log(Array.isArray(fruits));
    // console.log(fruits.indexOf('pears'));
    // console.log(fruits);

    // const person = {
    //     firstname: 'Renar',
    //     lastname: 'Saaremets',
    //     age: '24',
    //     hobbies: ['swimming', 'books', 'motorcycles'],
    //     address: {
    //         street: 'kopli 60',
    //         city: 'Tallinn',
    //         country: 'Estonia',
    //     }
    // }

    // console.log(person.address.city);
    // const {firstname, age, address} = person;
    // console.log(address);

    // person.email = "renar@gmail.com";
    // age = '333';
    // console.log(age);

// Array of todos

    // const todos = [   // ARRAY(bc multiple values=collection of variables) NAME ={}    //if 1 value then variable
    //     {
    //         id: 1,  //  VALUE: DATATYPE    x3
    //         text: 'Take out trash',
    //         iscompleted: true
    //     },
    //     {
    //         id: 2,
    //         text: 'Meet with boss',
    //         iscompleted: true
    //     },
    //     {
    //         id: 3,
    //         text: 'Dent appt',
    //         iscompleted: false
    //     },
    // ]


//  Object
// Select from an array / Select from an object
// console.log(todos[1].text);

// JSON(is data format, sending data to a server) convert to json string
// JSON string
    // const todoJSON = JSON.stringify(todos);
    // console.log(todoJSON);


// For loops

// for(let i = 0; i <= 10; i++){
//     console.log(`For loop number: ${i}`);
// }

// // While loop
// let i = 0;
// while(i <= 10) {
//     console.log(`While loop number: ${i}`);
//     i++;
// }



// const todos = [   // ARRAY(bc multiple values=collection of variables) NAME ={}    //if 1 value then variable
//     {
//         id: 1,  //  VALUE: DATATYPE    x3
//         text: 'Take out trash',
//         iscompleted: true
//     },
//     {
//         id: 2,
//         text: 'Meet with boss',
//         iscompleted: true
//     },
//     {
//         id: 3,
//         text: 'Dent appt',
//         iscompleted: false
//     },
// ]

    // for(let i = 0; i <= todos.lenght; i++){
    //     console.log(todos[i].text);
    // }

    // for(let todo of todos) {
    //     console.log(todo.id, todo.iscompleted);
    // }

// forEach, map, filter= High order array

// const todoCompleted = todos.filter(function(todo) {
//         return todo.iscompleted === true;
//     }).map(function(todo){
//         return todo.text;
//     })

// console.log(todoCompleted);

// Statements 
// || = or(1 needs to be true) / && = and (both need to be true)
// ? = then
// : = else

    // const x = 6;
    // const y = 11;

    // if ( x > 5 && y > 10 ) {
    // console.log("x is more than 5 or y is more than 7");
    // } 

// turnery operator = different condition markings
    // const x = 10;
    // const color = 'green';
// switches

// switch(color) {
//     case'red':
//         console.log(`Color is red`);
//         break;
//     case 'blue':
//         console.log('Color is red');
//         break;
//     default:
//         console.log('Color is NOT red or blue');
// }


// Functions
// Before ES2015
    // function addnums(num1 = 1, num2 = 1) {
    //     return num1 + num2;
    // }
    // console.log(addnums(5, 5));

// After ES2015
//    const addnums = (num1, num2) => {
//     return num1 + num2;
//    }
//    console.log(addnums(5, 5));
// or ...... 
// const addNums = (num1, num2) => num1 + num2;

// console.log(addNums(5, 5));



// Object oriented programming
// Constructor function
// firstname error
// Before E6
    // function Person(firstName, lastName, dob) {
    //     this.firstName = firstname;
    //     this.lastName = lastName;
    //     this.dob = Date(dob);
    // }

// Class
    class Person{
        constructor(firstname, lastName, dob){
            this.firstName = firstname;
            this.lastName = lastName;
            this.dob = Date(dob);
        }
        getBirthYear(){
            return this.dob.getFullYear();
        }

        getFullName(){
            return `${this.firstname} ${this.lastName}`;
        }
    }


// Instantiate object

const person1 = new Person('Renar', 'Saaremets', '20-2-1995');
const person2 = new Person('Mart', 'Viira', '16-4-1996');
console.log(person1);


















