// HairyMustache.js
// Useful templating utility and jQuery plugin for Mustache.js. Requires MustacheJS and jQuery >= 1.8

window.HM = (function($, M){

	"use strict";

	var templates = {},
		viewmodels = {};

	/**
	 * Adds (or replaces) one or more templates.
	 * @param {object} input_templates
	 * @param {boolean=} replace
	 */
	function add(input_templates, replace){
		$.each(input_templates, function(name,mhtml){
			if(exists(name) && !replace){
				//already exists!
				throw('HM: Error: Template ' + name + ' already exists.');
			}
			M.parse(mhtml); //speeds things up
			templates[name] = mhtml;
		});
	}

	/**
	 * Prepares the render and callback.
	 * @param {string} template_name
	 * @param {object=} data
	 * @param {function=} onReady //callback function, called with [data, [viewModel]], within the context of root DOM element (jQuery selector)
	 */
	function _prepareRender(template_name, data, onReady){

		//make sure template is valid
		if(!template_name || !exists(template_name)){
			throw "HM: Error: Template '" + template_name + "' does not exist! You must HM.add() it first.";
		}

		onReady = onReady || function(){};
		data = data || {};

		function domNodeInserted($scope){
			if(viewmodels[template_name] && typeof viewmodels[template_name] == 'function'){
				onReady.call($scope, data, new viewmodels[template_name]($scope, data));
			} else {
				onReady.call($scope, data);
			}
		}

		//render Mustache template
		var html =  M.render(templates[template_name], data, templates);

		return {
			html: html,
			domNodeInserted: domNodeInserted
		}
	}

	/**
	 * Returns the rendred template.
	 * @param template_name
	 * @param data
	 * @return {*}
	 */
	function render(template_name, data){
		return M.render(templates[template_name], data);
	}

	/**
	 * Clears the stored templates.
	 */
	function clear(){
		templates = {};
		M.clearCache();
	}

	/**
	 * Returns the templates loaded.
	 * @return {Object}
	 */
	function getTemplates(){
		return templates;
	}

	/**
	 * Checks if a template exists. Returns true/false.
	 * @param template_name
	 */
	function exists(template_name){
		return typeof templates[template_name] === 'string';
	}

	//---set up jQuery plugins---//

	/**
	 * Replaces contents.
	 * @param {string} template_name
	 * @param {object=} data
	 * @param {function=} onReady
	 */
	$.fn.insertView = function(template_name, data, onReady){
		var res = _prepareRender(template_name, data, onReady),
			$el = $(this).html(res.html);
		res.domNodeInserted($el); //triggers the callback
	};

	/**
	 * Appends contents.
	 * @param {string} template_name
	 * @param {object=} data
	 * @param {function=} onReady
	 */
	$.fn.appendView = function(template_name, data, onReady){
		var res = _prepareRender(template_name, data, onReady),
			$el = $(this).append(res.html);
		res.domNodeInserted($el); //triggers the callback
	};

	/**
	 * Prepends contents.
	 * @param {string} template_name
	 * @param {object=} data
	 * @param {function=} onReady
	 */
	$.fn.prependView = function(template_name, data, onReady){
		var res = _prepareRender(template_name, data, onReady),
			$el = $(this).prepend(res.html);
		res.domNodeInserted($el); //triggers the callback
	};

	/**
	 * Inserts after selected element.
	 * @param {string} template_name
	 * @param {object=} data
	 * @param {function=} onReady
	 */
	$.fn.afterView = function(template_name, data, onReady){
		var res = _prepareRender(template_name, data, onReady),
			$el = $(this).after(res.html);
		res.domNodeInserted($el); //triggers the callback
	};

	/**
	 * Inserts before selected element.
	 * @param {string} template_name
	 * @param {object=} data
	 * @param {function=} onReady
	 */
	$.fn.beforeView = function(template_name, data, onReady){
		var res = _prepareRender(template_name, data, onReady),
			$el = $(this).before(res.html);
		res.domNodeInserted($el); //triggers the callback
	};

	return {
		add: add,
		render: render,
		clear: clear,
		getTemplates: getTemplates,
		exists: exists,
		setViewModels: function(vm){viewmodels = vm;}
	};

})(jQuery, Mustache);