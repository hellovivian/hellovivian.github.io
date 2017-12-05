     function modalClick(id) {      
        var strId ='#' + String(id);
        
         var modal = document.getElementById('modal');
        var notModal = document.getElementById('notModal');
          if ($("#modal").is(":visible")) {
             
           var children = modal.getElementsByTagName('img');
               for  ( num = 0; num < modal.getElementsByTagName('img').length; num++) {
                  children[num].remove();
               }
            
             var stories = modal.getElementsByClassName('story');
               for  ( num2 = 0; num2 < modal.getElementsByClassName('story').length; num2++) {
            if ($("#" + stories[num2].id).is(":visible")) {
                 $("#" + stories[num2].id).hide();
               }
               }
      
            $("#modal").hide();
             $("#notModal").hide();
          } else {
               
               $("#modal").show();
             $("#notModal").show();

               var clone = $(strId).clone().appendTo(modal); 
               $(strId+ "story").show();

    
            
        }
      }