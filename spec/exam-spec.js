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
    it("Calling curry on function without arguments should return ", function(){
        expect(typeof callbackWithOneArg).toBe("function");
        expect(callbackWithOneArg).not.toBe(finalString);
        expect(fullCallback).toBe(finalString);
    });
});