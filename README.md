# HM
HM is a JS view component and jQuery plugin for Mustache. Issues callbacks within new scope, so you can encapsulate your view logic, and have it run when it's ready. Each view/component can have its own API, so you can keep your components modular and completely isolated. At only 1.2kb gzipped, it's much more lightweight than any other component/templating library.

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
As you can see, all view logic is held within welcome.js, and all view markup (and some simple Mustache logic) is held within welcome.mustache. HMJS gives you the following benefits, out of the box:

- View logic and markup encapsulation
- jQuery plugin
- Callbacks when view has been rendered, and when viewmodel function (window.welcome, in the example) returns/exits
- Ability to easily manipulate or tear down views

## Installation

Just grab dist/hmjs.min.js. It includes all dependencies (Mustache, Arrive) **except** for jQuery 1.6+.

## Dependencies

- jQuery 1.6+ (**not** included in dist file)
- Mustache (included in dist)
- Arrive (included in dist file)

## Documentation

- API documentation
- More examples