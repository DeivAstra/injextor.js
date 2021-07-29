/*
 * injextor.js (jQuery plugin)
 * Injecting jQuery elements to context by element attrubutes.
 * @author: Denis Ivanchik
 * @homepage: https://github.com/danykey/injextor.js
 * @license: BSD-2-Clause
 * @version: 0.1
 */

(function ($) {

	$.fn.injext = function (context, attrs, alertOnError) {
		try {
			if (!context)
				throw 'Context is not defined';

			if (!attrs)
				throw 'Attributes array or value is not defined';

			if (!Array.isArray(attrs) && typeof attrs != 'string')
				throw 'Expected attr names array or attr name';

			if (Array.isArray(attrs)) {
				attrs.forEach(function (attr, i) {
					injectOne(this, context, attr);
				});
			} else {
				injectOne(this, context, attrs);
			}

			context.applyValues = (function (values) {
				var context = this;
				try {
					for(prop in values) {
						
						if (!context.hasOwnProperty(prop))
							throw 'Property not found in context:' + prop;

						if (context[prop] instanceof jQuery)
							context[prop].val(values[prop]);
						else if (typeof context[prop] != 'function')
							console.warn('injextor: Object in context in property = '+ prop +' is not jQuery object');
					}
				} catch (e) {
					console.error(e);
					if (alertOnError)
						alert(e);
				}
			}).bind(context);

		} catch (e) {
			console.error(e);
			if (alertOnError)
				alert(e);
		}
		return this;
	}

	function injectOne(root, context, attr) {

		var $root;
		if (root instanceof jQuery)
			$root = root;
		else if (typeof root === 'string')
			$root = $(root);
		else
			throw 'Unexpected root type. Allowed jQuery object or selector string only';

		if (!$root.hasAttr(attr)) {
			$root.attr(attr, 'root');
		}

		function check(name) {
			if (!name || name.trim() === '')
				throw 'Attribute defined but empty';
			if (context.hasOwnProperty(name)) {
				throw 'Element with attribute "' + attr + ' = '
						+ name + '" already injected';
			}
		}

		$root.find('*[' + attr + ']').add($root).each(function (idx, el) {
			var $el = $(el);
			var name = $el.attr(attr);
			check(name);
			context[name] = $el;
			console.log(String(idx + 1) + ': ' + name + ' injected');
		});
	}

}(jQuery));
