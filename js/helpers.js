$.fn.extend({
	// Calls the handler function if the user has clicked outside the object (and not on any of the exceptions)
	clickOutside: function(handler, exceptions) {
	    var $this = this;

	    $(document).on("click", function(event) {
	        if (exceptions && $.inArray(event.target, exceptions) > -1) {
	            return;
	        } else if ($.contains($this[0], event.target)) {
	            return;
	        } else {
	            handler(event, $this);
	        }
	    });
	    return this;
	}
});

function slider(crUser) {

	setTimeout(function(){
		$('.cur-user-active').prependTo('#in-progress ul');
	},1);

	$('#in-progress ul').find('li').each(function(i,e){
		if($(e).has('div:visible').length == 1){
			$(this).addClass('active-slider');
		}

		$(e).find('h2').on('click', function(){
			$this = $(this);

			$this.parent().find('.ticket-container').slideToggle();
			$this.parent().toggleClass('active-slider');
		});
	});

}


