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

