# HMJS API Documentation

**Tip**: If there is any confusion, read the source code, src/hmjs.js. It's easy to read, and has javadoc style function comments! :) Yay!

## jQuery functions

### .insertView()

``.insertView(template_name [string], data [object](optional), onReady [function](optional))``

Replaces contents of selected element with rendered template. Similar to <code>$.html()</code>. 

Examples:

```JS
$('body').insertView('welcome', {name: "John"});
$('body').insertView('welcome', {name: "John"}, function(data,vm){
    vm.foo(); //some arbitrary method
    var $scope = this; //jQuery selector object
    console.log(data); // the same name param. outputs: {name: "John"}
});
```

<code>onReady</code> is optional, and accepts a callback. This callback is called with two parameters:
<code>data</code>, <code>vm</code>. <code>vm</code> is whatever is returned by the ViewModel, if found. Ideally,
this would be an object, representing the API to that ViewModel instance.
If there is no matching ViewModel found for this template, then
<code>vm</code> will be <code>undefined</code>. This callback will fire when:

1. The node is ready for manipulation in the DOM
2. The ViewModel, if found, has returned/exited.

### .appendView()

``.insertView(template_name [string], data [object](optional), onReady [function](optional))``

Appends rendered template to the selected element. Similar to <code>$.append()</code>. Examples and signature exactly the same as <code>.insertView()</code>

### .prependView()

``.prependView(template_name [string], data [object](optional), onReady [function](optional))``

Prepends rendered template to the selected element. Similar to <code>$.prepend()</code>. Examples and signature exactly the same as <code>.insertView()</code>

### .beforeView()

``.beforeView(template_name [string], data [object](optional), onReady [function](optional))``

Inserts rendered template before the selected element. Similar to <code>$.before()</code>. Examples and signature exactly the same as <code>.insertView()</code>

### .afterView()

``.afterView(template_name [string], data [object](optional), onReady [function](optional))``

Inserts rendered template after the selected element. Similar to <code>$.after()</code>. Examples and signature exactly the same as <code>.insertView()</code>

## HM Object

### HM.add()

``HM.add(templates [object], replace [bool](optional))``

Adds (or replaces) one or more templates. Templates are parsed for performance. If <code>replace</code>
is true, than templates with the same name/key are overwritten.

Example:

```JS
HM.add({"welcome":"<div>Hi, {{name}}!</div>"});
```

### HM.clear()

``HM.clear()``

Clears the stored templates.

### HM.exists()

``HM.exists(template_name [string])``

Returns true if template with key <code>template_name</code> exists.

Example:

```JS
HM.exists('welcome'); //returns true or false
```

### HM.getTemplates()

``HM.getTemplates()``

Returns the stored templates object.

### HM.setViewModels()

``HM.setViewModels(viewmodels [object])``

Sets the viewmodels object to be used. Properties (functions) that match the template name will be instantiated
with the <code>new</code> keyword when inserted with <code>HM.insert()</code> or any of the jQuery helper functions.

### HM.render()

``HM.render(template_name [string], data [object])``

Returns the rendered template HTML. You will probably rarely use this function. It returns M.render() from Mustache
directly.

Example:

```JS
HM.render('welcome', {name: 'John'}); //returns rendered HTML
```

### HM.insert

``HM.insert($destination [jQuery], template_name [string], data [object](optional), onReady [function](optional), insertionMethod [function](optional))``

You probably will never use this function directly, for advanced usage only. It is recommended you use
the jQuery helper functions instead. Renders template and inserts into DOM. Listens for DOM event, and when handled, calls callback and
any available ViewHelper, within the lexical scope of the template and with data. Calls the ViewModel first,
and then callback.

See source code for example usage.

## See also

- [Getting Started](getting_started.md)
- [Introduction](README.md)