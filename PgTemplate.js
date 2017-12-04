     function modalClick(id) {      
        var strId ='#' + String(id);
        
         var modal = document.getElementById('modal');
        var notModal = document.getElementById('notModal');
          if ($("#modal").is(":visible")) {
            $("#modal").hide();
             $("#notModal").hide();
          } else {
               modal.innerHTML = "";
               $("#modal").show();
             $("#notModal").show();
               var clone = $(strId).clone().appendTo(modal);    
        }
      }