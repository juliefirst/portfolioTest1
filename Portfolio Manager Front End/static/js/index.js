(function ($) {
	getUser();
})(jQuery);

$(document).ready(function(){
	$("#welcome").html('Welcome ' + user.name + ' !');
});