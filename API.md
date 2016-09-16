# HMJS Usage & API

**Tip**: If there is any confusion, read the source code, src/hmjs.js. It's easy to read, and has javadoc style function comments! :) Yay!

## HM Object

``HM.add(templates [object], replace [bool] (optional))``

Adds (or replaces) one or more templates. Templates are parsed for performance. If <code>replace</code>
is true, than templates with the same name/key are overwritten.

``HM.render(template_name [string], data [object])``

Returns the rendered template HTML.

``HM.insert($destination [jQuery], template_name [string], data [object] (optional), onReady [function] (optional), insertionMethod [function] (optional))``

You probably will never use this function, as it is for advanced usage only. It is recommended you use
the jQuery helper functions instead (see below). Renders template and inserts into DOM. Listens for DOM event, and when handled, calls callback and
any available ViewHelper, within the lexical scope of the template and with data. Calls the ViewModel first,
and then callback.



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