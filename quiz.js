var score = 0;
var locations =['#dc','#ho','#lc','#dc','#ho'];
var sits= [["to get help with homework","lc"],
["when you're late to school","ho"],
["you need to change a class","dc"],
["you need a locker","ho"],
["to make up an assessment","lc"],
["when you just need to talk to someone","dc"]
];
//set up first question
//randomize later
//var nextQuestion= Math.floor(Math.random(6));
var nextQuestion =0;
var answer="";
correct=sits[nextQuestion][1];
$("#prompt").text(sits[nextQuestion][0]);
$("#score").text("Score: "+ score);


$("img").on("click",function(){
  $(this).css("opacity","1.0");
  answer = $(this).attr("id");
  checkAndNextQ();
});

$("img").on("mouseleave",function(){
  $(this).css("opacity","0.25");

});

function checkAndNextQ(){

  if(answer==correct){
    score++;

  }
  nextQuestion++;
  answer="";
  correct=sits[nextQuestion][1];
  $("#prompt").text(sits[nextQuestion][0]);
  $("#score").text("Score: "+ score);

}
