

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

function span_onclick() {

   var modal = document.getElementById('modalContent');
   
   $("#modalContent").children("img").remove();
   
   $("#modalContent").hide();
   $("#modal").hide();
   $("#xbutton").hide();

   
   var stories = document.getElementsByClassName('story');
   var storiesArr = [].slice.call(stories);
//   alert(storiesArr);
   for (childNum = 0; childNum < storiesArr.length; childNum++) {
      var childName = storiesArr[childNum].id;
//      alert(childName);
      $("#" + String(childName)).hide(); 
   }  
   
   
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
   var modalContent = document.getElementById('modalContent');
  
   if ($("#modalContent").children("img").length > 0) {
      $("#modalContent").children("story")[0].hide();
      
      return;
   }
  
   var strId ='#' + String(id);
   
   $(strId+ "story").show();

   document.getElementById('modalContent').style.display = "block";
   var clone = $(strId).clone().appendTo(modalContent);
   $("#modalContent").show();
   $("#modal").show();
   
   $("#xbutton").show();
}


