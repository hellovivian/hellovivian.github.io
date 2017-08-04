
   var s = new sigma('container');
   var lastNode;

    
    s.graph.addNode({
    
      id: 'n0',
      label: 'ActiveMQ',
      x: 0,
      y: 0,
      size: 1,
      color: '#f2552c'
    }).addNode({
      // Main attributes:
      id: 'n1',
      label: 'Default GIFT ActiveMQ Gateway',
      // Display attributes:
      x: 1,
      y: 1,
      size: 1,
      color: '#004c8e'
    }).addEdge({
      id: 'e0',
      // Reference extremities:
      source: 'n0',
      target: 'n1',
       color: '#96dfe4'
      
    });

    // Finally, let's ask our sigma instance to refresh:
    s.refresh();


    function addNodes() {
       var newNodeName = grabTextVal();
         s.graph.addNode({id: newNodeName, label:newNodeName,x: 2, y:2,size: 1, color:'#00f'}).addEdge({id:'e1',source:'n1', target:newNodeName});
         s.refresh();
       
       //So we can add to the next node
       lastNode = y;
       
      }


function grabTextVal() {
   var newNodeName = $('#nodeName').val();
   //alert(String(newNodeName));
   return String(newNodeName);
}

 $(document).ready(function() {
    
  
    
      function removeNodes() {
         s.graph.dropNode('hi');
         s.refresh();
         alert("done");
         }
    
        });
