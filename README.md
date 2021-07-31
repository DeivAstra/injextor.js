# injextor.js (jQuery plugin)
Inject jQuery elements to context by attrubutes names.

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
	foo: jQuery element of <input name='"foo"/>,
	bar: jQuery element of <select name='"bar"/>,
	sun: jQuery element of <span name="sun"/>
}
```

Good, now we can get access to all necessary injected elements:
```js
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
##### Applying values
`applyValues` just calls `val()` jQuery function on each element recursively if property name is the same.
```js
var context = {};
$('#container').injext(context, 'name');
context.applyValues({
	foo: 'Bye!'
});
```

##### Logging
After adding elements to context object calls console.log():
```
injext: foo, bar, sun
```
##### Show alert dialog while error occurred

```js
var showAlertOnError = true;
$('#container').injext(context, 'name', showAlertOnError);
```

Good luck.
### END PROGRAM
