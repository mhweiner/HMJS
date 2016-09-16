# HM
HM is a JS view component and jQuery plugin for Mustache. Issues callbacks within new scope, so you can encapsulate your view logic, and have it run when it's ready. Each view/component can have its own API, so you can keep your components modular and completely isolated. At only 1.2kb gzipped, it's much more lightweight than any other component/templating library.

### Example Usage:

*welcome.mustache*
```HTML
<div data-tplid="{{tplid}}">
Hello, <span>{{name}}</span>!
<button>Toggle</button>
</div>
```
**welcome.js**
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
**app.js**
```JS
$('body').insertView('welcome', {name: 'Dave'}, function(data, vm){
    vm.toggle(); //call 'toggle' directly from welcome api
});
```
### Simple Example:
_Using same welcome.mustache file in previous example._

**app.js**
```JS
$('body').insertView('welcome', {name: 'Dave'});
```
