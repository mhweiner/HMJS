# Getting Started with HMJS

## Adding Templates

First, you will need to add some templates to HMJS in order to use them. You can do this using HM.add().

```JS

var templates = {
    "test1": "<div id="t1" data-tplid="{{tplid}}">{{test}}</div>",
    "test2": "<div id="t1" data-tplid="{{tplid}}">{{test}}</div>",
    "test3": "<div id="t1" data-tplid="{{tplid}}">{{test}}</div>",
};

HM.add(templates);
```

<code>templates</code> can be any object, with the key being the name of the template, and the value being the mustache
markup. Any valid [Mustache5](https://mustache.github.io/mustache.5.html) markup is allowed, as we use Mustache to render the templates.

### Building your templates using npm

You can store your templates in separate .mustache files, and then use a build process to create a javascript object
containing your templates. To do this, you can use the **jsttojs** npm module ([see manual](https://www.npmjs.com/package/jsttojs)):

```
jsttojs assets/templates/base dist/tmp/base_templates.js -e mustache -n baseTmpl -r -o
```

## Setting ViewModels

Using ViewModels is not required to use HMJS, but it is one of the main features. It is basically the same as simply
using a callback, but it is done automatically for you--this keeps your code clean and more modular.

```JS
var test1 = function($scope, data){

   my status = false;
   
   function toggle(){
     status = !status;
   }
   
   console.log('ready!');

   return {
        toggle: toggle,
        getStatus: function(){ return status; }
   };
}

var viewmodels = {
  test1: test1
};

HM.setViewModels(viewmodels);

$('body').insertView('test1'); //outputs: ready!
```

## Rendering Views

For our purposes, a **_view_** is any rendered template, complete with any logic/ViewModel, if appropriate.

```JS
$('#mydiv').insertView('test1', {name:'john'}); //simply insert view with some data

$('#mydiv').insertView('test1', {name:'john'}, function(data, vm){
  //this callback is called when 1) the view has been rendered (ready in DOM), and 2) when the appropriate ViewModel, if it exists, has exited (or returned something)
  console.log(this); //jQuery selector containing test1 node
  console.log(data); //{name:'john'}
  console.log(vm); //{toggle: function(){...}, getStatus: function(){...}} //whatever is returned by the viewmodel
});
```

ViewModels are called using the **new** keyword, so they are scoped independently (like an instance of a class).

## See also

- [HMJS API Documentation](API.md)
- [Introduction](README.md)