var messages = ["Now where?","Which way now?","Where to next?"];

//will track steps taken
var steps=[];
var stepsBack=[];
var playerBack=[];
var moves=0;
var i=0;
var x;
var y;
var dist;
var ctx;
var back = 0;
var mapW = 320;
var mapH = 320;
var unlocked = false;
var attempt = 1;


$(document).ready(function(){
  $('#progress').css('display','none');
  x=mapW/2;
  y=mapH/2;
  //set up map
  setMap();

  //set event handlers for the choices
  $('.dir').on('click',function(e){
    if(steps==stepsBack && steps.length>0){
      success();
      return;
    }
    $(this).hide().delay(150).fadeIn();
    if(back==0){
    steps.push(e.target.id);
    walk(e.target.id);
    moves++;

    console.log(steps +" "+steps.length + ' '+back);
      if(dist >= mapW/2 || moves>=8){
        goBack();
      }
      else{
        $(message).text(messages[i]);
        //cycle through messages
        i=(i+1)%messages.length;
      }
    }
    else{
      playerBack.push(e.target.id);
      //check if the player made the right move
      if(playerBack[moves]!=stepsBack[moves]){
        roundOver();
      }
      else if(playerBack.length == stepsBack.length){
         success();
      }
      else{
       walk(e.target.id);
       moves++;
     }
    }
});

  //other handlers
  $('#popMap').on('mouseover', function(){
     $('#mapHolder').css('display', 'block');
     $('#smallMap').css('display', 'none');
  });
  $('#unlockMap').on('click', function(){
    if(!unlocked){
    unlocked = true;
    $('#mapHolder').css('display', 'block');
    $('#unlockMap').text("Close map");
  }
  else{
    unlocked = false;
    $('#mapHolder').css('display', 'none');
    $('#unlockMap').text("Keep map open");
  }
});
  $('#mapHolder').on('mouseout',function(){
    if(!unlocked){
    $('#mapHolder').css('display', 'none');
    $('#smallMap').css('display', 'block');
  }
  })
});
$('#progress').on('click', restart);
$('#restart').on('click', restart);
$('#startButton').on('click', restart);
$('#algButton').on('click', function(){
  window.location.href='equation.html';
})

function restart(){
  attempt++;
  unlocked=false;
  back=0;
  setMap();
  steps.length=0;
  stepsBack.length=0;
  playerBack.length=0;
  x=mapW/2;
  y=mapH/2;
  $('#options').css('color','black');
  $('#message').text('The Land Enlarges. Chapter '+attempt);
  $('#mapHolder').css('display', 'none');
  $('#restart').css('diplay','none');
  $('#unlockMap').text("Keep map open");
  $('#progress').css('display','none');
  $('#startButton').css('display','none');
  $('.dir').fadeIn();

}

function setMap(){
  var c = document.getElementById('map');
  ctx = c.getContext('2d');
  var holder = document.getElementById('mapHolder');
  c.style.width ='320';
  c.style.height='320';
  // set the internal size to match
  c.width  = 320;
  c.height = 320;
  background = new Image(mapW,mapH);
  background.src= "images/sand.jpg";
// Make sure the image is loaded first otherwise nothing will draw.
  background.onload = function(){
  ctx.drawImage(background,0,0);
  ctx.font = "36px sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = "#8B4513";
  ctx.fillText("X",mapW/2,mapH/2);
  ctx.fillStyle = "#000000";
  }

}
function goBack(){
  back=1;
  //figure out the path back by inverting the steps
  tempArray=[];
  for(i=steps.length-1; i>=0; i--){
  switch(steps[i]){
    case 'n':
      stepsBack.push('s');
    break
    case 'e':
      stepsBack.push('w');
    break;
    case 's':
      stepsBack.push('n');
    break;
    case 'w':
      stepsBack.push('e');
    break;
    default:
    console.log('error');
  }
  }
  console.log(steps + " " + stepsBack);
  $(message).text("Stop! You've gone far enough. Your challenge now is "+
                "to get back to where you started");
  moves=0;
  //clear the steps array
  steps.length=0;
  $('#options').hide().fadeIn(5000);
  $('#options').css('color','#900C3F');
  $('#restart').css('display','inline');
  ctx.strokeStyle='#FFF';
  ctx.lineWidth = 6;
}

function walk(dir){
  ctx.beginPath();
  ctx.moveTo(x,y);
  moveD = mapW/10;
  switch(dir){
    case 'n':
      y-=moveD;
      break;
    case 's':
      y+=moveD;
      break;
    case 'e':
      x+=moveD;
      break;
    case 'w':
      x-=moveD;
      break;
  }
ctx.lineWidth=Math.round(mapW/100);
  ctx.lineTo(x,y);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(x,y,Math.round(mapW/50),0,2*Math.PI);
  dist = Math.sqrt((x-mapW/2)**2+(y-mapH/2)**2);
  console.log(dist);
  ctx.fill();
}

function roundOver(){
  $('#message').text("You lost your way. You must retrace your steps exactly")
  $('.dir').fadeOut();
  $('#restart').fadeOut();
  $('#progress').text("Why not try again?  If at first you don't succeed...");
  $('#progress').css('display','block');
  $('#progress').fadeIn(1000);
  $('#startButton').css('display','block');
}


function success(){
  $('#popMap').css('display','none');
  $('#unlockMap').css('display','none');
  $('#mapHolder').css('display','none');
  $('#message').text("You did it!")
  $('.dir').fadeOut();
  $('#restart').fadeOut();
  $('#progress').text("Think about your strategy.  What did you do?");
  $('#progress').css('display','block')
  $('#progress').fadeIn(1000);
  setTimeout(moveOn, 3000);
  $('#startButton').css('display','block');
}

function moveOn(){

  document.getElementById('conclusion').innerHTML=

    "<br>You went the opposite directions from how you'd gone originally" +
    '<br>And the first step you "undid" was the last of your original steps';
    $('#conclusion').fadeIn(2000);
    $('#startButton').css('display','none');
    $('#algButton').css('display','block');
}
