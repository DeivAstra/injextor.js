# injextor.js (jQuery plugin)
Inject jQuery elements to context  by element attrubutes.

### IDEA
We have some container with some included elements:
```html
<table id="container">
    <tr>
        <td><input name="foo"/></td>
    </tr>
    <tr>
        <td><select name="bar"/></td>
    </tr>
    <tr>
        <td><span name="sun"/></td>
    </tr>
</table>
```
Now, we need load all elements (which has, for example, `name` attribute) as  jQuery elements to  context object:

```javascript
var context = {};
$('#container').injext(context, 'name');
```
After that, `context` object contains variables referenced to all elements with `name` attribute:
```
{
	root: jQuery element of <div id="container"> ,
	foo: jQuery element of <input name='"foo"/>,
	bar: jQuery element of <select name='"bar"/>,
	sun: jQuery element of <span name="sun"/>
}
```
##### root: ? What??? (:-0)
Ooops, sorry.. `Container` element will always injected too. If target attribute not defined, then will added as `root` property to context by default. You can override it by adding, for example, `name="section` to get eponymous property in context.

Good, now we can get access to all necessary injected elements:
```js
var context = {};
$('#container').injext(context, 'name');
context.foo.val('Hello');
context.bar.hide();
context.sun.addClass('star');
```
##### Applying multiple attributes
You can do:
```js
var context = {};
$('#container').injext(context, 'name').injext(context, 'id').injext(context, 'whatever');
```
But keep it simple:
```js
$('#container').injext(context, ['name', 'id', 'whatever']);
```
##### Logging
When element added to context object then log:
```
1: foo injected
2: bar injected
...
```
##### Show alert dialog when error occurred

```js
var showAlertOnError = true;
$('#container').injext(context, 'name', showAlertOnError);
```

Good luck.
### END PROGRAM
