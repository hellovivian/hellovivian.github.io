



    var color = d3.scale.linear().domain([1,length])
      .interpolate(d3.interpolateHcl)
      .range([d3.rgb("#007AFF"), d3.rgb('#FFF500')]);
    var rad = Math.PI/180;
    var div = d3.select("body").append("div")	
    .attr("class", "tooltip")				
    .style("opacity", 0);

   var starData = [ {x:400, y:400, info: 'Hacking, the term', desc:"I love how proud you are of hacking. I'm surrounded by CS majors, but no one else seems as passionate about hacking/hackathons as you are. Thank you for showing me drone light shows, colorful ski rides, Hackaday glitter booby traps, and so much more.", parent: 'hacker',r: Math.random() * 10 + 10},
                   {x:220, y:220, info: 'Hacking, the term', desc:"I love how proud you are of hacking. I'm surrounded by CS majors, but no one else seems as passionate about hacking/hackathons as you are. Thank you for showing me drone light shows, colorful ski rides, Hackaday glitter booby traps, and so much more.", parent: 'hacker',r: Math.random() * 10 + 5},
                   {x: 300, y:300, info: 'Bibliographies', desc:"You say that I always send resources. But you're the one who sends me bibliographies: hacker manifestos, allegories of open source (Cathedral and the Bazaar), Aaron Swartz, Samy Kamkar, monster moonshine, etc. When I came to your place the first time, I was so touched that you had made me a newsletter.", parent:'hacker',r: Math.random() * 10 + 3}, {x:225, y:225, info: 'Invention Lab, Noisebridge, C-Base', desc: "Chaos, Communication, and Congress--I was so, so excited to meet someone who not only knew what a makerspace was, but also what it stood for. When you sent me links things like MIT's 'How to Build Anything' course or storytelling-electronics/patent articles, I knew I had met a kindred spirit.", parent: 'hacker', r: Math.random() * 10 + 5}
                  ]
   
   var starData2 = [{x:255, y:255, info: 'Education Systems', desc: "Remember when you explained sixteen-twenty and the rigidity of the French system to me on New Year's Eve? You're rebellious, and I think it's extraordinary to stand opposite the system. I hope you can keep that mindset, but also find some stability in the system. ", parent: ' a',r: Math.random() * 10 + 5},
                   {x:290, y:290, info: 'Project Universe/Knowledge', desc: "I love that you have had this concept of Project Universe for so long. I dont want to intrude on your dreams, but I just wanted to express some support for your passions--and I can't believe you've been thinking about this since Madagascar!", parent: ' a',r: Math.random() * 10 + 4},
                   {x: 350, y:350, info: 'Berkeley and the Bay', desc: "You always make me look twice at the things I have. Before you sent me the Khmer Rouge article, I had never seen Berkeley as a dream or education as survival. I had never thought much about visas/immigration in spite of my parents' experiences. I didn't see how diverse, scenic, and passionate the Bay could be until you pointed out the mountains in the horizons and the authenticity of the people. You make me feel grateful.", parent:'a',r: Math.random() * 10 + 5},
                    {x:200, y:200, info: '坐井观天, The Sky from the Well', desc: "The first time we met in person, I was so happy that you knew of this idiom. I really liked that coincidence; you really surprised me when you mentioned the toad. It's my favorite saying, because I think it's a wonderful metaphor about how we all come of age.", parent: ' a',r: Math.random() * 10 + 5}
                      
                    
                  ]
   
     var starData3 = [{x:155, y:155, info: 'Image Processing', desc:"Remember when we were waiting by that brick wall by San Pedro Square?  I was getting all excited about image processing, lighting up about faces as linear subspaces and Delaunay triangulations. I still can't believe you had wanted to kiss me then. I liked how you seemed like you were really considering what I was saying, and thinking through my explanations.", parent: ' a',r: Math.random() * 10 + 5},
                      {x: 350, y:350, info: 'Sharing Math',  desc: "There is nothing quite like seeing you thrilled by my flippant answer of mergesort, my poor explanation of the stable marriage algorithm, or our mutual knowledge of the fly running between two trains. Or Gauss!  ", parent:'a',r: Math.random() * 10 + 5}
                      , 
                   {x:290, y:290, info: 'Monster moonshine and math in islamic art', desc: "I like that we both enjoy the interdisciplinary. Thank you for listening (and kissing me to shut up) when I talk about random, random things like the physical/structural color in butterfly wings or the secret math embedded in moroccan geometric art.", parent: ' a',r: Math.random() * 10 + 5},
                      {x:200, y:200, info: 'Neuroplasticity and Vision', desc: "I've already said many times, but you relax me. I've been really touched by how understanding you've been:when you told me that you like my eyes, when you told me you'd go up to Berkeley for me, even on a weekday (not necessary!), and when you patiently listened to me explain my eye problems for the first time by the lake.", parent: ' a',r: Math.random() * 10 + 5, c: "#518E87"}
                 
                  ]
     
   
       
//       sharing
              var starData4 = [{x:125, y:125, info: 'Genuine CS',desc:"I respect the way you started learning computer science so much. You began with C, hacking ROMs and sprites in binary. You learned and downloaded knowledge in a place with little (?) Internet, and now you work with robotics and clouds and many things I have no inkling of. You inspire me to strive in software.", parent: ' a',r: Math.random() * 10 + 5},
                               {x:225, y:225, info: 'Mada',desc:"I really love it when you talk about Madagascar. The foods that you've had, the routes you took to get to the Bay of Sakalava or school, Nosy Toreky. Vary. Beef wrapped in mango for your high school graduation. Your friend's windsurfing salary. The different sense of time and distance you had in your island on the Mer d'Emeraude. Your peace corps volunteering with the green charcoal stoves. You remind me that there is much of the world for me to see [Mada, Portugal, Bali #1 (Paris), Bali #2 (Indonesia).", parent: ' a',r: Math.random() * 10 + 5},
                   {x:276, y:276, info: 'Writing',desc:"I don't share my writing widely. The first time I shared only a sentence with you, but I was incredibly flattered by your reaction. And then two weeks later you read the most personal essay I have ever written. 'The more I produced objects for the real world, the clearer the real world became for me.' Do you remember this sentence? You mentioned it after the first time you kissed me.", parent: ' a',r: Math.random() * 10 + 5},
                   {x: 300, y:300, info: 'Dorky, but cool things', desc:"Haha, the first time you mentioned Sword Art Online, I was relieved because I knew I didn't have to hide some of the things I liked, like animes and webtoons. Now let's find dark and philosophical things to watch and read together! And then there are the other nerdy and cute things you send me, like wikipedia articles about System D, brainfuck, and sweet messages in <em>base64...</em>", parent:'a',r: Math.random() * 10 + 5}
                  ]
              
              
      
var svgContainer = d3.select("body").append("svg")
                                    .attr("class", "svg1")
                                    .attr("width", screen.width/2- 50 )
                                    .attr("height",screen.height/2)
                        
    
var defs = svgContainer.append("defs");

svgContainer.append("circle")
.attr("cx", screen.width/4-25 )
.attr("cy", screen.height/4)
.style("fill", "white")
.attr("class", "center")
.attr("r", 20)
 .on("mouseover", function(d) {		
                                   d3.select("#description").transition()		
                                  .duration(100)		
                                  .style("opacity", .9);
                                   d3.select("#description").html("<h3>hacking my brain</h3> <br><p>Because you are kind of all that I think about.</p>")   });



//Filter for the outside glow
var filter = defs.append("filter")
    .attr("id","glow");
filter.append("feGaussianBlur")
    .attr("stdDeviation","2")
    .attr("result","coloredBlur");
var feMerge = filter.append("feMerge");
feMerge.append("feMergeNode")
    .attr("in","coloredBlur");
feMerge.append("feMergeNode")
    .attr("in","SourceGraphic");
    

//Append a radialGradient element to the defs and give it a unique id
var radialGradient = defs.append("radialGradient")
    .attr("id", "radial-gradient")
    .attr("cx", "35%")    //The x-center of the gradient
    .attr("cy", "35%")    //The y-center of the gradient
    .attr("r", "60%");   //The radius of the gradient

//Append a radialGradient element to the defs and give it a unique id
var radialGradient2 = defs.append("radialGradient")
    .attr("id", "radial-gradient2")
    .attr("cx", "35%")    //The x-center of the gradient
    .attr("cy", "35%")    //The y-center of the gradient
    .attr("r", "60%");   //The radius of the gradient

//Append a radialGradient element to the defs and give it a unique id
var radialGradient3 = defs.append("radialGradient")
    .attr("id", "radial-gradient3")
    .attr("cx", "35%")    //The x-center of the gradient
    .attr("cy", "35%")    //The y-center of the gradient
    .attr("r", "60%");   //The radius of the gradient

//Append a radialGradient element to the defs and give it a unique id
var radialGradient4 = defs.append("radialGradient")
    .attr("id", "radial-gradient4")
    .attr("cx", "35%")    //The x-center of the gradient
    .attr("cy", "35%")    //The y-center of the gradient
    .attr("r", "60%");   //The radius of the gradient

//Append a radialGradient element to the defs and give it a unique id
var starGradient = defs.append("radialGradient")
    .attr("id", "star-gradient")
    .attr("cx", "35%")    //The x-center of the gradient
    .attr("cy", "35%")    //The y-center of the gradient
    .attr("r", "60%");   //The radius of the gradient

//Append a radialGradient element to the defs and give it a unique id
var starGradient2 = defs.append("radialGradient")
    .attr("id", "star-gradient2")
    .attr("cx", "35%")    //The x-center of the gradient
    .attr("cy", "35%")    //The y-center of the gradient
    .attr("r", "60%");   //The radius of the gradient


//Append a radialGradient element to the defs and give it a unique id
var starGradient3 = defs.append("radialGradient")
    .attr("id", "star-gradient3")
    .attr("cx", "35%")    //The x-center of the gradient
    .attr("cy", "35%")    //The y-center of the gradient
    .attr("r", "60%");   //The radius of the gradient


//Append a radialGradient element to the defs and give it a unique id
var starGradient4 = defs.append("radialGradient")
    .attr("id", "star-gradient4")
    .attr("cx", "35%")    //The x-center of the gradient
    .attr("cy", "35%")    //The y-center of the gradient
    .attr("r", "60%");   //The radius of the gradient



//Add colors to make the gradient appear like a Sun
radialGradient.append("stop")
    .attr("offset", "0%")
    .attr("stop-color",  d3.rgb("#acefac").brighter(1));
radialGradient.append("stop")
    .attr("offset", "50%")
    .attr("stop-color", "#acefac");
radialGradient.append("stop")
    .attr("offset", "90%")
    .attr("stop-color", d3.rgb("#acefac").darker(Math.random() * 1));
radialGradient.append("stop")
    .attr("offset", "100%")
    .attr("stop-color", d3.rgb("#acefac").darker(1.75));

//Add colors to make the gradient appear like a Sun
radialGradient2.append("stop")
    .attr("offset", "0%")
    .attr("stop-color",  d3.rgb("#D1E3F4").brighter(1));
radialGradient2.append("stop")
    .attr("offset", "50%")
    .attr("stop-color", "#D1E3F4");
radialGradient2.append("stop")
    .attr("offset", "90%")
    .attr("stop-color", d3.rgb("#D1E3F4").darker(Math.random() * 1));
radialGradient2.append("stop")
    .attr("offset", "100%")
    .attr("stop-color", d3.rgb("#D1E3F4").darker(1.75));


//Add colors to make the gradient appear like a Sun
radialGradient3.append("stop")
    .attr("offset", "0%")
    .attr("stop-color",  d3.rgb("#aff7ff").brighter(1));
radialGradient3.append("stop")
    .attr("offset", "50%")
    .attr("stop-color", "#aff7ff");
radialGradient3.append("stop")
    .attr("offset", "90%")
    .attr("stop-color", d3.rgb("#aff7ff").darker(Math.random() * 1));
radialGradient3.append("stop")
    .attr("offset", "100%")
    .attr("stop-color", d3.rgb("#aff7ff").darker(1.75));


//Add colors to make the gradient appear like a Sun
radialGradient4.append("stop")
    .attr("offset", "0%")
    .attr("stop-color",  d3.rgb("#f2e35c").brighter(1));
radialGradient4.append("stop")
    .attr("offset", "50%")
    .attr("stop-color", "#f2e35c");
radialGradient4.append("stop")
    .attr("offset", "90%")
    .attr("stop-color", d3.rgb("#f2e35c").darker(Math.random() * 1));
radialGradient4.append("stop")
    .attr("offset", "100%")
    .attr("stop-color", d3.rgb("#f2e35c").darker(1.75));




//Add colors to make the gradient appear like a Sun
starGradient.append("stop")
    .attr("offset", "0%")
    .attr("stop-color", d3.rgb("#518E87").brighter(1));
starGradient.append("stop")
    .attr("offset", "50%")
    .attr("stop-color","#518E87");
starGradient.append("stop")
    .attr("offset", "90%")
    .attr("stop-color", d3.rgb("#518E87").darker(Math.random() * 2));
starGradient.append("stop")
    .attr("offset", "100%")
    .attr("stop-color", d3.rgb("#518E87").darker(2));

//Add colors to make the gradient appear like a Sun
starGradient2.append("stop")
    .attr("offset", "0%")
    .attr("stop-color", d3.rgb("#cc75d6").brighter(1));
starGradient2.append("stop")
    .attr("offset", "50%")
    .attr("stop-color","#cc75d6");
starGradient2.append("stop")
    .attr("offset", "90%")
    .attr("stop-color", d3.rgb("#cc75d6").darker(1.75));
starGradient2.append("stop")
    .attr("offset", "100%")
    .attr("stop-color", d3.rgb("#cc75d6").darker(Math.random()* 3));

//Add colors to make the gradient appear like a Sun
starGradient3.append("stop")
    .attr("offset", "0%")
    .attr("stop-color", d3.rgb("#e5af4b").brighter(1));
starGradient3.append("stop")
    .attr("offset", "50%")
    .attr("stop-color","#e5af4b");
starGradient3.append("stop")
    .attr("offset", "90%")
    .attr("stop-color", d3.rgb("#e5af4b").darker(1.75));
starGradient3.append("stop")
    .attr("offset", "100%")
    .attr("stop-color", d3.rgb("#e5af4b").darker(2));

//Add colors to make the gradient appear like a Sun
starGradient4.append("stop")
    .attr("offset", "0%")
    .attr("stop-color", d3.rgb("#14c475").brighter(1));
starGradient4.append("stop")
    .attr("offset", "50%")
    .attr("stop-color","#14c475");
starGradient4.append("stop")
    .attr("offset", "90%")
    .attr("stop-color", d3.rgb("#14c475").darker(1.75));
starGradient4.append("stop")
    .attr("offset", "100%")
    .attr("stop-color", d3.rgb("#14c475").darker(2));


    var circles = svgContainer.selectAll("circle")
                  .data(starData)
                  .enter()
                  .append("circle");
    
    
    var circleAttributes = circles
                           .attr("cx", function(d) {return d.x})
                           .attr("cy", function(d) {return d.y})
                           .attr("r", function(d) { return d.r})
                           .attr("class", "stars")
                           .style("fill", function(d) { return  "url(#star-gradient)"})
       .on("mouseover", function(d) {		
                                   d3.select("#description").transition()		
                                  .duration(100)		
                                  .style("opacity", .9);
                                   d3.select("#description").html("<h3>" + d.info + "</h3>" + "<br>" + d.desc);	  });
                        	
                           
               
var svgContainer = d3.select("body").append("svg")
                  .attr("class", "svg2")
                  .attr("width", screen.width/2 - 50)
                  .attr("height",screen.height/2);
    

svgContainer.append("circle")
.attr("cx", screen.width/4-25 )
.attr("cy", screen.height/4)
.style("fill", "white")
.attr("class", "center")
.attr("r", 20)
.on("mouseover", function(d) {		
                                   d3.select("#description").transition()		
                                  .duration(100)		
                                  .style("opacity", .9);
                                   d3.select("#description").html("<h3>Giving me perspective</h3><br> <p>Thanks Mr. Worldwide!</p>")   });



var circles = svgContainer.selectAll("circle")
                  .data(starData2)
                  .enter()
                  .append("circle");
    
    
var circleAttributes = circles
                           .attr("cx", function(d) {return d.x})
                           .attr("cy", function(d) {return d.y})
                           .attr("r", function(d) { return d.r})
                           .style("fill", function(d) { return  "url(#star-gradient2)"})
                        .attr("class", "stars")
       .on("mouseover", function(d) {		
                                   d3.select("#description").transition()		
                                  .duration(100)		
                                  .style("opacity", .9);
                               d3.select("#description").html("<h3>" + d.info + "</h3>" + "<br>" + d.desc);	    });
    
           var svgContainer = d3.select("body").append("svg")
           .attr("class", "svg3")
                                    .attr("width", screen.width/2 - 50)
                                    .attr("height",screen.height/2)
    var circles = svgContainer.selectAll("circle")
                  .data(starData3)
                  .enter()
                  .append("circle")
    ;
    
    
svgContainer.append("circle")
.attr("cx", screen.width/4-25 )
.attr("cy", screen.height/4)
.style("fill", "white")
.attr("class", "center")
.attr("r", 20)
.on("mouseover", function(d) {		
                                   d3.select("#description").transition()		
                                  .duration(100)		
                                  .style("opacity", .9);
                                   d3.select("#description").html("<h3>Connect the dots</h3> <br> <p>You can't connect the dots looking forwards, you can only connect them looking backwards. -S. Jobs</p>")   });
    var circleAttributes = circles
                           .attr("cx", function(d) {return d.x})
                           .attr("cy", function(d) {return d.y})
                           .attr("r", function(d) { return d.r})
                          .style("fill", function(d) { return  "url(#star-gradient3)"})
                        .attr("class", "stars")
       .on("mouseover", function(d) {		
                                   d3.select("#description").transition()		
                                  .duration(100)		
                                  .style("opacity", .9);
                                 d3.select("#description").html("<h3>" + d.info + "</h3>" + "<br>" + d.desc);	  });

           var svgContainer = d3.select("body").append("svg")
                     .attr("class", "svg4")
                                    .attr("width", screen.width/2 - 50)
                                    .attr("height",screen.height/2);
    var circles = svgContainer.selectAll("circle")
                  .data(starData4)
                  .enter()
                  .append("circle")
    ;
    
svgContainer.append("circle")
.attr("cx", screen.width/4-25 )
.attr("cy", screen.height/4)
.style("fill", "white")
.attr("class", "center")
.on("mouseover", function(d) {		
                                   d3.select("#description").transition()		
                                  .duration(100)		
                                  .style("opacity", .9);
                                   d3.select("#description").html("<h3>for all that we share</h3><br> <p>From the dorky things to the intimate things! </p>")   })
.attr("r", 20);
    
    var circleAttributes = circles
                           .attr("cx", function(d) {return d.x})
                           .attr("cy", function(d) {return d.y})
                           .attr("r", function(d) { return d.r})
                           .style("fill", function(d) { return  "url(#star-gradient4)"})
               .attr("class", "stars")
       .on("mouseover", function(d) {		
                                   d3.select("#description").transition()		
                                  .duration(100)		
                                  .style("opacity", .9);
                                   d3.select("#description").html("<h3>" + d.info + "</h3>" + "<br>" + d.desc);	 });


        
    


d3.selectAll(".stars")
    .style("filter", "url(#glow)");

d3.selectAll(".svg1 .center")
    .style("filter", "url(#glow)")
.style("fill", function(d) { return  "url(#radial-gradient)"});


d3.selectAll(".svg2 .center")
    .style("filter", "url(#glow)")
.style("fill", function(d) { return  "url(#radial-gradient2)"});


d3.selectAll(".svg3 .center")
    .style("filter", "url(#glow)")
.style("fill", function(d) { return  "url(#radial-gradient3)"});

d3.selectAll(".svg4 .center")
    .style("filter", "url(#glow)")
.style("fill", function(d) { return  "url(#radial-gradient4)"});

