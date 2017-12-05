     function modalClick(id) {      
        var strId ='#' + String(id);
        
         var modal = document.getElementById('modal');
        var notModal = document.getElementById('notModal');
          if ($("#modal").is(":visible")) {
             
           var children = modal.getElementsByTagName('img');
               for  ( num = 0; num < modal.getElementsByTagName('img').length; num++) {
                  children[num].remove();
               }
              
    
             $(strId+ "story").hide();
            $("#modal").hide();
             $("#notModal").hide();
          } else {
               
               $("#modal").show();
             $("#notModal").show();

               var clone = $(strId).clone().appendTo(modal); 
               $(strId+ "story").show();

    
            
        }
      }