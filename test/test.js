var fs = require("fs"),
    assert = require("assert"),
    md2json = require("../");

fs.readFile("test.md","utf8",function(err,data){

  assert.deepEqual(err,null,"File error");

  var dict = md2json(data,{
    boolean: ["isShredderGood","isShredderEvil","pizzaIsDelicious"],
    html: ["Link"]
  });

  assert.deepEqual(dict.Leonardo,"leads","Parsing error.");
  assert.deepEqual(dict.Donatello,"does machines","Parsing error.");
  assert.deepEqual(dict.Rafael,"cool but rude","Parsing error.");
  assert.deepEqual(dict.Michaelangelo,"party dude","Parsing error.");
  assert.deepEqual(dict.isShredderGood,false,"Parsing error.");
  assert.deepEqual(dict.isShredderEvil,true,"Parsing error.");
  assert.deepEqual(dict.pizzaIsDelicious,true,"Parsing error.");
  assert.deepEqual(dict.Link,"<a href=\"http://en.wikipedia.org/wiki/Teenage_Mutant_Ninja_Turtles\">Wikipedia</a>","Parsing error.");



});