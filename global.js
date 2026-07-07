var arrSurveyQuestions = {
   3: "Parameters?"
};
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
 
	if(nextSlideNo <= 3){//number 3 is number of total slides present
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
	
	if(page_id <= 3){
		page_id = page_id + 1;
		//alert(page_id);
		if(page_id == 4){
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
		/* $(".box2").click(function(event) {
			open_page("",5)
		});
		$(".box3").click(function(event) {
			open_page("",6)
		});
		$(".box4").click(function(event) {
	 		open_page("",7)
	 	});
		$(".box5").click(function(event) {
	 		open_page("",8)
	 	});
		$(".box6").click(function(event) {
	 		open_page("",9)
	 	});
		$(".box7").click(function(event) {
	 		open_page("",10)
	 	});
		$(".box8").click(function(event) {
	 		open_page("",11)
	 	}); */
		
	}
	 checkClickThrough(page_id);
}

function set_pg_content(pg_id){
$(".reference").removeClass("active");
currentSlide();
var selectedContentPath='';
switch(pg_id){
	case 1:
	content='<link rel="stylesheet" type="text/css" href="slide1/slide1.css" media="screen"/><div class="s1"><img src="slide1/s1.png" width="1080" height="810" alt=""/></div><div class="s2"><img src="slide1/s2.png"/></div><div class="s3"><img src="slide1/s3.png"/></div><div class="s4"><img src="slide1/s4.png"/></div><div class="s5"><img src="slide1/s5.png"/></div><div class="s6"><img src="slide1/s6.png"/></div><div class="logo"><img src="slide1/logo.png"/></div><audio preload="auto" id="intro" src="slide1/intro.mp3" type="audio/mpeg"></audio>';
	break;
	case 2:
	content='<link rel="stylesheet" type="text/css" href="slide2/slide2.css" media="screen"/><div class="logo"><img src="slide1/logo.png"/></div><script>runAnimationWheel()</script>';
	break;
	case 3:
	content='<link rel="stylesheet" type="text/css" href="slide3/slide3.css" media="screen"/><div class="s1"><img src="slide3/s1.png" width="1080" height="810" alt=""/></div><div class="s2"><img src="slide3/s2.png"/></div><div class="s3"><img src="slide3/s3.png"/></div><div class="s4"><img src="slide3/s4.png"/></div><div class="s5"><img src="slide3/s5.png"/></div><div class="s6"><img src="slide3/s6.png"/></div><div class="s7"><img src="slide3/s7.png"/></div><div class="s8"><img src="slide3/s8.png"/></div><div class="logo"><img src="slide1/logo.png"/></div><audio preload="auto" id="swoosh" src="slide3/swoosh.mp3" type="audio/mpeg"></audio><audio preload="auto" id="stack" src="slide3/stack.mp3" type="audio/mpeg"></audio>';
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

	/*  if(page_id==4){
		$(".box2").click(function(event) {
			open_page("",5)
		});
		$(".box3").click(function(event) {
			open_page("",6)
		});
		$(".box4").click(function(event) {
	 		open_page("",7)
	 	});
		$(".box5").click(function(event) {
	 		open_page("",8)
	 	});
		$(".box6").click(function(event) {
	 		open_page("",9)
	 	});
		$(".box7").click(function(event) {
	 		open_page("",10)
	 	});
		$(".box8").click(function(event) {
	 		open_page("",11)
	 	});
	 } */
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
		document.getElementById("click_through").innerHTML='<div class="blocker1"></div><div class="begin" onclick="begin()"></div>';
		
		setTimeout(function(){
			intro();
		}, 0000);

		function intro(){
			document.getElementById("intro").play();
		}
	}

	if(page_id == 2){
		document.getElementById("click_through").innerHTML='<div class="blocker2"></div><div id="povGame" class="pov-game"><div class="pov-bg-top"></div><div class="pov-bg-bottom"></div><div class="pov-header"><div class="pov-ribbon">THE POVIZTRA OPEN CHALLENGE</div></div><div id="povLeftPanel" class="pov-left-panel"><div class="pov-panel-copy"><h1>Build your <span>confidence</span></h1><p>Select the <b>5 parameters</b> that matters the most when you think of Semaglutide</p></div><div class="pov-panel-title">Choose your Top 5 Confidence Drivers</div><div id="povParameterList" class="pov-parameter-list"></div></div><div id="povActionPanel" class="pov-action-panel"><button id="povProceedBtn" class="pov-green-btn"><img src="slide2/proceed-icon.png" alt=""><span>Proceed</span></button><button id="povRetryBtn" class="pov-red-btn"><img src="slide2/retry-icon.png" alt=""><span>Retry</span></button></div><div id="povFuturePanel" class="pov-future-panel"><img id="povFutureImage" src="slide2/final-image.png" alt=""><div id="povFutureText">You selected the parameters that matter the most, Poviztra delivers across every confidence driver – helping you prescribe with confidence every time.</div></div><div class="pov-wheel-wrap"><svg id="povWheelSvg" viewBox="0 0 620 620" class="pov-wheel-svg" aria-hidden="true"><defs><linearGradient id="povIdleGrad" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#fff6d2"/><stop offset="55%" stop-color="#ffc21b"/><stop offset="100%" stop-color="#f3a600"/></linearGradient><linearGradient id="povFillGrad" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#19235f"/><stop offset="50%" stop-color="#23348a"/><stop offset="100%" stop-color="#ef3d65"/></linearGradient><filter id="povGlow" x="-35%" y="-35%" width="170%" height="170%"><feGaussianBlur stdDeviation="5" result="coloredBlur"/><feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs><g id="povWheelPaths"></g></svg><div id="povWheelLabels" class="pov-wheel-labels"></div><div id="povCenterCircle" class="pov-center-circle"><div id="povCenterPercent" class="pov-center-percent">0%</div><div id="povCenterText" class="pov-center-text">SELECT ANY 5<br>PARAMETERS</div></div></div><div id="povBottomNote" class="pov-bottom-note">Tap a parameter to begin 👆🏻</div><div id="povPopupOverlay" class="pov-popup-overlay"><div class="pov-popup-box"><button id="povPopupClose" class="pov-popup-close">×</button><img id="povPopupIcon" class="pov-popup-icon" src="" alt=""><div id="povPopupParameter" class="pov-popup-parameter"></div><div id="povPopupUSP" class="pov-popup-usp"></div><div class="pov-popup-copy">This selected parameter has been added to the confidence wheel.</div></div></div><div class="hit_1"><img src="slide2/pop.png" width="1080" height="810" alt=""/></div><div class="hit_pop1" onclick="hit_pop1()"><img src="slide2/ref.png"/></div><div class="hit_close1" onclick="hit_close1()"></div></div>';
	}
	
	if(page_id == 3){
		document.getElementById("click_through").innerHTML='';
		
		setTimeout(function(){
			swoosh();
		}, 0100);

		function swoosh(){
			document.getElementById("swoosh").play();
		}
		
		setTimeout(function(){
			stack();
		}, 600);

		function stack(){
			document.getElementById("stack").play();
		}
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

function savedata(answer,type,questionNumber,page_id) {
	$('#radio01').css("display","none");
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

/*--------------------- animation javascript -----------------------*/

function hit_pop1() {
	$('.hit_1').css("display","block");
	$('.hit_close1').css("display","block");
	$('.hit_pop1').css("display","none");
	if (typeof window.playPovPopItSound === "function") {
		window.playPovPopItSound();
	}
}

function hit_close1() {
	$('.hit_1').css("display","none");
	$('.hit_pop1').css("display","block");
	$('.hit_close1').css("display","none");
	if (typeof window.playPovPopItSound === "function") {
		window.playPovPopItSound();
	}
}

function begin() {
	setTimeout(function(){
		go_nav('f');
	}, 0000);
}