markdowneyjr
============

A quick markdown-to-JSON parser for somewhat easier copy editing.  Pass a markdown string like this:

```
` This is a comment. This will be ignored.

# First Name
John

# Last Name
Doe

# Whitespace


Does not matter.
```

And get back something like this:

```json
{
  "First Name": "John",
  "Last Name": "Doe",
  "Whitespace": "Does not matter."
}
```

## Installation

Install via `npm`:

```
npm install markdowneyjr
```

## Usage

### markdowneyjr(markdownText[,options])

```js
var markdowneyjr = require("markdowneyjr");

var dict = markdowneyjr(myMarkdown,myOptions);
```

## Comments

Any line that starts with one tick mark (`) will be discarded as a comment.

## Nesting

You can also nest values:

```
# Name

## First
John

## Last
Doe
```

```
{
  "Name": {
    "First": "John",
    "Last": "Doe"
  }
}
```

## Options

You can pass an array of `boolean` and/or `html` fields.

`boolean` fields will turn a string into true/false.  They will be false unless the trimmed contents are the word `true` or `yes`, case-insensitive.

`html` fields will come back with HTML contents preserved instead of the text only.

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
var dict = markdowneyjr(myMarkdown,{
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

These options currently work based on field name only, so if you have nested options it will apply on any key with that name and a string value, regardless of depth.  Use with caution.