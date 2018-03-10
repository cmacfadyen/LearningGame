var locations =['#dc','#ho','#lc','#dc','#ho'];
var sits= ["to get help with homework",
"when you're late to school",
"you need to change a class",
"you need a locker",
"to make up an assessment",
"when you just need to talk to someone",
];
var i=1;
setInterval(function() {
    //i = Math.floor(Math.random()*3);
    $(locations[i]).css("opacity", "1.0");
    $(locations[i+1]).css("opacity", "0.25");
    $(locations[i-1]).css("opacity", "0.25");
    i++;
    if(i==4)
      i=1;
}, 1000);
