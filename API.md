# HMJS Usage & API

**Tip**: If there is any confusion, read the source code, src/hmjs.js. It's easy to read, and has javadoc style function comments! :) Yay!

## HM Object

### HM.add()

``HM.add(templates [object], replace [bool] (optional))``

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

``HM.insert($destination [jQuery], template_name [string], data [object] (optional), onReady [function] (optional), insertionMethod [function] (optional))``

You probably will never use this function directly, for advanced usage only. It is recommended you use
the jQuery helper functions instead. Renders template and inserts into DOM. Listens for DOM event, and when handled, calls callback and
any available ViewHelper, within the lexical scope of the template and with data. Calls the ViewModel first,
and then callback.

See source code for example usage.

### jQuery functions

These are meant to be run on a jQuery set of matched elements. For example, $('body').appendView('test');

<table width="100%">
<tr>
    <th>Method</th>
    <th>Description</th>
</tr>
<tr>
    <td><code>.insertView()</code></td>
    <td></td>
</tr>
<tr>
    <td><code>.prependView()</code></td>
    <td></td>
</tr>
<tr>
    <td><code>.appendView()</code></td>
    <td></td>
</tr>
<tr>
    <td><code>.beforeView()</code></td>
    <td></td>
</tr>
<tr>
    <td><code>.afterView()</code></td>
    <td></td>
</tr>
</table>