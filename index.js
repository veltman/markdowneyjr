var marked = require("marked"),
    extend = require("extend"),
    cheerio = require("cheerio");

// All fields string by default
var defaults = {
  "boolean": [],
  "html": []
};

module.exports = function(markdown,options) {

  // Markdown parsing, loading, default options
  var html = marked(markdown),
      $ = cheerio.load("<body>" + html + "</body>"),
      options = extend({},defaults,options),
      dict = {};

  // remove comments
  $("body > pre").remove();

  // FOr each header, get the key and the subsequent tags until the next h1
  $("body > h1").each(function(){
    var key = $(this).html().trim(),
        value;

    // Get the subsequent tags (probably <p> tags)
    value = $(this).nextUntil("h1").map(function(){

      // Return text by default
      if (options.html.indexOf(key) < 0) {
        return $(this).text().trim();
      }

      // Return raw HTML
      return $(this).html();

    }).get();

    // If there were multiple paragraphs
    if (value.length > 1) {
      // Join with a space if not an HTML field
      if (options.html.indexOf(key) < 0) {
        value = value.join(" ");
      } else {
        // Wrap as <p> tags
        value = value.map(function(p){
          return "<p>"+p+"</p>";
        }).join("");
      }
    } else {
      value = value[0];
    }

    dict[key] = value;

  });

  // Convert boolean fields if they match "yes" or "true"
  options.boolean.forEach(function(booleanField){

    if (dict[booleanField] && dict[booleanField].replace(/[^a-z]/gi,"").match(/^(yes|true)$/i)) {
      dict[booleanField] = true;
    } else {
      dict[booleanField] = false;
    }

  });

  return dict;

};