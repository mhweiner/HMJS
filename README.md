# HMJS
HMJS is a simple view component/encapsulation template rendering library, powered by [Mustache](https://github.com/janl/mustache.js). 
You can think of it as a jQuery plugin for Mustache. HMJS can issue callbacks (within scope of component), 
when the template has rendered, and when your view logic has run. This easily allows your view components to be kept
modular, and each view/component can have its own API. Emphasis was placed on performance, so it's great for
HTML5 mobile apps, or rendering where performance is critical.

## Example Usage:

_welcome.mustache_
```HTML
<div data-tplid="{{tplid}}">
Hello, <span>{{name}}</span>!
<button>Toggle</button>
</div>
```
_welcome.js_
```JS
window.welcome = function($scope, data){

    var status;
    
    function toggle(){
        status = !status;
        $scope.html((status ? 'Hello ' : 'Bye ') + data.name + '!');
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
    vm.toggle(); //call 'toggle' directly from welcome api
});
```

## Benefits

- View logic and markup encapsulation
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

- [Usage & API](api.md)