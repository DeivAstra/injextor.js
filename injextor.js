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
			console.error(this);
			if (alertOnError)
				alert(e);
		}
		return this;
	};

	function injectOne(section, context, attrName) {

		var $section;
		if (section instanceof jQuery)
			$section = section;
		else if (typeof section === 'string')
			$section = $(section);
		else
			throw 'Unexpected root type. Allowed jQuery object or selector string only';

		function getAttrValue($el, attrName) {
			const attrValue = $el.attr(attrName)
			try {
				if (!attrValue || attrValue.trim() === '')
					throw 'Attribute "'+ attrName +'" defined but value is empty';

				if (context.hasOwnProperty(attrValue)) {
					throw 'Attribute "' + attrName + ' = '
							+ attrValue + '" already injected';
				}
				return attrValue;
			} catch (e) {
				console.error($el);
				throw e;
			}
		}

		const names = [];
		$section.find('*[' + attrName + ']').each(function (idx, el) {
			const $el = $(el);
			const attrValue = getAttrValue($el, attrName);
			context[attrValue] = $el;
			names.push(attrValue);
		});
		return names;
	};

	function applyValues (values) {
		const context = this;
		for(prop in values) {

			if (!context.hasOwnProperty(prop))
				throw 'Property is not exists in context: ' + prop;

			const $obj = context[prop];
			const value = values[prop];
			if ($obj instanceof jQuery) {
				if ($obj.attr('type') == 'checkbox')
					$obj.prop('checked', String(value) === 'true')
				else
					$obj.val(value);
			} else if (typeof $obj != 'function')
				console.warn('Property "'+ prop +'" in context is not jQuery object');
		}
	}

}(jQuery));
