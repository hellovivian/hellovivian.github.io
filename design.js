$(document).ready(function(){
	var t = setInterval(function(){
		$("#carousel ul").animate({marginLeft:-200},1000,function(){
			$(this).find("li:last").after($(this).find("li:first"));
			$(this).css({marginLeft:0});
		})
	},2000);
   $("#character").hover(function() {
      if ($("#character").hasClass("characteractive")) {
         $("#title").fadeOut();
         $("#character").removeClass("characteractive");
      } else {
      setTimeout(function() {
         $("#title").fadeIn();
         }, 200);
      $("#character").addClass("characteractive");
      }
   });
});
