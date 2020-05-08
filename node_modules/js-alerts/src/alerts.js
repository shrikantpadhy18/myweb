(function($) {
	var hideAlert = function(msg) {
		msg = msg.parent();
		msg.animate({
			opacity: '0'
		}, 100, function () {
			msg.slideUp(100, function () {
				msg.remove();
			});
		});
	};

	$.fn.CloseMessages = function() {
		var messages = this.find("div.alert");
		messages.each(function () {
			var $this = $(this);
			if($this.hasClass('alert-perm')) {
				var lnk = $('<button type="button" class="close" aria-label="Close"><span aria-hidden="true">&times;</span></button>');
				$this.prepend(lnk);
			} else {
				setTimeout(function() {
					hideAlert($this);
				}, 3000);
			}
		});
		this.on("click", "div.alert > button.close", function () {
			hideAlert($(this).parent());
		});
	};

	jQuery(document).ready(function () {
		$('div.message-centre').CloseMessages();
	});
})(jQuery);