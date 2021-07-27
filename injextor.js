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

			if (!Array.isArray(attrs)) {
				attrs.forEach(function (attr, i) {
					injextOne(this, context, attr);
				});
			} else {
				injextOne(this, context, attr);
			}
		} catch (e) {
			console.error(e);
			if (alertOnError)
				alert(e);
		}
		return this;
	}

	function injextOne(root, context, attr) {

		var $root;
		if (root instanceof jQuery)
			$root = root;
		else if (typeof root === 'string')
			$root = $(root);
		else
			throw 'Unexpected rootOrSelector type value'

		if (!$root.hasAttr(attr)) {
			$root.attr(attr, 'root');
		}

		function check(name) {
			if (context.hasOwnProperty(name)) {
				throw 'InjeXt error. Element with attribute "'
						+ attr + ' = ' + context[attr] + '" already registered';
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
