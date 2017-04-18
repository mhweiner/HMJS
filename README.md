# HMJS
HMJS is a simple view component/encapsulation template rendering library, powered by [Mustache](https://github.com/janl/mustache.js). 
You can think of it as a jQuery plugin for Mustache. HMJS can issue callbacks (within scope of component), 
when the template has rendered, and when your view logic (viewmodel) has run. This easily allows your view components to be kept
modular/encapsulated, and each view/component can have its own API. Emphasis was placed on performance, so it's great for
HTML5 mobile apps, or where performance is crucial.

## Example Usage:

_welcome.mustache_
```HTML
<div data-tplid="{{tplid}}">
<button><span>Hello</span>, {{name}}!</button>
</div>
```
_welcome.js_
```JS
window.welcome = function($scope, data){

    var status = false;
    
    function toggle(){
        status = !status;
        $scope.find('button span').html(status ? 'Bye' : 'Hello');
    }
    
    $scope.on('click', 'button', toggle);
    
    /* return api */
    return {
      toggle: toggle
    };
   
};
```
_app.js_
```JS
$('body').insertView('welcome', {name: 'Dave'}, function(data, vm){
    vm.toggle(); //call 'toggle' directly from welcome's api when component is ready
});
```

## Benefits

- Very few depedencies. Comes with everything you need except jQuery.
- View logic and markup encapsulation (componentization)
- Callbacks when view has been rendered, and when viewmodel function (window.welcome, in the example) returns/exits
- Ability to easily manipulate or tear down views
- jQuery plugin
- Fast performance
- Very small file size
- Node mutation detection (detect when new view component is rendered)

## Installation

Just grab dist/hmjs.min.js. It includes all dependencies (Mustache, Arrive) **except** for jQuery 1.6+.

## Dependencies

- jQuery 1.6+ (**not** included in dist file)
- Mustache (included in dist)
- Arrive (included in dist file)

## Documentation

- [Getting Started](getting_started.md)
- [HMJS API Documentation](API.md)

## Wait, what is a viewmodel?

There are many definitions for [viewmodel](https://www.infoq.com/articles/View-Model-Definition). For our purposes,
a **_viewmodel_** is a wrapper or decorator that ideally contains all of the javascript logic required for the view/component.
This could be event binding, data binding, callbacks, template manipulation, etc. HMJS does not have any opinions
on how this is implemented, and it is left to you. Feel free to bring your own data-binding library.

## Why are we doing this? Who is this for?

HMJS was originally written to be used as a way to organize and encapsulate view components in a HTML5 mobile app.
Performance and small filesize were key goals. Mustache is also ubiquitous, [well documented](https://mustache.github.io/mustache.5.html), simple, 'logicless', 
[highly portable](https://mustache.github.io/) (it's available in many languages), and one of the fastest JS template engines.
Mustache templates are usually clean and easy-to-read, yet highly flexible (see lambda functions). HMJS is great for 
use in micro-library frameworks, custom frameworks, or as components within other frameworks.

## License

Copyright (c) 2016 Marc Weiner (mhweiner234@gmail.com). All rights reserved.

HMJS is available under the MIT License.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
