// HairyMustache.js
// Useful templating utility and jQuery plugin for Mustache.js. Requires ArriveJS, MustacheJS and jQuery >= 1.8

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
	 * Renders template and inserts into DOM. Listens for DOM event, and when handled, calls callback and
	 * any available ViewHelper, within the lexical scope of the template and with data. Calls the ViewHelper first,
	 * and then callback.
	 * @param {object=} $destination //optional if using insertionMethod
	 * @param {string} template_name
	 * @param {object=} data
	 * @param {function=} onReady //callback function, called with [data, [viewModel]], within the context of root DOM element (jQuery selector)
	 * @param {function=} insertionMethod //called with HTML
	 */
	function insert($destination, template_name, data, onReady, insertionMethod){

		var $document = $(document);

		//make sure template is valid
		if(!template_name || !exists(template_name)){
			throw "HM: Error: Template '" + template_name + "' does not exist! You must HM.add() it first.";
		}

		onReady = onReady || function(){};
		data = data || {};

		//create a unique template id
		data.tplid = 'a' + Math.floor(Math.random()*10000000);

		function domNodeInserted($scope){
			if(viewmodels[template_name] && typeof viewmodels[template_name] == 'function'){
				onReady.call($scope, data, new viewmodels[template_name]($scope, data));
			} else {
				onReady.call($scope, data);
			}
		}

		if(window.MutationObserver){

			//Use HTML5 modern method to detect node inserted

			var arrived = false,
				selector = '[data-tplid="' + data.tplid + '"]';

			$document.arrive(selector, function() {

				if(arrived) return;
				arrived = true;

				//unsubscribe
				$document.unbindArrive(selector);

				domNodeInserted($(this));

			});

		} else {

			//fallback to DOMNodeInserted event

			var evt = 'DOMNodeInserted.' + data.tplid; //unique namespace
			$document.on(evt, function(e) {
				var $el = $(e.target);
				if($el.data('tplid') == data.tplid){
					$document.off(evt);
					domNodeInserted($el);
				}
			});
		}

		//render Mustache template
		var html =  M.render(templates[template_name], data, templates);

		//do insertion
		if(typeof insertionMethod === 'function'){
			//do it their way
			insertionMethod.call(undefined, html);
		} else {
			//default: just replace contents
			if(!($destination instanceof $) || !$destination.length){
				throw('HM: Error: $destination must be a jQuery object and must not be empty.');
			}
			$destination.html(html);
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
		insert($(this), template_name, data, onReady);
	};

	/**
	 * Appends contents.
	 * @param {string} template_name
	 * @param {object=} data
	 * @param {function=} onReady
	 */
	$.fn.appendView = function(template_name, data, onReady){
		var $this = $(this);
		insert(null, template_name, data, onReady, function(html){
			$this.append(html);
		});
	};

	/**
	 * Prepends contents.
	 * @param {string} template_name
	 * @param {object=} data
	 * @param {function=} onReady
	 */
	$.fn.prependView = function(template_name, data, onReady){
		var $this = $(this);
		insert(null, template_name, data, onReady, function(html){
			$this.prepend(html);
		});
	};

	/**
	 * Inserts after selected element.
	 * @param {string} template_name
	 * @param {object=} data
	 * @param {function=} onReady
	 */
	$.fn.afterView = function(template_name, data, onReady){
		var $this = $(this);
		insert(null, template_name, data, onReady, function(html){
			$this.after(html);
		});
	};

	/**
	 * Inserts before selected element.
	 * @param {string} template_name
	 * @param {object=} data
	 * @param {function=} onReady
	 */
	$.fn.beforeView = function(template_name, data, onReady){
		var $this = $(this);
		insert(null, template_name, data, onReady, function(html){
			$this.before(html);
		});
	};

	return {
		add: add,
		insert: insert,
		render: render,
		clear: clear,
		getTemplates: getTemplates,
		exists: exists,
		setViewModels: function(vm){viewmodels = vm;}
	};

})(jQuery, Mustache);