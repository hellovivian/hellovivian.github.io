/**
This function collects the string inside the text area and parses into a parameter for FUNCTION drawgraph
**/
function uponClick() {
      var jsonValue = JSON.parse(document.getElementById("jsonText").value);
      drawgraph(s, jsonValue);
}   

/**
s is a global variable for the sigma instance that we will draw our graph using.
**/
var s = new sigma('container');
s.settings('zoomingRatio', 1);
   
/**
This function collects the string inside the text area and parses into a parameter for FUNCTION drawgraph
**/
function drawgraph(s, jsonObj) {
   
      s.graph.clear();
      var seenArray = {};
      var seenStrings = new StringSet();
      var weights = {activemq: 1, main:2, html:3, postmsg:4, service:5};
      
      var heap = new Heap(function cmp(a, b) {
      if (a.weight < b.weight) {
         return -1;
      } 
      if (a.weight > b.weight) {
         return 1;
      }
      return 0;
      });
 

      var x = 0;
      var y = 0;
  
      
   for (i = 0; i < jsonObj.gateways.length; i++) {
      var tempNode = jsonObj.gateways[i];
      tempNode.label = tempNode.id;
      tempNode.size = 3;
      tempNode.weight = weights[String(tempNode.type)];
      heap.push(tempNode);

      }
      
   var topNodeFlag = true;
   var topNode = "";
   
   for (i = 0; i < jsonObj.gateways.length; i++) {
      var tempNode = heap.pop();
      if (topNodeFlag) {
         topNode = tempNode;
         topNodeFlag = false;
         seenStrings.add(topNode.id);
      }
      tempNode.x = Math.random(0, 0.2);
      tempNode.y = y + 0.2;
      x = x + 0.2;
      y = y + 0.2;
      s.graph.addNode(tempNode);
      seenArray[tempNode.id] = tempNode;
      
   }
   
   var edge = 0;
      
   for (i = 0; i < jsonObj.gateways.length; i++) {
      var tempNode = jsonObj.gateways[i];
      if (tempNode.nodes != {}) {
         for (j = 0; j < tempNode.nodes.length; j++) {
         s.graph.addEdge({id:edge.toString(), target: tempNode.nodes[j], source: tempNode.id});
         edge++;
          }
      } 
   }
//   CustomShapes.init(s);
   alert(checkCycles(topNode, seenArray, seenStrings));
   
   s.refresh();
   }
   
   /**
   This function checks for cycles.
   PARAM node, the node we begin searching for cycles for.
   PARAM seenArray, a mapping of seen node names to their node objects.
   PARAM seenStrings, set of node names.  
   
   RETURN string for alert purposes
   **/
   
   function checkCycles(node, seenArray, seenStrings) {
  
      for (var index in node.nodes) {
            var childNodeName = node.nodes[index];      
            if (seenStrings.contains(childNodeName)) {
               return "Looks like you have a cycle! It includes " + childNodeName + "." ;
            } 
            seenStrings.add(childNodeName);
            checkCycles(seenArray[childNodeName], seenArray, seenStrings);  
         }
         
      return "No cycles in your graph, and you're good to go.";
      
   }
       