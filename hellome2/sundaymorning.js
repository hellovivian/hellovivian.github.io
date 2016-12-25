$(document).ready(function(){
      $("#bike2").addClass("move");
   
 
      $("#aboutbutton").click(function() {
      
          $("#bike2").show();
         $("#bike").css("transform","translate(0px,150px");
           $("#bike").css("transition-duration","2s");
         
   
         $("#balloon").css("transform","translate(-200px,-50px");
         $("#balloon").css("transition-duration","3s");
        

      });
   
   
      $("#hobbies").click(function() {
                          
         $("#desc").hide();
         $("#bike2").hide();
         $("body").addClass("hobbiesactive");


         $("#bike").css("transform","translate(0px,500px)");
         $("#bike").css("transition-duration","2s");


      });

});
