$(document).ready(function(){
      $("#nav").hover(function() {
      if ($("#nav").hasClass("navactive")) {
         $("#navtxt1").fadeOut();
         $("#navtxt2").fadeOut();
         $("#navtxt3").fadeOut();
         $("#nav").removeClass("navactive");
      } else {
      $("#navtxt1").fadeIn();
      $("#navtxt2").fadeIn();
      $("#navtxt3").fadeIn();
      $("#nav").addClass("navactive");
         
      }
   });
   
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
