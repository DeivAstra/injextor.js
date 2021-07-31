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
				throw 'Attributes names array or attribute name are(is) not defined';

			if (!Array.isArray(attrs) && typeof attrs != 'string')
				throw 'Expected attributes names array or attribute name string';

			const names = [];
			if (Array.isArray(attrs)) {
				attrs.forEach(function (attr, i) {
					names.push.apply(names, injectOne(this, context, attr));
				});
			} else {
				names.push.apply(names, injectOne(this, context, attrs));
			}
			context.applyValues = (applyValues).bind(context);
			console.log('injext: ' + names.join(', '));
		} catch (e) {
			console.error(e);
			if (alertOnError)
				alert(e);
		}
		return this;
	};

	function injectOne(section, context, attr) {

		var $section;
		if (section instanceof jQuery)
			$section = section;
		else if (typeof section === 'string')
			$section = $(section);
		else
			throw 'Unexpected root type. Allowed jQuery object or selector string only';

		function check(attrValue) {
			if (!attrValue || attrValue.trim() === '')
				throw 'Attribute defined but value is empty';
			if (context.hasOwnProperty(attrValue)) {
				throw 'Attribute "' + attr + ' = '
						+ attrValue + '" already injected';
			}
		}

		const names = [];
		$section.find('*[' + attr + ']').each(function (idx, el) {
			const $el = $(el);
			const attrValue = $el.attr(attr);
			check(attrValue);
			context[attrValue] = $el;
			names.push(attrValue);
		});
		return names;
	};

	function applyValues (values) {
		const context = this;
		for(prop in values) {

			if (!context.hasOwnProperty(prop))
				throw 'Property not exists in context:' + prop;

			if (context[prop] instanceof jQuery)
				context[prop].val(values[prop]);
			else if (typeof context[prop] != 'function')
				console.warn('Object in context in property = '+ prop +' is not jQuery object');
		}
	}

}(jQuery));
