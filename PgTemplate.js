

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

function span_onclick() {

   var modal = document.getElementById('modal');
   
   $("#modal").children("img").remove();
   
   $("#modal").hide();
   $("#xbutton").hide();
   
}

//upon selecting from the drop down we show only container cards that have the chosen class
function selection_onclick(choice) {

   var containers = document.getElementsByClassName('container');
   var containersArr = [].slice.call(containers);
  
   //   hide all at first
   for (childNum = 0; childNum < containersArr.length; childNum++) {
      var childName = containersArr[childNum].getElementsByTagName('img')[0].id;
      $("#" + String(childName)).hide(); 
      }
   
   //show the ones with the chosen class
   var classElem = document.getElementsByClassName(String(choice));
   var classElemArr = [].slice.call(classElem);

   var classElemNamesArr = [];
   
   for (childNum = 0; childNum < classElemArr.length; childNum++) {
      var childName = classElemArr[childNum].getElementsByTagName('img')[0].id;
//      alert(childName);
      $("#" + String(childName)).show(); 
   }

   
   
}

function image_onclick(id) {
    var modal = document.getElementById('modal');
   if ($("#modal").children("img").length > 0) {
      return;
   }
  
   var strId ='#' + String(id);
   
   $(strId+ "story").show();
   console.log("printed");
   document.getElementById('modal').style.display = "block";
   var clone = $(strId).clone().appendTo(modal); 
   $("#modal").show();
   $("#xbutton").show();
}


//window.onclick = function(event) {
//   var modal = document.getElementById('modal');
//   var children = modal.getElementsByTagName('img');
//      for  ( num = 0; num < modal.getElementsByTagName('img').length; num++) {
//         children[num].remove();            
//      }
//   
//   
//    if (event.target == modal) {
//        modal.style.display = "none";
//    }
//       
//}


function modalClick(id) {      
//        var strId ='#' + String(id);
//        
//        var modal = document.getElementById('modal');
//        var notModal = document.getElementById('notModal');
//          if ($("#modal").is(":visible")) {
////             deletes all elements that are img elements from the active modal
//
//      
//            $("#modal").hide();
//             $("#notModal").hide();
//             $("#xbutton").hide();
//          } else {
//             
//            var children = modal.getElementsByTagName('img');
//               for  ( num = 0; num < modal.getElementsByTagName('img').length; num++) {
//                  children[num].remove();
//                  
//               }
////            hides all stories
//             var stories = modal.getElementsByClassName('story');
//               for  ( num2 = 0; num2 < modal.getElementsByClassName('story').length; num2++)                {
//               if ($("#" + stories[num2].id).is(":visible")) {
//                    $("#" + stories[num2].id).hide();
//                  }
//               }
//             
////               clone into the modal only the one image chosen
//            $("#modal").show();
//             
//             $("#xbutton").appendTo(modal);
//             $("#xbutton").show();
//             $("#notModal").hide();
//      
//
//               var clone = $(strId).clone().appendTo(modal); 
//             
//            
//               $(strId+ "story").show();
//
//    
//            
//        }
      }