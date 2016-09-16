# HMJS Usage & API

<table width="100%">
<tr>
    <th>HM object</th>
</tr>
<tr>
    <td>
    
    _bool_ <code>HM.add(templates [object], replace [bool] (optional))</code>
    
    Adds (or replaces) one or more templates. Templates are parsed for performance.
    </td>
</tr>
</table>

<table width="100%">
<tr>
    <th>Method</th>
    <th>Description</th>
</tr>
<tr>
    <td>_bool_<code>HM.add(templates [object], replace [bool] (optional))</code></td>
    <td>Adds (or replaces) one or more templates. Templates are parsed for performance.</td>
</tr>
<tr>
    <td><code>HM.insert($destination [jQuery], template_name [string], data [object] (optional), onReady [function] (optional), insertionMethod [function] (optional))</code></td>
    <td>You probably will never use this function, as it is for advanced usage only. It is recommended you use
    the jQuery helper functions instead (see below). Renders template and inserts into DOM. Listens for DOM event, and when handled, calls callback and
        any available ViewHelper, within the lexical scope of the template and with data. Calls the ViewModel first,
        and then callback.</td>
</tr>
<tr>
    <td><code>HM.render()</code></td>
    <td></td>
</tr>
<tr>
    <td><code>HM.clear()</code></td>
    <td></td>
</tr>
<tr>
    <td><code>HM.getTemplates()</code></td>
    <td></td>
</tr>
<tr>
    <td><code>HM.exists()</code></td>
    <td></td>
</tr>
<tr>
    <td><code>HM.setViewModels()</code></td>
    <td></td>
</tr>
</table>

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