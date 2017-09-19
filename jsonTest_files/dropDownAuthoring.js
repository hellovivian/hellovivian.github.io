 var nodenum = 0;
   
   function updateJSONText() {
      
      document.getElementById('jsonText').innerHTML = getDropDownVal(document.getElementById('jsonText').innerHTML, document.getElementById('lastNodeFlag').checked );
      
   }
      
   function getDropDownVal(prevString, lastNodeFlag) {
      var nodeString = '{"id": ';
      
      var dropDownVal = document.getElementById("dropdown");
      if(dropDownVal.selectedIndex == 0) {
      
           alert('You didnt select a type of gateway or service');
      }
      else {
          var selectedText = dropDownVal.options[dropDownVal.selectedIndex].text;

   
         nodeNames = document.getElementById("nodeNames").value;
       
         if(nodeNames.length > 0 ){ 
            var splitNodeNames = nodeNames.split(",");
       
            for (var node in splitNodeNames) {
            splitNodeNames[node] = '"' + splitNodeNames[node] + '"';
         }
            
            nodeString = nodeString + ' "' + String(selectedText) + nodenum.toString() + '", "type" : "' + String(selectedText) + '", "nodes": ['  + splitNodeNames.toString() +  ']}' ;
      
         }
         else {
            nodeString = nodeString + ' "' + String(selectedText) + nodenum.toString() + '", "type" : "' + String(selectedText) + '", "nodes": []}' ;
            
            
         }
         if (lastNodeFlag) {
            nodeString = nodeString + ']}' ;
         } else {
            nodeString = nodeString + ', ';
         }
         nodenum++;
         return prevString + nodeString;
      }
      
   }