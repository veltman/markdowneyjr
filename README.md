md2json
=======

A quick markdown-to-JSON parser for somewhat easier copy editing.  Pass a markdown string like this:

    ```
      This is a comment. This will be ignored.
    ```

    # First Name
    John

    # Last Name
    Doe

    # Whitespace


    Does not matter.

And get back something like this:

    {
      "First Name": "John",
      "Last Name": "Doe",
      "Whitespace": "Does not matter."
    }

## Installation

Install via `npm`:

```
npm install md2json
```

## Usage

### md2json(markdownText[,options])

```js
var md2json = require("md2json");

var dict = md2json(myMarkdown,myOptions);
```

## Options

You can pass an array of `boolean` and/or `html` fields.

`boolean` fields will come back as true/false.  They will be false unless the trimmed contents are the word `true` or `yes`, case-insensitive.

`html` fields will come back with their HTML contents preserved instead of the text only.

```
# Content

I want to preserve [this link](http://ilovealpacas.com).

# Alpacas

yes

# Name

Noah

# Bolding

I want to discard this **bolding.**
```

```js
var dict = md2json(myMarkdown,{
  boolean: ["Alpacas"],
  html: ["Content"]
});

console.log(dict);
```

```
{
  Content: 'I want to preserve <a href="http://ilovealpacas.com">this link</a>.',
  Alpacas: true,
  Name: 'Noah',
  Bolding: 'I want to discard this bolding.'
}
```
