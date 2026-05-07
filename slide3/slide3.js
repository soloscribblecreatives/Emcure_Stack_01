function runAnimationWheel() {
window.requestAnimationFrame(function () {

$(document).ready(function () {

var values = [4000, 4500, 5000, 5500, 6000, 6500, 7000, 7500, 8000];
var itemHeight = 80;
var visibleItems = 5;
var isSpinning = false;
var lockedValue = null;
var currentTop = 0;
var wheelSpeed = 5;
var animationId = null;
var stopReady = false;

var spinAudio = document.getElementById("spin");

function playSpinAudioNormal() {
  if (!spinAudio) return;
  spinAudio.pause();
  spinAudio.currentTime = 0;
  spinAudio.volume = 0.6;
  spinAudio.playbackRate = 1;
  spinAudio.play();
}

function stopSpinAudio() {
  if (!spinAudio) return;
  spinAudio.pause();
  spinAudio.currentTime = 0;
  spinAudio.playbackRate = 1;
}

if (spinAudio) {
  spinAudio.addEventListener("timeupdate", function () {
    if (!spinAudio.duration) return;

    if (spinAudio.currentTime >= spinAudio.duration - 0.30) {
      spinAudio.currentTime = 0.01;
    }
  });
}

function buildWheel() {
  var html = "";

  for (var i = 0; i < 50; i++) {
    for (var j = 0; j < values.length; j++) {
      html += '<div class="prize" data-value="' + values[j] + '">' + values[j] + '</div>';
    }
  }

  $("#wheelStrip").html(html);
  $("#wheelStrip").css("top", "0px");
}

buildWheel();

setTimeout(function () {
  updateCenterResult();
}, 000);

function startWheel() {

  if (isSpinning) return;

  isSpinning = true;
  lockedValue = null;
  stopReady = false;

  $(".prize").removeClass("selected");

  $("#resultImage").hide();
  $("#brandImage").hide();
  $("#retry").hide();
  $("#lock").hide();

  playSpinAudioNormal();

  moveWheel();
}

function moveWheel() {

  if (!isSpinning) return;

  currentTop -= wheelSpeed;

  var totalCycleHeight = values.length * itemHeight;

  if (Math.abs(currentTop) >= totalCycleHeight) {
    currentTop = 0;
  }

  $("#wheelStrip").css("top", currentTop + "px");

  updateCenterResult();

  animationId = requestAnimationFrame(moveWheel);
}

function getCenterValueData() {

  var centerOffset = 2;

  var rawIndex = (Math.abs(currentTop) / itemHeight) + centerOffset;
  var nearestIndex = Math.round(rawIndex);

  var valueIndex = nearestIndex % values.length;
  var selectedValue = values[valueIndex];

  return {
    value: selectedValue,
    index: nearestIndex,
    valueIndex: valueIndex
  };
}

function updateCenterResult() {

  $(".prize").removeClass("active-center");

  var data = getCenterValueData();
  var centerValue = data.value;
  var centerIndex = data.index;

  $(".prize").eq(centerIndex).addClass("active-center");

  $("#resultImage")
    .attr("src", "slide3/" + centerValue + ".png")
    .show();
}

function stopWheelByUser() {

  if (!isSpinning || !stopReady) return;

  isSpinning = false;
  stopReady = false;

  cancelAnimationFrame(animationId);

  stopSpinAudio();

  var data = getCenterValueData();
  var selectedValue = data.value;

  lockedValue = selectedValue;

  $(".prize").removeClass("selected");

  var centerOffset = 2;
  var safeCycle = 20;
  var selectedIndex = values.indexOf(selectedValue);

  var finalIndex = (safeCycle * values.length) + selectedIndex;
  var finalTop = -((finalIndex - centerOffset) * itemHeight);

  $("#wheelStrip").stop(true, true).animate(
    { top: finalTop + "px" },
    {
      duration: 000,
      easing: "swing",
      complete: function () {

        currentTop = finalTop;

        $(".prize").eq(finalIndex).addClass("selected");

        $("#resultImage")
          .attr("src", "slide3/" + selectedValue + ".png")
          .show();

        afterValueSelected(selectedValue);

        $("#stopBtn").addClass("disabled");

        setTimeout(function () {
          $("#resultImage").hide();
          $("#retry").css("display", "block");
          $("#lock").css("display", "block");
        }, 1000);
      }
    }
  );
}

function afterValueSelected(selectedValue) {
	
  if (selectedValue === 3000) {
    // Action when 4000 is selected
    // $("#brandImage").fadeIn(300);
  }

  if (selectedValue === 3500) {
    // Action when 4500 is selected
    // $("#brandImage").fadeIn(300);
  }	

  if (selectedValue === 4000) {
    // Action when 4000 is selected
    // $("#brandImage").fadeIn(300);
  }

  if (selectedValue === 4500) {
    // Action when 4500 is selected
    // $("#brandImage").fadeIn(300);
  }

  if (selectedValue === 5000) {
    // Action when 5000 is selected
    // $("#brandImage").fadeIn(300);
  }

  if (selectedValue === 5500) {
    // Action when 5500 is selected
    // $("#brandImage").fadeIn(300);
  }

  if (selectedValue === 6000) {
    // Action when 6000 is selected
    // $("#brandImage").fadeIn(300);
  }

  if (selectedValue === 6500) {
    // Action when 6500 is selected
    // $("#brandImage").fadeIn(300);
  }

  if (selectedValue === 7000) {
    // Action when 7000 is selected
    // $("#brandImage").fadeIn(300);
  }

  if (selectedValue === 7500) {
    // Action when 7500 is selected
    // $("#brandImage").fadeIn(300);
  }

  if (selectedValue === 8000) {
    // Action when 8000 is selected
    // $("#brandImage").fadeIn(300);
  }
}

function afterValueLocked(lockedValue) {
  
  if (lockedValue === 3000) {
	  document.getElementById("wrong").play();
    // Action when 4000 is locked
    // $("#brandImage").fadeIn(300);
  }

  if (lockedValue === 3500) {
	  document.getElementById("wrong").play();
    // Action when 4500 is locked
    // $("#brandImage").fadeIn(300);
  }  

  if (lockedValue === 4000) {
	  document.getElementById("fanfare").play();
    // Action when 4000 is locked
    // $("#brandImage").fadeIn(300);
  }

  if (lockedValue === 4500) {
	  document.getElementById("wrong").play();
    // Action when 4500 is locked
    // $("#brandImage").fadeIn(300);
  }

  if (lockedValue === 5000) {
	  document.getElementById("wrong").play();
    // Action when 5000 is locked
    // $("#brandImage").fadeIn(300);
  }

  if (lockedValue === 5500) {
	  document.getElementById("wrong").play();
    // Action when 5500 is locked
    // $("#brandImage").fadeIn(300);
  }

  if (lockedValue === 6000) {
	  document.getElementById("wrong").play();
    // Action when 6000 is locked
    // $("#brandImage").fadeIn(300);
  }

  if (lockedValue === 6500) {
	  document.getElementById("wrong").play();
    // Action when 6500 is locked
    // $("#brandImage").fadeIn(300);
  }

  if (lockedValue === 7000) {
	  document.getElementById("wrong").play();
    // Action when 7000 is locked
    // $("#brandImage").fadeIn(300);
  }

  if (lockedValue === 7500) {
	  document.getElementById("wrong").play();
    // Action when 7500 is locked
    // $("#brandImage").fadeIn(300);
  }

  if (lockedValue === 8000) {
	  document.getElementById("wrong").play();
    // Action when 8000 is locked
    // $("#brandImage").fadeIn(300);
  }
}

$("#startBtn").on("click touchstart", function (e) {
  e.preventDefault();
  e.stopPropagation();
  startWheel();
  
  $("#stopBtn").hide();
  $("#startBtn").addClass("disabled");

  setTimeout(function () {
    if (isSpinning) {
	  $("#startBtn").hide();
      $("#stopBtn").show();
      stopReady = true;
    }
  }, 1000);
});

$("#retry").on("click touchstart", function (e) {
  e.preventDefault();
  e.stopPropagation();
  startWheel();

  setTimeout(function () {
    if (isSpinning) {
	  $("#stopBtn").removeClass("disabled");
      stopReady = true;
    }
  }, 0000);
});

$("#stopBtn").on("click touchstart", function (e) {
  e.preventDefault();
  e.stopPropagation();

  if (!stopReady) return;

  stopWheelByUser();
});

$("#lock").on("click touchstart", function (e) {
  e.preventDefault();
  e.stopPropagation();

  if (lockedValue === null) return;

  afterValueLocked(lockedValue);

  $("#lock").addClass("disabled");
  $("#retry").addClass("disabled");
  setTimeout(function () {
     begin();
  }, 1500);
});

});
});
}