/* var arrSurveyQuestions = {
   2: "What restores your life?"
}; */

/*Code by android developers start here*/
var startLoc = null;
//var contentName = '152';
//step 1:-
var contentName = parseInt(localStorage.getItem("currentbrand"));
var currentContentId  = parseInt(localStorage.getItem('currentcontent'));
//ends
var currentContentNSlide ='';

//custom slides changes begins here....

//console.log("+++++currentContentId+++++++"+currentContentId+"+++++++contentName+++++++"+contentName);
	if (typeof(localStorage.getItem("currentcustomslideflag"))!='undefined' &&  localStorage.getItem("currentcustomslideflag") =='true'){
		var custcomslideid1=parseInt(localStorage.getItem("currentcontentcustomslideId"));
		//step 2:

		currentContentNSlide = currentContentId+"_"+contentName+"_"+custcomslideid1;
		//step 2 ends here
		localStorage.setItem("current",currentContentNSlide);
		localStorage.setItem("currentslide",custcomslideid1);

	}else{
		//step 3 :
		currentContentNSlide = currentContentId+"_"+contentName+"_"+'1';
		//step 3 ends here
		localStorage.setItem("current",currentContentNSlide);
		localStorage.setItem("currentslide",'1');
	}
checkClickThrough();

document.getElementById("main_content").addEventListener("touchmove", touchHandler, false);
document.getElementById("main_content").addEventListener("touchstart", touchHandler, false);
function touchHandler(e) {

	if (e.type == "touchstart") {

			 if( e.touches.length == 1 ) { // one finger touch
			 	var touch = e.touches[ 0 ];
			 	startLoc = { x : touch.pageX, y : touch.pageY };
			 }

			} else if (e.type == "touchmove") {
				if( startLoc ) {
					var touch = e.touches[ 0 ];

					if( Math.abs( startLoc.x - touch.pageX ) > Math.abs( startLoc.y - touch.pageY ) )
					{
						e.preventDefault();
					}
					startLoc = null;
				}

			}
		}
		/*Code by android developers ends here*/
		$(document).ready(function(){

			var ua = navigator.userAgent;
	//var event = "touchstart";
	var event = (ua.match(/Ipad/i)) ? "touchstart" : "click";


	$(".left_arrow").click(function(event) {
		go_nav('b');
	});

	$(".right_arrow").click(function(event) {
		go_nav('f');
	});

	$(".slides").click(function(){
		var slideNum =	$(this).index()+1;
		console.log(slideNum);
		open_page("",slideNum);

	});

	$(".reference").removeClass("active");

	$('.reference').on('swipeleft swiperight', function(event) {
		event.stopPropagation();
	});

	$(".box_btn").bind("click",function(){
		$(".reference").toggleClass("active");
	});

	currentSlide();

		$("#main_content").swipe({
	   swipeLeft:function(event, direction, distance, duration, fingerCount) {
		  //step 4:-
		console.log("swipeleft"+localStorage.getItem("currentslide"));
		localStorage.setItem("previousslide",localStorage.getItem("currentslide"));
		//step 4 ends here
		
		//alert("swipeleft");
		//myconsole("swipeleft");
		var page_id =  parseInt($("#wrapper").attr("rel"));
		//alert("swipeleft"+page_id);
		var last_page_id = $(".slides").length;
		var slide_jumper_open = $(".reference").hasClass("active");
		if(page_id == last_page_id+1)	{
			return
		} else{
			go_nav('f');
		}
	  },

	  swipeRight:function(event, direction, distance, duration, fingerCount) {
		  //step 5:-
		console.log("swiperight"+localStorage.getItem("currentslide"));
		localStorage.setItem("previousslide",localStorage.getItem("currentslide"));
		//step 5 ends here 
		
			//alert("swiperight");
		//myconsole("swiperight");
		var page_id =  parseInt($("#wrapper").attr("rel"));
		var slide_jumper_open = $(".reference").hasClass("active");

		if(page_id == 0){
			//console.log("First Slide");
			//myconsole("First Slide");
			return
		} else {
			go_nav('b');
		}

	  } ,

        //Default is 75px, set to 0 for demo so any distance triggers swipe
         threshold:0
	});


});

//step 6:-
function toCaptureTime(page_id){
	var currentSlideNo = page_id;
	var startTime = Date.now();
	
	//alert("===currentSlideNo===="+currentSlideNo);
	//alert("===startTime===="+startTime);
	var temp = localStorage.getItem(currentContentId+"_"+contentName+"_slideNo_"+currentSlideNo);
	if(temp == null){
		if (currentSlideNo!=0){
			localStorage.setItem(currentContentId+"_"+contentName+"_slideNo_"+currentSlideNo ,startTime);
			var startTimeInDBFormat = currentTimeInDatabaseFormat();
			localStorage.setItem(currentContentId+"_"+contentName+"_StartTime_"+currentSlideNo ,startTimeInDBFormat);
		}
}
else{
	var existingTime = localStorage.getItem(currentContentId+"_"+contentName+"_slideNo_"+currentSlideNo);
	var newTime = Date.now();
	var newSlideTime = (newTime - existingTime);
	var endTimeInDBFormat = currentTimeInDatabaseFormat();
    var EndTimeNext = localStorage.getItem(currentContentId+"_"+contentName+"_EndTime_"+currentSlideNo);
		//alert("===newSlideTime===="+newSlideTime);
	//alert("===EndTimeNext===="+EndTimeNext);
    console.log("++++++++EndTimeNext++++++++"+EndTimeNext+"++++++currentContentId+++"+currentContentId+"_"+contentName+"_EndTime_"+currentSlideNo);
   
   if(EndTimeNext == null){
	localStorage.setItem(currentContentId+"_"+contentName+"_totalTime_slideNo_"+currentSlideNo ,(newSlideTime/1000) );
	localStorage.setItem(currentContentId+"_"+contentName+"_EndTime_"+currentSlideNo ,endTimeInDBFormat);
	}

    if (typeof(localStorage.getItem('currentslide'))!='undefined' && localStorage.getItem('currentslide')!='' && localStorage.getItem('currentslide')>= currentSlideNo){
	var nextSlideNo = currentSlideNo;

    }else{
	var nextSlideNo = currentSlideNo + 1 ;
	
 } 
 
	if(nextSlideNo <= 2){//number 3 is number of total slides present
	// alert(nextSlideNo);
	var tempNext = localStorage.getItem(currentContentId+"_"+contentName+"_slideNo_"+nextSlideNo);

		if(tempNext == null){
			
			if (nextSlideNo!=0)	{
				var nextSlideStartTime =  Date.now();
				localStorage.setItem(currentContentId+"_"+contentName+"_slideNo_"+nextSlideNo ,nextSlideStartTime);
				localStorage.setItem(currentContentId+"_"+contentName+"_totalTime_slideNo_"+nextSlideNo ,0);
				var startTimeNextInDBFormat = currentTimeInDatabaseFormat();
				localStorage.setItem(currentContentId+"_"+contentName+"_StartTime_"+nextSlideNo ,startTimeNextInDBFormat);
			}
		}
	}
}

}
//step ends..

function go_nav(direction) {
var page_id =  parseInt($("#wrapper").attr("rel"));
			
		
var flag=0;
if(direction == 'b') {


	if(page_id >= 0){
		page_id = page_id - 1;
		//alert(page_id);
		//console.log(page_id);
		if(page_id == 0){
            flag=2;
        }
	}
	 if(flag == 2){
        localStorage.setItem("gotoNextPrevBrand" ,2);//if one than next if 2 than prev
        //flag == 0;
		var objectData={

         "gotoNextPrevBrand": localStorage.getItem("gotoNextPrevBrand"),
          "previousslide": localStorage.getItem("previousslide"),
         "slideId": page_id
         };
  var params = {
  "query" : objectData,
  "type" : "brandNavigation",
  "callback" : "checkLastPgFn"
  };

	//window.messageHandler.postMessage(JSON.stringify(params)); //pageswipe //pageswipe
	
		//window.location = "js-call:" + "1" + ":" + encodeURIComponent(JSON.stringify({query:'NODATA', type:'brandNavigation', callback:'checkLastPgFn'}));
    }else{
        localStorage.setItem("gotoNextPrevBrand" ,0);
		var objectData={

         "gotoNextPrevBrand": localStorage.getItem("gotoNextPrevBrand"),
          "previousslide": localStorage.getItem("previousslide"),
         "slideId": page_id
         };
  var params = {
  "query" : objectData,
  "type" : "brandNavigation",
  "callback" : "checkLastPgFn"
  };

	//window.messageHandler.postMessage(JSON.stringify(params)); //pageswipe //pageswipe
	}
	
}else {
	
	if(page_id <= 2){
		page_id = page_id + 1;
		//alert(page_id);
		if(page_id == 3){
            flag=1;
        }
	}
	    if(flag == 1){
        localStorage.setItem("gotoNextPrevBrand" ,1);//if one than next if 2 than prev
         flag == 0;
		 var objectData={

         "gotoNextPrevBrand": localStorage.getItem("gotoNextPrevBrand"),
          "previousslide": localStorage.getItem("previousslide"),
         "slideId": page_id
         };
  var params = {
  "query" : objectData,
  "type" : "brandNavigation",
  "callback" : "checkLastPgFn"
  };


	//window.messageHandler.postMessage(JSON.stringify(params)); //pageswipe //pageswipe
		 //window.location = "js-call:" + "1" + ":" + encodeURIComponent(JSON.stringify({query:'NODATA', type:'brandNavigation', callback:'checkLastPgFn'}));
    }else{
        localStorage.setItem("gotoNextPrevBrand" ,0);
		var objectData={

         "gotoNextPrevBrand": localStorage.getItem("gotoNextPrevBrand"),
          "previousslide": localStorage.getItem("previousslide"),
         "slideId": page_id
         };
  var params = {
  "query" : objectData,
  "type" : "brandNavigation",
  "callback" : "checkLastPgFn"
  };

	//window.messageHandler.postMessage(JSON.stringify(params)); //pageswipe //pageswipe
  
    }

}

$("#wrapper").attr("rel",page_id);

var content="";
if(flag==0){
var pg_content = set_pg_content(page_id);

	$("#main_content").html(pg_content);
}
	//console.log("pg : "+page_id);
	if(page_id==4){
		
	}
	 checkClickThrough(page_id);
}

function set_pg_content(pg_id){
$(".reference").removeClass("active");
currentSlide();
var selectedContentPath='';
switch(pg_id){
	case 1:
	content='<link rel="stylesheet" type="text/css" href="slide1/slide1.css" media="screen"/><div class="s1"><img src="slide1/s1.png" width="1080" height="810" alt=""></div><script>runAnimation();</script>';
	break;
	case 2:
	content='<link rel="stylesheet" type="text/css" href="slide2/slide2.css" media="screen"/><div class="s1"><img src="slide2/s1.png" width="1080" height="810" alt=""/></div><div class="s2"><img src="slide2/s2.png"/></div><div class="s3"><img src="slide2/s3.png"/></div><div class="s4"><img src="slide2/s4.png"/></div><div class="s5"><img src="slide2/s5.png"/></div><div class="s6"><img src="slide2/s6.png"/></div><div class="s7"><img src="slide2/s7.png"/></div><div class="s8"><img src="slide2/s8.png"/></div><div class="s9"><img src="slide2/s9.png"/></div><div class="s10"><img src="slide2/s10.png"/></div><div class="s11"><img src="slide2/s11.png"/></div><div class="goLeft" onclick="goLeft()"><img src="slide1/left.png"></div><div class="goRight" onclick="goRight()"><img src="slide1/right.png"></div>';
	break;
}

return content;

}

function showDiv() {
   document.getElementById('welcomeDiv').style.display = "block";
}
function showDiv2() {
   document.getElementById('welcomeDiv2').style.display = "block";
}

function open_page(url,page_id){
	count3=2;
    count4=0;
	if (typeof(localStorage.getItem("currentslide"))!='undefined'){
		//to checked previous slide has god end time...
		var slideid=localStorage.getItem("currentslide");
		toCaptureTime(slideid);	
	}

	// toCaptureTime(page_id);
	 localStorage.setItem("currentslide",page_id);
	 currentContentNSlide = currentContentId+"_"+contentName+"_"+page_id;
	 localStorage.setItem("current",currentContentNSlide);
	//step 10 ends here
	 $("#wrapper").attr("rel",page_id);
	 var content="";
	 var pg_content = set_pg_content(page_id);

	 	$("#main_content").html(pg_content);

	  checkClickThrough();
	}
var count3=2,count4=0;

function open_page2(url,page_id,count){
    count1=0;
    count3=page_id+count-2;
    count4=page_id+1;
	 // alert(page_id);
	if (typeof(localStorage.getItem("currentslide"))!='undefined'){
		var slideid=localStorage.getItem("currentslide");
		toCaptureTime(slideid);
	}
    count2=page_id;
    count1=page_id+count-1;

	localStorage.setItem("currentslide",page_id);
	currentContentNSlide = currentContentId+"_"+contentName+"_"+page_id;
	localStorage.setItem("current",currentContentNSlide);

	$("#wrapper").attr("rel",page_id);
	var content="";
	var pg_content = set_pg_content(page_id);
	$("#main_content").html(pg_content);
	checkClickThrough();
}

	function checkClickThrough(page_id){
	var currentslide=localStorage.getItem("currentslide");
	//alert(currentslide);
	document.getElementById("click_through").innerHTML='';

	if(page_id == 1){
		document.getElementById("click_through").innerHTML='<div class="canvas-wrapper"><canvas id="bottomCanvas" width="738" height="396"></canvas><canvas id="topCanvas" width="738" height="396"></canvas></div><div class="hand"><img src="slide1/hand.png"></div><div class="goLeft" onclick="goLeft()"><img src="slide1/left.png"></div><div class="goRight" onclick="goRight()"><img src="slide1/right.png"></div><div class="blocker"></div>';
		
		$('.slide_arrow, .box, .box_btn').css('display','none');
	}

}

	function checkBtns(refNum){
		switch(refNum){
		case 1:
		open_page('',1); //NA
		break;
		
		}
	}

	function currentSlide(){
		var curr_id =  parseInt($("#wrapper").attr("rel"));
		$(".slides").removeClass("active");
		$(".slides:nth-child("+curr_id+")").addClass("active");
	}

	var ln = 0;
	function myconsole(msg){

		var oldMsg = "</br>"+ln+". "+$("#myconsole").html();
		ln++
		$("#myconsole").html(msg+oldMsg);
	}

function currentTimeInDatabaseFormat(){//to get current time in dd-mm-yyyy hh:mm:ss
	var year = new Date().getFullYear();
	var month = new Date().getMonth();
		month = parseInt(month)+1;
	if(month.toString().length==1){
		month="0"+month;
	}

	var date = new Date().getDate();
	if(date.toString().length==1){
		date="0"+date;
	}

	var hour = new Date().getHours();
	if(hour.toString().length==1){
		hour="0"+hour;
	}

	var minutes = new Date().getMinutes();
	if(minutes.toString().length==1){
		minutes="0"+minutes;
	}

	var seconds = new Date().getSeconds();
	if(seconds.toString().length==1){
		seconds="0"+seconds;
	}

	var duration= year+"-"+month+"-"+date+"-"+hour + ":" + minutes + ":" + seconds;
	return duration;
}

// new js

$(document).ready(function(){
	$('body').on('click','.touchbtn',function(){
		$('.right_arrow').trigger( "click" );
	})

	$(document).on('click','.btnshow',function(){
//alert('hi')
		$('.touchbtn').css("display","block");
	})
})


/*--------------------- animation javascript -----------------------*/


function closewindowslide(currentslide)
{
	toCaptureTime(currentslide);
}
function endTime1(currentSlideNo){
		var existingTime = localStorage.getItem(currentContentId+"_"+contentName+"_slideNo_"+currentSlideNo);
		var newTime = Date.now();
		var newSlideTime = (newTime - existingTime);
		localStorage.setItem(currentContentId+"_"+contentName+"_totalTime_slideNo_"+currentSlideNo ,(newSlideTime/1000) );
		var endTimeInDBFormat = currentTimeInDatabaseFormat();
		localStorage.setItem(currentContentId+"_"+contentName+"_EndTime_"+currentSlideNo ,endTimeInDBFormat);

}

function hidesubmitonclick()
{
	$('.submit_button').css("display","none");
	goRight();
}

function goRight() {
	setTimeout(function(){
		go_nav('f');
	}, 1000);
}

function select1() {
	$(".s1").css("display","block");
	$(".s2,.s3,.s4,.s5,.s6,.s7").css("display","none");
	$(".s1").addClass("flashIt");
	$(".s2").removeClass("flashIt");
	$(".s3").removeClass("flashIt");
	$(".s4").removeClass("flashIt");
	$(".s5").removeClass("flashIt");
	$(".s6").removeClass("flashIt");
	$(".s7").removeClass("flashIt");
	$(".s8").removeClass("flashIt");
	$(".submit_button").css("display","block");
}

function select2() {
	$(".s2").css("display","block");
	$(".s1,.s3,.s4,.s5,.s6,.s7").css("display","none");
	$(".s1").removeClass("flashIt");
	$(".s2").addClass("flashIt");
	$(".s3").removeClass("flashIt");
	$(".s4").removeClass("flashIt");
	$(".s5").removeClass("flashIt");
	$(".s6").removeClass("flashIt");
	$(".s7").removeClass("flashIt");
	$(".s8").removeClass("flashIt");
	$(".submit_button").css("display","block");
}

function select3() {
	$(".s3").css("display","block");
	$(".s1,.s2,.s4,.s5,.s6,.s7").css("display","none");
	$(".s1").removeClass("flashIt");
	$(".s2").removeClass("flashIt");
	$(".s3").addClass("flashIt");
	$(".s4").removeClass("flashIt");
	$(".s5").removeClass("flashIt");
	$(".s6").removeClass("flashIt");
	$(".s7").removeClass("flashIt");
	$(".s8").removeClass("flashIt");
	$(".submit_button").css("display","block");
}

function select4() {
	$(".s4").css("display","block");
	$(".s1,.s3,.s2,.s5,.s6,.s7").css("display","none");
	$(".s1").removeClass("flashIt");
	$(".s2").removeClass("flashIt");
	$(".s3").removeClass("flashIt");
	$(".s4").addClass("flashIt");
	$(".s5").removeClass("flashIt");
	$(".s6").removeClass("flashIt");
	$(".s7").removeClass("flashIt");
	$(".s8").removeClass("flashIt");
	$(".submit_button").css("display","block");
}

function select5() {
	$(".s5").css("display","block");
	$(".s1,.s3,.s4,.s2,.s6,.s7").css("display","none");
	$(".s1").removeClass("flashIt");
	$(".s2").removeClass("flashIt");
	$(".s3").removeClass("flashIt");
	$(".s4").removeClass("flashIt");
	$(".s5").addClass("flashIt");
	$(".s6").removeClass("flashIt");
	$(".s7").removeClass("flashIt");
	$(".s8").removeClass("flashIt");
	$(".submit_button").css("display","block");
}

function select6() {
	$(".s6").css("display","block");
	$(".s1,.s3,.s4,.s5,.s2,.s7").css("display","none");
	$(".s1").removeClass("flashIt");
	$(".s2").removeClass("flashIt");
	$(".s3").removeClass("flashIt");
	$(".s4").removeClass("flashIt");
	$(".s5").removeClass("flashIt");
	$(".s6").addClass("flashIt");
	$(".s7").removeClass("flashIt");
	$(".s8").removeClass("flashIt");
	$(".submit_button").css("display","block");
}

function select7() {
	$(".s7").css("display","block");
	$(".s1,.s3,.s4,.s5,.s6,.s2").css("display","none");
	$(".s1").removeClass("flashIt");
	$(".s2").removeClass("flashIt");
	$(".s3").removeClass("flashIt");
	$(".s4").removeClass("flashIt");
	$(".s5").removeClass("flashIt");
	$(".s6").removeClass("flashIt");
	$(".s7").addClass("flashIt");
	$(".s8").removeClass("flashIt");
	$(".submit_button").css("display","block");
}

function select8() {
	$(".s1").removeClass("flashIt");
	$(".s2").removeClass("flashIt");
	$(".s3").removeClass("flashIt");
	$(".s4").removeClass("flashIt");
	$(".s5").removeClass("flashIt");
	$(".s6").removeClass("flashIt");
	$(".s7").removeClass("flashIt");
	$(".s8").addClass("flashIt");
	$(".submit_button").css("display","block");
}

function savedata(answer,type,questionNumber,page_id) {
	$('#radio01').css("display","none");
	$('#radio02').css("display","none");
	$('#radio03').css("display","none");
	$('#radio04').css("display","none");
	$('#radio05').css("display","none");
	$('#radio06').css("display","none");
	$('#radio07').css("display","none");
	$('#radio08').css("display","none");
	$(".submit_button").css("display","none");
	
	
	if(questionNumber == 2){
		var selectedAnswer1 = document.querySelector('input[name = "checkB01"]:checked').value;
		var varanswer = selectedAnswer1;
	}
	
	var question = arrSurveyQuestions[questionNumber];
	//localStorage.setItem("surveyQuestion_"+currentContentId+"_"+contentName+"_"+questionNumber,question);
	//localStorage.setItem("surveyAnswer_"+currentContentId+"_"+contentName+"_"+questionNumber,varanswer);
	//alert(question+varanswer);
	
	
	var surveydata={
		"question": question,
        "answer": varanswer
    };
	
	var objectData={
		"gotoNextPrevBrand": localStorage.getItem("gotoNextPrevBrand"),
          "previousslide": localStorage.getItem("previousslide"),
         "slideId": page_id,
		 "data": `${JSON.stringify(surveydata)}`
         };
	  var params = {
	  "query" : objectData,
	  "type" : "additionalInfo",
	  "callback" : "checkLastPgFn"
	  };

	//window.messageHandler.postMessage(JSON.stringify(params)); //pageswipe 
}


//-----------------Animate JS-----------------//

function goLeft() {
	go_nav('b');
}

function goRight() {
	go_nav('f');
}