$(document).ready(function(){
      $("#bike2").addClass("move");
      $("#menu").hover(function() {
         $("#hobbiesbutton").fadeIn("slow");
         $("#aboutbutton").fadeIn("slow");
      });
   
      $("#aboutbutton").click(function() {
         $("#fibcontainer").hide();
          $("#bike2").show();
         $("#bike").css("transform","translate(0px,150px");
           $("#bike").css("transition-duration","2s");
         
         
//         $("#balloon").fadeIn("slow");
         $("#balloon").css("transform","translate(-200px,-50px");
         $("#balloon").css("transition-duration","3s");
        

         setTimeout(function() {
              $("#desc").fadeIn();
            }, 400);


      });
   
      $("#hobbiesbutton").click(function() {
         $("#desc").hide();
         $("#bike2").hide();
         $("body").addClass("hobbiesactive");
//      setTimeout(function() {
//         $("#balloon").removeClass("move");
//         }, 300);
//         $("#balloon2").fadeIn();
//          $("#balloon").css("transform","translateY(-200%)");
//          $("#balloon").css("transition-duration","10s");
//          $("#balloon2").addClass("move");
    

         $("#bike").css("transform","translate(0px,500px)");
         $("#bike").css("transition-duration","2s");
         setTimeout(function() {
         $("#fibcontainer").fadeIn();
         $("#fibtext").fadeIn();
         }, 900);
//         $("#bike").addClass("hobbiesactive");
         
   
      });
   

//         $("#bike").css("transform", "translate(0,-400px)");
//         $("#bike").css("transition-duration","3s");
//      } else {
//         alert("hi");
//      }
      
 

          

	

});
