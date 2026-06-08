/* Poviztra Open Challenge Game - all editable content is kept here */
var POV_GAME_CONFIG = {
  maxSelections: 5,
  finalImage: 'slide1/final-image.png',
  finalText: 'Future provision text can be edited here.',
  parameters: [
    { parameter:'QUALITY', usp:'rDNA Technology', icon:'slide1/quality.png' },
    { parameter:'ACCESSIBILITY', usp:'Starts 3999/- Onwards', icon:'slide1/accessibility.png' },
    { parameter:'DEVICE EXPERIENCE', usp:'FlexTouch Device', icon:'slide1/device.png' },
    { parameter:'CLINICAL FINDINGS', usp:'50 Phase 3 Clinical Trials Conducted', icon:'slide1/clinical.png' },
    { parameter:'CARDIOVASCULAR OUTCOMES', usp:'Score Trial And Steer Trials', icon:'slide1/cardiovascular.png' },
    { parameter:'STORAGE & TRANSPORT', usp:'Robust & Reliable Cold-Chain', icon:'slide1/storage.png' },
    { parameter:'REGULATORY APPROVALS', usp:'Approved By EMA, FDA, PMDA', icon:'slide1/regulatory.png' },
    { parameter:'REAL WORLD EXPERIENCE', usp:'49M Patient-Years Of Experience', icon:'slide1/real-world.png' }
  ]
};

var povSelectedItems = [];
var povGameReady = false;

function runAnimationWheel(){ initPoviztraGame(); }
function runAnimationCard(){ initPoviztraGame(); }

function initPoviztraGame(){
  if(!$('#povGame').length){ return; }
  povGameReady = true;
  buildPovWheel();
  buildPovButtons();
  bindPovEvents();
  resetPovGame();
}

function buildPovButtons(){
  var list = $('#povParameterList');
  list.empty();
  $.each(POV_GAME_CONFIG.parameters,function(index,item){
    var btn = $('<button type="button" class="pov-param-btn" data-index="'+index+'"><img src="'+item.icon+'" alt=""><span>'+item.parameter+'</span></button>');
    btn.find('img').on('error',function(){ $(this).hide(); });
    list.append(btn);
  });
}

function bindPovEvents(){
  $(document).off('click.povParam').on('click.povParam','.pov-param-btn',function(){
    selectPovParameter(parseInt($(this).attr('data-index'),10),$(this));
  });
  $(document).off('click.povClose').on('click.povClose','#povPopupClose',function(){ closePovPopup(); });
  $(document).off('click.povRetry').on('click.povRetry','#povRetryBtn',function(){ resetPovGame(); });
  $(document).off('click.povProceed').on('click.povProceed','#povProceedBtn',function(){ showPovFuturePanel(); });
}

function buildPovWheel(){
  var g = $('#povWheelPaths');
  var labels = $('#povWheelLabels');
  g.empty();
  labels.empty();
  var cx=310, cy=310, outer=286, inner=112, gap=2.2;
  for(var i=0;i<POV_GAME_CONFIG.maxSelections;i++){
    var start = -90 + (360/POV_GAME_CONFIG.maxSelections)*i + gap;
    var end = -90 + (360/POV_GAME_CONFIG.maxSelections)*(i+1) - gap;
    var path = document.createElementNS('http://www.w3.org/2000/svg','path');
    path.setAttribute('id','povSegPath'+(i+1));
    path.setAttribute('class','pov-svg-seg');
    path.setAttribute('data-slot',i+1);
    path.setAttribute('d',describePovArc(cx,cy,inner,outer,start,end));
    path.setAttribute('fill','url(#povIdleGrad)');
    path.setAttribute('stroke','#ffffff');
    path.setAttribute('stroke-width','4');
    path.setAttribute('filter','url(#povGlow)');
    g.append(path);
    var mid = (start+end)/2;
    var pos = polarToCartesian(cx,cy,205,mid);
    var label = $('<div class="pov-seg-label empty" data-slot="'+(i+1)+'" style="left:'+pos.x+'px;top:'+pos.y+'px;"><div class="pov-seg-no">'+(i+1)+'</div><div class="pov-seg-param"></div><div class="pov-seg-usp"></div></div>');
    labels.append(label);
  }
}

function polarToCartesian(cx,cy,r,angleDeg){
  var angleRad=(angleDeg-90)*Math.PI/180.0;
  return {x:cx+(r*Math.cos(angleRad)), y:cy+(r*Math.sin(angleRad))};
}
function describePovArc(cx,cy,innerR,outerR,startAngle,endAngle){
  var startOuter=polarToCartesian(cx,cy,outerR,endAngle);
  var endOuter=polarToCartesian(cx,cy,outerR,startAngle);
  var startInner=polarToCartesian(cx,cy,innerR,startAngle);
  var endInner=polarToCartesian(cx,cy,innerR,endAngle);
  var largeArcFlag=(endAngle-startAngle)<=180?'0':'1';
  return ['M',startOuter.x,startOuter.y,'A',outerR,outerR,0,largeArcFlag,0,endOuter.x,endOuter.y,'L',startInner.x,startInner.y,'A',innerR,innerR,0,largeArcFlag,1,endInner.x,endInner.y,'Z'].join(' ');
}

function selectPovParameter(index,btn){
  if(povSelectedItems.length>=POV_GAME_CONFIG.maxSelections || btn.hasClass('selected')){ return; }
  var item = POV_GAME_CONFIG.parameters[index];
  povSelectedItems.push(item);
  btn.addClass('selected');
  populatePovSegment(povSelectedItems.length,item);
  updatePovCenter();
  showPovPopup(item);
}
function populatePovSegment(slot,item){
  $('#povSegPath'+slot).attr('fill','url(#povFillGrad)');
  var label = $('.pov-seg-label[data-slot="'+slot+'"]');
  label.removeClass('empty').addClass('filled');
  label.find('.pov-seg-no').text(slot);
  label.find('.pov-seg-param').text(item.parameter);
  label.find('.pov-seg-usp').text(item.usp);
}
function updatePovCenter(){
  var percent = povSelectedItems.length*20;
  $('#povCenterPercent').text(percent+'%');
  $('#povCenterText').html(percent===0?'SELECT<br>ANY 5<br>PARAMETERS':'CONFIDENCE<br>BUILT');
  $('#povBottomNote').html('<span>'+povSelectedItems.length+' of 5</span> parameters selected.');
}
function showPovPopup(item){
  $('#povPopupIcon').attr('src',item.icon).show().off('error').on('error',function(){ $(this).hide(); });
  $('#povPopupParameter').text(item.parameter);
  $('#povPopupUSP').text(item.usp);
  $('#povPopupOverlay').css('display','flex').hide().fadeIn(160);
}
function closePovPopup(){
  $('#povPopupOverlay').fadeOut(160,function(){
    if(povSelectedItems.length>=POV_GAME_CONFIG.maxSelections){ showPovCompletedState(); }
  });
}
function showPovCompletedState(){
  $('#povCenterCircle').addClass('final');
  $('#povCenterText').html('<b>Poviztra</b>Complete Confidence,<br>Complete Care');
  $('#povLeftPanel').fadeOut(220,function(){ $('#povActionPanel').fadeIn(220); });
  $('#povBottomNote').html('You chose the parameters. <span>Poviztra delivers the answers.</span>');
}
function showPovFuturePanel(){
  $('#povActionPanel').fadeOut(160,function(){
    $('#povFutureImage').attr('src',POV_GAME_CONFIG.finalImage).off('error').on('error',function(){ $(this).hide(); });
    $('#povFutureText').text(POV_GAME_CONFIG.finalText);
    setTimeout(function(){ $('#povFuturePanel').fadeIn(320); },2000);
  });
}
function resetPovGame(){
  povSelectedItems=[];
  $('.pov-param-btn').removeClass('selected');
  $('.pov-svg-seg').attr('fill','url(#povIdleGrad)');
  $('.pov-seg-label').each(function(){
    var slot=$(this).attr('data-slot');
    $(this).removeClass('filled').addClass('empty');
    $(this).find('.pov-seg-no').text(slot);
    $(this).find('.pov-seg-param,.pov-seg-usp').text('');
  });
  $('#povCenterCircle').removeClass('final');
  $('#povCenterPercent').text('0%').show();
  $('#povCenterText').html('SELECT<br>ANY 5<br>PARAMETERS');
  $('#povBottomNote').text('Tap a parameter to begin.');
  $('#povPopupOverlay,#povActionPanel,#povFuturePanel').hide();
  $('#povFutureImage').show();
  $('#povLeftPanel').show();
}
