(function($) {

	/**
	 * Generate an indented list of links from a nav. Meant for use with panel().
	 * @return {jQuery} jQuery object.
	 */
	$.fn.navList = function() {

		var	$this = $(this);
			$a = $this.find('a'),
			b = [];

		$a.each(function() {

			var	$this = $(this),
				indent = Math.max(0, $this.parents('li').length - 1),
				href = $this.attr('href'),
				target = $this.attr('target');

			b.push(
				'<a ' +
					'class="link depth-' + indent + '"' +
					( (typeof target !== 'undefined' && target != '') ? ' target="' + target + '"' : '') +
					( (typeof href !== 'undefined' && href != '') ? ' href="' + href + '"' : '') +
				'>' +
					'<span class="indent-' + indent + '"></span>' +
					$this.text() +
				'</a>'
			);

		});

		return b.join('');

	};

	/**
	 * Panel-ify an element.
	 * @param {object} userConfig User config.
	 * @return {jQuery} jQuery object.
	 */
	$.fn.panel = function(userConfig) {

		// No elements?
			if (this.length == 0)
				return $this;

		// Multiple elements?
			if (this.length > 1) {

				for (var i=0; i < this.length; i++)
					$(this[i]).panel(userConfig);

				return $this;

			}

		// Vars.
			var	$this = $(this),
				$body = $('body'),
				$window = $(window),
				id = $this.attr('id'),
				config;

		// Config.
			config = $.extend({

				// Delay.
					delay: 0,

				// Hide panel on link click.
					hideOnClick: false,

				// Hide panel on escape keypress.
					hideOnEscape: false,

				// Hide panel on swipe.
					hideOnSwipe: false,

				// Reset scroll position on hide.
					resetScroll: false,

				// Reset forms on hide.
					resetForms: false,

				// Side of viewport the panel will appear.
					side: null,

				// Target element for "class".
					target: $this,

				// Class to toggle.
					visibleClass: 'visible'

			}, userConfig);

			// Expand "target" if it's not a jQuery object already.
				if (typeof config.target != 'jQuery')
					config.target = $(config.target);

		// Panel.

			// Methods.
				$this._hide = function(event) {

					// Already hidden? Bail.
						if (!config.target.hasClass(config.visibleClass))
							return;

					// If an event was provided, cancel it.
						if (event) {

							event.preventDefault();
							event.stopPropagation();

						}

					// Hide.
						config.target.removeClass(config.visibleClass);

					// Post-hide stuff.
						window.setTimeout(function() {

							// Reset scroll position.
								if (config.resetScroll)
									$this.scrollTop(0);

							// Reset forms.
								if (config.resetForms)
									$this.find('form').each(function() {
										this.reset();
									});

						}, config.delay);

				};

			// Vendor fixes.
				$this
					.css('-ms-overflow-style', '-ms-autohiding-scrollbar')
					.css('-webkit-overflow-scrolling', 'touch');

			// Hide on click.
				// if (config.hideOnClick) {

				// 	$this.find('a')
				// 		.css('-webkit-tap-highlight-color', 'rgba(0,0,0,0)');

				// 	$this
				// 		.on('click', 'a', function(event) {

				// 			var $a = $(this),
				// 				href = $a.attr('href'),
				// 				target = $a.attr('target');

				// 			if (!href || href == '#' || href == '' || href == '#' + id)
				// 				return;

				// 			// Cancel original event.
				// 				event.preventDefault();
				// 				event.stopPropagation();

				// 			// Hide panel.
				// 				$this._hide();

				// 			// Redirect to href.
				// 				window.setTimeout(function() {

				// 					if (target == '_blank')
				// 						window.open(href);
				// 					else
				// 						window.location.href = href;

				// 				}, config.delay + 10);

				// 		});

				// }

			// Event: Touch stuff.
// 				$this.on('click', 'a', function(event) {
//     var $a = $(this),
//         href = $a.attr('href'),
//         target = $a.attr('target');

//     // Check if href is defined and is not just a hash pointing to the panel itself
//     if (!href || href == '#' || href == '' || href == '#' + id) {
//         event.preventDefault();
//         event.stopPropagation();
//         return;
//     }

//     // No longer prevent default or stop propagation; just hide the panel
//     $this._hide();

//     // Optional: Use a timeout to give a slight delay before navigation
//     window.setTimeout(function() {
//         if (target == '_blank') {
//             window.open(href);
//         } else {
//             window.location.href = href;
//         }
//     }, config.delay + 10);
// });
	}})