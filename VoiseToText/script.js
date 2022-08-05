try {

  var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  var recognition = new SpeechRecognition();
}
catch(e) {
  console.error(e);
  $('.no-browser-support').show();
  $('.app').hide();
}
 
 
var noteTextarea = $('#note-textarea');
var instructions = $('#recording-instructions');

 
var noteContent = '';

 recognition.lang='ar';

recognition.continuous = true;
recognition.onresult = function(event) {
 
  var current = event.resultIndex;
  var transcript = event.results[current][0].transcript;
  var mobileRepeatBug = (current == 1 && transcript == event.results[0][0].transcript);
 
  if(!mobileRepeatBug) {
    noteContent += transcript;
    noteTextarea.val(noteContent);
  }
};
 
recognition.onstart = function() {
  instructions.text(' حاول التجدث الان');
}
 
recognition.onspeechend = function() {
  instructions.text('لقد تم إيقافه تلقائيا');
}
 
recognition.onerror = function(event) {
  if(event.error == 'no-speech') {
    instructions.text('لم يتعرف علي الكلام حتول مجددا عزيزي');  
  };
}
 
$('#start-record-btn').on('click', function(e) {
  if (noteContent.length) {
    noteContent += ' ';
  }
  recognition.start();
});
 
 
$('#pause-record-btn').on('click', function(e) {
  recognition.stop();
  instructions.text('تم إيقاف التسجيل ');
});


noteTextarea.on('input', function() {
  noteContent = $(this).val();
})

 
function readOutLoud(message) {
var speech = new SpeechSynthesisUtterance();
 
speech.text = message;
speech.volume = 1;

speech.rate = 1;
speech.pitch = 1;
  
window.speechSynthesis.speak(speech);
}
 