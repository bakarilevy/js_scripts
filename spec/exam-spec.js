const exam = require('../exam');
const jasmine = require('jasmine');

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

describe("Replace function test passing test", function(){
    it("Should replace the i characters in the sentence with * characters", function(){
        //Body of test, all setup should occur here at the end call the assertion
        let replace_i = replace(/i/g, '*');
        let replace_applied = replace_i("This is an example sentence!");
       // expect(replace_applied).toBe("Th*s *s an example sentence!");
       expect(replace_applied).toBe("Th*s *s an example sentence!");
    });
});

describe("Replace function failing test", function(){
    it("Should replace the i characters in the sentence with * characters", function(){
        //Body of test, all setup should occur here at the end call the assertion
        let replace_i = replace(/i/g, '*');
        let replace_applied = replace_i("This is an example sentence!");
       // expect(replace_applied).toBe("Th*s *s an example sentence!");
       expect(replace_applied).not.toBe("This is an example sentence!");
    });
});
