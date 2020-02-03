'use strict';

//Identity function
const id = x => x;

function curry(fn) {
    const arity = fn.length;

    return function $curry(...args) {
        if(args.length < arity){
            return $curry.bind(null, ...args);
        }

        return fn.call(null, ...args);
    }
}

//f and g are functions, x is data piped through
const compose_ = (f, g) => x => f(g(x));
//fun1, fun2 into data, data into fun2 eval data func1 eval func2...runs right to left

const compose = (...fns) => (...args) => fns.reduceRight((res, fn) => [fn.call(null, ...res)], args)[0];

function memoize(fn) {
    let memo = {};
    let slice = Array.prototype.slice;
    return function() {
        var args = slice.call(arguments);
        if(args in memo) {
            return memo[args];
        } else {
            return (memo[args] = fn.apply(this, args));
        }
    }
}

const curryingExample = () => {
    const add = x => y => x + y;
    const increment = add(1);
    const addTen = add(10);
    console.log(increment(2));
    console.log(addTen(2));
    return "Successful currying of add function.";
}

//First argument is the regular expression the second argument is the string we want to check against
const match = curry((what, s) => s.match(what));
const replace = curry((what, replacement, s) => s.replace(what, replacement));
const filter = curry((f, xs)=> xs.filter(f));
const map = curry((f, xs) => xs.map(f));
const prop = curry((property, object) => object[property]);


//When assigned to a varible with the first parameter, the variable can be called again with the second
const hasLetterR = match(/r/g);
const hasLetterB = match(/b/);

//First argument of filter is some function criteria, the second is some array
const filtered = filter(hasLetterB);
let bulbasaur = ['bulbasaur', 'ivysaur', 'venasaur'];
let charmander = ['charmander', 'charmeleon', 'charizard'];
let myStarter = filtered(bulbasaur);

const filteredExample = () => {
    console.log("Unapplied curried filter: " + bulbasaur);
    console.log("Applied curried filter: " + myStarter);
}

let upper = (i)=>{ return i.toUpperCase()};
let capitalizeFun = map(upper);
let myEvolution = capitalizeFun(charmander);

const mappedExample = () => {
    console.log("Unapplied curried map: " + charmander);
    console.log("Applied curried map: " + myEvolution);
}

const composeExample1 = ()=> {
    const louder = x => x.toUpperCase();
    const exclaim = x => x + '!';
    const shout = compose(exclaim, louder);
    console.log('Execution of composed functions do not matter here');
    return shout('this is proof');
}

const composeExample2 = () => {
    const firstElem = x => x[0];
    const reverse = Array.prototype.reduce((acc, x) => [x].concat(acc), []);
    const lastElem = compose(firstElem, reverse);
    let bruce = ['yippie', 'kay', 'yay'];
    console.log('The composed function reverse should be called before the first elem function');
    return lastElem(bruce);
}

const composeExample3 = () => {
    const upperfoo = word => word.toUpperCase();
    const breakup = word => word.split(' ');
    const bar = word =>  '***** ' + word + ' *****';
    //Without the mapping of bar, the function breaks because bar works only on a single string
    const map_bar = map(bar);
    const upperbreaks = compose(map_bar, compose(breakup, upperfoo));
    console.log('This is amazing!');
    console.log(upperbreaks('oh my goodness !!!!'));
}

const replaceExample1 = () => {
    const target_s = replace(/s/g);
    const replace_s_with_e = target_s('*');
    const elegant_string_replacement = replace_s_with_e('This is the string example singular s...');
    //Notice no need to invoke the function.
    console.log(elegant_string_replacement);
}

const replaceExample2 = () => {
    //Here providing two arguments to the function.
    const censor_i = replace(/i/g, '*');
    const sentence_killzone = censor_i('This is the string example singular s...');
    console.log(sentence_killzone);
}

const replaceExample3 = () => {
    //You could compose forever, different functions operating on strings.
    const censor_i = replace(/i/g, '*');
    const censor_s = replace(/s/g, '*');
    const annihilateSentence = compose(censor_i, censor_s);
    console.log(annihilateSentence("This is the string example singular s..."));
}

//For debugging we can use the impure trace function:
const trace = curry((tag, x) => {
    //The tag is some string you provide on call 
    //and the x is the parameter passed in to abstracted function 
    console.log(tag, x);
    return x;
  });
  
module.exports = {
    id,
    curry,
    compose,
    compose_,
    memoize,
    match,
    replace,
    filter,
    map,
    prop
}