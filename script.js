$(document).ready(function() {
   $("#cat").hover(function() {
      if ($("#cat").hasClass("catmove")) {
         $("#welcometext").fadeOut();
         $("#cat").removeClass("catmove");
      } else {
      setTimeout(function() {
         $("#welcometext").fadeIn();
         }, 200);
      $("#cat").addClass("catmove");
      }
   });
 
   $("#danceicon").hover(function() {
      if ($("#danceicon").hasClass("iconactive")) {
      $("#dancetext2").hide();
      $("#dancetext1").show();
      $("#danceicon").removeClass("iconactive");
      $("#danceicon").removeClass("move2");
      } else {
      $("#danceicon").addClass("move2");
      $("#danceicon").addClass("iconactive");
      $("#dancetext1").hide();
      $("#dancetext2").show();
      }
   });
   

   $("#webdesignicon").hover(function() {
      if ($("#webdesignicon").hasClass("iconactive")) {
      $("#designtext2").hide();
      $("#designtext1").show();
      $("#webdesignicon").removeClass("iconactive");
      $("#webdesignicon").removeClass("move2");
      } else {
      $("#webdesignicon").addClass("move2");
      $("#webdesignicon").addClass("iconactive");
      $("#designtext1").hide();
      $("#designtext2").show();
      }
   });
   
   $("#writeicon").hover(function() {
      if ($("#writeicon").hasClass("iconactive")) {
      $("#writetext2").hide();
      $("#writetext1").show();
      $("#writeicon").removeClass("iconactive");
      $("#writeicon").removeClass("move2");
      } else {
      $("#writeicon").addClass("move2");
      $("#writeicon").addClass("iconactive");
      $("#writetext1").hide();
      $("#writetext2").show();
      }
   });
   
   $("#resumeicon").hover(function() {
      if ($("#resumetext").hasClass("resumeactive")) {
         $("#resumetext").removeClass("resumeactive");
      } else {
         $("#resumetext").fadeIn(900);
         $("#resumetext").addClass("resumeactive");
      }
   });
   
   $("#me").hover(function() {
      $("#goodbyetext").fadeOut(300);
      $("#abouttext").fadeIn(300);
   });
   
   $("#abouttext").click(function() {
      $("#abouttext").fadeOut(300);
      $("#goodbyetext").fadeIn(300);
   });
});

