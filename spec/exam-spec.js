const exam = require('../exam');

//Import functions for testing
const curry = exam.curry;
const compose = exam.compose;
const compose_ = exam.compose_;
const replace  = exam.replace;
const id = exam.id;
const memoize = exam.memoize;
const map = exam.map;
const match = exam.match;
const filter = exam.filter;
const prop = exam.prop;

describe("Replace function passing test", function(){
    //Body of test, all setup should occur here
    let replace_i = replace(/i/g, '*');
    let replace_applied = replace_i("This is an example sentence!");
    it("Should replace the i characters in the sentence with * characters", function(){
       //The assertion block all expectations should occur here
       expect(replace_applied).toBe("Th*s *s an example sentence!");
    });
});

describe("Replace function failing test", function(){
    let replace_i = replace(/i/g, '*');
    let replace_applied = replace_i("This is an example sentence!");
    it("Should replace the i characters in the sentence with * characters", function(){
       expect(replace_applied).not.toBe("This is an example sentence!");
    });
});

describe("Compose function test", function(){
    let sentence = "how exciting";
    let upper = (i)=>{
      return i.toUpperCase();
    }
    let exclaim = (i)=>{
      return  i + '!';
    }
    let shout = compose(exclaim, upper);
    let shoutThisString = shout(sentence);
    
    it("Should show result of sentence being passed into upper & exclaim functions", function(){
        expect(shoutThisString).toBe("HOW EXCITING!");
    });
});

describe("Example of currying test", function(){
    let add = x => y => x + y;
    let addOne = add(1);
    let addTen = add(10);
    it("Should partially apply the functions", function(){
        expect(typeof addOne).toBe("function");
        expect(addOne(7)).toBe(8);
        expect(typeof addTen).toBe("function");
        expect(addTen(1)).toBe(11);
    });
});

describe("Curry function test", function(){
    let string1 = "This is the first string.";
    let string2 = "Lets hope this works!";
    let someCallback = (i, j) => {
        i.toString();
        return i + " " + j;
    }
    let curriedCallback = curry(someCallback);
    let callbackWithOneArg = curriedCallback(string1);
    let fullCallback = callbackWithOneArg(string2);
    let finalString = someCallback(string1, string2);
    it("Should show that callback called with one argument returns a function", function(){
        expect(typeof callbackWithOneArg).toBe("function");
        expect(callbackWithOneArg).not.toBe(finalString);
        expect(fullCallback).toBe(finalString);
    });
});

describe("Simple compose test", function(){
    let func1 = (num) => {
        return num / 7;
    };
    let func2 = (num) => {
        return num + 10;
    };
    let firstCompose = compose_(func1, func2);
    let secondCompose = compose_(func2, func1);
    let firstAnswer = firstCompose(7);
    let secondAnswer = secondCompose(7);
    it("Should show simple compose evaluates differently depending on argument order.", function(){
        expect(firstAnswer).not.toBe(secondAnswer);
    });
});

describe("Map function test", function(){
    let stringOnlyFunction = (someString) => { return "***" + someString.toUpperCase() + "***"};
    let nowItWorksOnArrays = map(stringOnlyFunction);
    let pokemonReference = ["team", "rocket's", "blasting", "off", "again"];
    let justicePrevails = nowItWorksOnArrays(pokemonReference);
    it("Should show function is applied to every element in array", function(){
        expect(justicePrevails).not.toBe(false);
        //Note that the type of justice prevails may not be reported as an array
        expect(typeof justicePrevails).toBe("object");
        expect(justicePrevails[0]).toBe("***TEAM***");
    });
});

describe("Filter function test", function(){
    let someArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    let onlyEvens = [0, 2, 4, 6, 8];
    let someCallback = (i) => { return i % 2 == 0};
    let filterCriteria = filter(someCallback);
    let filteredArray = filterCriteria(someArray);
    it("Should return an array with only even numbers", function(){
        //Use to Equal to check for deep equality, i.e. check the actual values in array.
        expect(filteredArray).toEqual(onlyEvens);
    });
});