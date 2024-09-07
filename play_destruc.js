//?Destructuring objects and arrays
//Sept 2024

const person={
    name: 'John',
    age: 24,
    hobbies:[ 'reading', 'cooking'],
    greet: function() {
        console.log('Hello, my name is' + this.name + ' and I am'+ this.age+ 'years old.');
    }
}

// When to use destructuring?
//Destructuring is useful when you only need a specific propertry of an object

// regular function
// regular passing of object
// even though we are passing the whole object, we are only using the name property
// const printName = (personData) => {
    //}

const printName({ name }) => {
    console.log ("Hello, my name is ${name}. ");
}

printName(person);

// If we are only interested in the name proerty of an object, we can use destructuring
//destructuring the object
// const PrintName = ({name}) => {
    // console.log(name);
  //  }

  //We pass the object as an argument to the function
  printName (person);

  const {name, age } = person;
  console.log( name, age);

  // destructuring arrays
  const hobbies = {'reading', 'cooking'};
  const [hobby1, hobby2]= hobbies;
  console.log(hobby1, hobby2);

  /*Reminders when using destructuring;
  - The property name must match the object property name.
  -The property name must be enclosed in curly braces
  -The property name must be followed by a color
*/