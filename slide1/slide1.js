/* Poviztra Open Challenge Game
   Editable slide-level game logic only. No minified code.
   Popup feature is kept in code but disabled through POV_GAME_CONFIG.popupEnabled.
*/

var POV_GAME_CONFIG = {
  maxSelections: 5,

  /* Set to true if you want the USP popup after every parameter selection. */
  popupEnabled: false,

  /* Sound controls.
     Offline MP3 provision is enabled below.
     Add these files inside slide1/:
     1) parameter-click.mp3 - plays on every parameter click.
     2) complete-100.mp3 - plays when 5 parameters are completed to 100%.
     If files are missing/blocked, the existing generated offline tones are used as fallback. */
  soundEnabled: true,
  soundVolume: 1.0,
  useCustomSoundFiles: true,
  customSounds: {
    select: 'slide1/parameter-click.wav',
    success: 'slide1/complete-100.wav'
  },

  finalImage: 'slide1/final-image.png',
  finalText: 'Provision to add next step or go to next page.',

  parameters: [
    { parameter: 'QUALITY', usp: 'rDNA Technology', icon: 'slide1/quality.png' },
    { parameter: 'ACCESSIBILITY', usp: 'Starts 3999/- Onwards', icon: 'slide1/accessibility.png' },
    { parameter: 'DEVICE EXPERIENCE', usp: 'FlexTouch Device', icon: 'slide1/device.png' },
    { parameter: 'CLINICAL FINDINGS', usp: '50 Phase 3 Clinical Trials Conducted', icon: 'slide1/clinical.png' },
    { parameter: 'CARDIO\nVASCULAR OUTCOMES', usp: 'Score Trial And Steer Trials', icon: 'slide1/cardiovascular.png' },
    { parameter: 'STORAGE & TRANSPORT', usp: 'Robust & Reliable Cold-Chain', icon: 'slide1/storage.png' },
    { parameter: 'REGULATORY APPROVALS', usp: 'Approved By EMA, FDA, PMDA', icon: 'slide1/regulatory.png' },
    { parameter: 'REAL WORLD EXPERIENCE', usp: '49M Patient-Years Of Experience', icon: 'slide1/real-world.png' }
  ]
};

var povSelectedItems = [];
var povGameReady = false;
var povAudioContext = null;

function runAnimationWheel() {
  initPoviztraGame();
}

function runAnimationCard() {
  initPoviztraGame();
}

function initPoviztraGame() {
  if (!$('#povGame').length) {
    return;
  }

  povGameReady = true;
  buildPovWheel();
  buildPovButtons();
  bindPovEvents();
  resetPovGame();
}

function buildPovButtons() {
  var list = $('#povParameterList');
  list.empty();

  $.each(POV_GAME_CONFIG.parameters, function (index, item) {
    var btn = $(
      '<button type="button" class="pov-param-btn" data-index="' + index + '">' +
        '<img src="' + item.icon + '" alt="">' +
        '<span>' + item.parameter + '</span>' +
      '</button>'
    );

    btn.find('img').on('error', function () {
      $(this).hide();
    });

    list.append(btn);
  });
}

function bindPovEvents() {
  $(document).off('click.povParam').on('click.povParam', '.pov-param-btn', function () {
    selectPovParameter(parseInt($(this).attr('data-index'), 10), $(this));
  });

  $(document).off('click.povClose').on('click.povClose', '#povPopupClose', function () {
    closePovPopup();
  });

  $(document).off('click.povRetry').on('click.povRetry', '#povRetryBtn', function () {
    resetPovGame();
  });

  $(document).off('click.povProceed').on('click.povProceed', '#povProceedBtn', function () {
    showPovFuturePanel();
  });
}

function buildPovWheel() {
  var g = $('#povWheelPaths');
  var labels = $('#povWheelLabels');

  g.empty();
  labels.empty();

  var cx = 310;
  var cy = 310;
  var outer = 286;
  var inner = 112;
  var gap = 2.2;

  for (var i = 0; i < POV_GAME_CONFIG.maxSelections; i++) {
    var start = -90 + (360 / POV_GAME_CONFIG.maxSelections) * i + gap;
    var end = -90 + (360 / POV_GAME_CONFIG.maxSelections) * (i + 1) - gap;

    var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('id', 'povSegPath' + (i + 1));
    path.setAttribute('class', 'pov-svg-seg');
    path.setAttribute('data-slot', i + 1);
    path.setAttribute('d', describePovArc(cx, cy, inner, outer, start, end));
    path.setAttribute('fill', 'url(#povIdleGrad)');
    path.setAttribute('stroke', '#ffffff');
    path.setAttribute('stroke-width', '4');
    path.setAttribute('filter', 'url(#povGlow)');
    g.append(path);

    var mid = (start + end) / 2;
    var pos = polarToCartesian(cx, cy, 197, mid);

    var label = $(
      '<div class="pov-seg-label empty" data-slot="' + (i + 1) + '" style="left:' + pos.x + 'px;top:' + pos.y + 'px;">' +
        '<div class="pov-seg-no">' + (i + 1) + '</div>' +
        '<div class="pov-seg-param"></div>' +
        '<div class="pov-seg-usp"></div>' +
      '</div>'
    );

    labels.append(label);
  }
}

function polarToCartesian(cx, cy, r, angleDeg) {
  var angleRad = (angleDeg - 90) * Math.PI / 180.0;
  return {
    x: cx + (r * Math.cos(angleRad)),
    y: cy + (r * Math.sin(angleRad))
  };
}

function describePovArc(cx, cy, innerR, outerR, startAngle, endAngle) {
  var startOuter = polarToCartesian(cx, cy, outerR, endAngle);
  var endOuter = polarToCartesian(cx, cy, outerR, startAngle);
  var startInner = polarToCartesian(cx, cy, innerR, startAngle);
  var endInner = polarToCartesian(cx, cy, innerR, endAngle);
  var largeArcFlag = (endAngle - startAngle) <= 180 ? '0' : '1';

  return [
    'M', startOuter.x, startOuter.y,
    'A', outerR, outerR, 0, largeArcFlag, 0, endOuter.x, endOuter.y,
    'L', startInner.x, startInner.y,
    'A', innerR, innerR, 0, largeArcFlag, 1, endInner.x, endInner.y,
    'Z'
  ].join(' ');
}

function selectPovParameter(index, btn) {
  if (povSelectedItems.length >= POV_GAME_CONFIG.maxSelections || btn.hasClass('selected')) {
    return;
  }

  var item = POV_GAME_CONFIG.parameters[index];
  povSelectedItems.push(item);

  btn.addClass('selected pov-button-pop');
  setTimeout(function () {
    btn.removeClass('pov-button-pop');
  }, 450);

  populatePovSegment(povSelectedItems.length, item);
  updatePovCenter();
  playPovSelectSound();
  flashPovGame();

  if (POV_GAME_CONFIG.popupEnabled) {
    showPovPopup(item);
  } else if (povSelectedItems.length >= POV_GAME_CONFIG.maxSelections) {
	$('.pov-param-btn').addClass('selected pov-button-pop');
    setTimeout(function () {
      showPovCompletedState();
    }, 1000);
  }
}

function populatePovSegment(slot, item) {
  var path = $('#povSegPath' + slot);
  var label = $('.pov-seg-label[data-slot="' + slot + '"]');

  path.attr('fill', 'url(#povFillGrad)');
  path.addClass('pov-seg-path-active');

  setTimeout(function () {
    path.removeClass('pov-seg-path-active');
  }, 900);

  label
    .removeClass('empty pov-just-filled pov-long-text pov-extra-long-text')
    .addClass('filled')
    .addClass(getPovWheelTextClass(item));

  label.find('.pov-seg-no').text(slot);
  label.find('.pov-seg-param').text(item.parameter);
  label.find('.pov-seg-usp').text(item.usp);

  /* Re-trigger CSS zoom animation every time a new segment is populated. */
  setTimeout(function () {
    label.addClass('pov-just-filled');
  }, 20);
}


function getPovWheelTextClass(item) {
  var totalLength = (item.parameter + ' ' + item.usp).length;

/*   if (totalLength > 62) {
    return 'pov-extra-long-text';
  }

  if (totalLength > 48) {
    return 'pov-long-text';
  } */

  return '';
}

function updatePovCenter() {
  var percent = povSelectedItems.length * 20;

  $('#povCenterPercent').text(percent + '%');
  $('#povCenterText').html(
    percent === 0 ?
    'SELECT<br>ANY 5<br>PARAMETERS' :
    'CONFIDENCE<br>BUILT'
  );

  $('#povBottomNote').html('<span>' + povSelectedItems.length + ' of 5</span> parameters selected.');

  $('#povCenterCircle').removeClass('pov-center-pop');
  setTimeout(function () {
    $('#povCenterCircle').addClass('pov-center-pop');
  }, 20);
}

/* Popup code is retained. It is disabled through POV_GAME_CONFIG.popupEnabled:false. */
function showPovPopup(item) {
  $('#povPopupIcon').attr('src', item.icon).show().off('error').on('error', function () {
    $(this).hide();
  });

  $('#povPopupParameter').text(item.parameter);
  $('#povPopupUSP').text(item.usp);
  $('#povPopupOverlay').css('display', 'flex').hide().fadeIn(160);
}

function closePovPopup() {
  $('#povPopupOverlay').fadeOut(160, function () {
    if (povSelectedItems.length >= POV_GAME_CONFIG.maxSelections) {
      showPovCompletedState();
    }
  });
}

function showPovCompletedState() {

  setTimeout(function () {
	 $('#povCenterCircle').addClass('final pov-success-pulse');
	 $('#povCenterText').html('<b><span class="poviztraText">Poviztra</span></b> Complete Confidence,<br>Complete Care');
	 playPovSuccessSound();

     $('#povLeftPanel').fadeOut(220, function () {
      $('#povActionPanel').fadeIn(220);
     });

     $('#povBottomNote').html('You chose the parameters. <span>Poviztra delivers the answers.</span>');
  }, 1000);   // 1000 = 1 second delay
  
  flashPovGame(true);
}

function showPovFuturePanel() {
  $('#povActionPanel').fadeOut(160, function () {
    $('#povFutureImage').attr('src', POV_GAME_CONFIG.finalImage).off('error').on('error', function () {
      $(this).hide();
    });

    $('#povFutureText').text(POV_GAME_CONFIG.finalText);

    setTimeout(function () {
      $('#povFuturePanel').fadeIn(320);
    }, 500);
  });
}

function resetPovGame() {
  povSelectedItems = [];

  $('.pov-param-btn').removeClass('selected pov-button-pop');
  $('.pov-svg-seg').attr('fill', 'url(#povIdleGrad)').removeClass('pov-seg-path-active');

  $('.pov-seg-label').each(function () {
    var slot = $(this).attr('data-slot');

    $(this).removeClass('filled pov-just-filled pov-long-text pov-extra-long-text').addClass('empty');
    $(this).find('.pov-seg-no').text(slot);
    $(this).find('.pov-seg-param, .pov-seg-usp').text('');
  });

  $('#povCenterCircle').removeClass('final pov-center-pop pov-success-pulse');
  $('#povCenterPercent').text('0%').show();
  $('#povCenterText').html('SELECT<br>ANY 5<br>PARAMETERS');
  $('#povBottomNote').text('Tap a parameter to begin.');

  $('#povPopupOverlay, #povActionPanel, #povFuturePanel').hide();
  $('#povFutureImage').show();
  $('#povLeftPanel').show();
}

function flashPovGame(isSuccess) {
  var game = $('#povGame');

  game.removeClass('pov-flash pov-success-flash');

  setTimeout(function () {
    game.addClass(isSuccess ? 'pov-success-flash' : 'pov-flash');
  }, 20);

  setTimeout(function () {
    game.removeClass('pov-flash pov-success-flash');
  }, 850);
}

function getPovAudioContext() {
  if (!POV_GAME_CONFIG.soundEnabled) {
    return null;
  }

  try {
    var AudioContextClass = window.AudioContext || window.webkitAudioContext;

    if (!AudioContextClass) {
      return null;
    }

    if (!povAudioContext) {
      povAudioContext = new AudioContextClass();
    }

    if (povAudioContext.state === 'suspended') {
      povAudioContext.resume();
    }

    return povAudioContext;
  } catch (error) {
    return null;
  }
}

function playPovTone(frequency, startTime, duration, volume) {
  var audioCtx = getPovAudioContext();

  if (!audioCtx) {
    return;
  }

  var oscillator = audioCtx.createOscillator();
  var gainNode = audioCtx.createGain();
  var finalVolume = Math.min(volume * POV_GAME_CONFIG.soundVolume, 0.95);

  oscillator.type = 'sine';
  oscillator.frequency.setValueAtTime(frequency, audioCtx.currentTime + startTime);

  gainNode.gain.setValueAtTime(0.0001, audioCtx.currentTime + startTime);
  gainNode.gain.exponentialRampToValueAtTime(finalVolume, audioCtx.currentTime + startTime + 0.02);
  gainNode.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + startTime + duration);

  oscillator.connect(gainNode);
  gainNode.connect(audioCtx.destination);

  oscillator.start(audioCtx.currentTime + startTime);
  oscillator.stop(audioCtx.currentTime + startTime + duration + 0.04);
}

function playPovCustomSound(soundType, fallbackFunction) {
  if (!POV_GAME_CONFIG.soundEnabled) {
    return;
  }

  if (!POV_GAME_CONFIG.useCustomSoundFiles) {
    fallbackFunction();
    return;
  }

  try {
    var soundPath = POV_GAME_CONFIG.customSounds[soundType];
    var audio = new Audio(soundPath);

    audio.volume = Math.min(POV_GAME_CONFIG.soundVolume, 1);
    audio.play().catch(function () {
      fallbackFunction();
    });
  } catch (error) {
    fallbackFunction();
  }
}

function playPovSelectSound() {
  playPovCustomSound('select', function () {
    playPovTone(660, 0, 0.11, 0.22);
    playPovTone(880, 0.06, 0.14, 0.20);
  });
}

function playPovSuccessSound() {
  playPovCustomSound('success', function () {
    playPovTone(523, 0, 0.13, 0.23);
    playPovTone(659, 0.10, 0.15, 0.24);
    playPovTone(784, 0.20, 0.18, 0.25);
    playPovTone(1046, 0.35, 0.24, 0.23);
  });
}
