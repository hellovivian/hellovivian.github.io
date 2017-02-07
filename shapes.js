document.getElementById("demo").onclick = function() {randomize()};

function randomize() {
    document.getElementById("demo").style.backgroundColor = "red";
   document.getElementById("demo").style.width = Math.random() * 1400;
}
       
//document.getElementById("clear").onclick = function() {clearAll()};

         
//function clearAll() {
//   toClear=  document.getElementsByClassName("clearable");
//   for (index = 0; index < toClear.length; index++) { 
//      document.toClear[0].style.backgroundColor = "blue";
//      document.toClear[0].style.display = "none";
//
//   }
//}