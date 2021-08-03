
// this is just a browser check to see
// if it supports AudioContext and getUserMedia
window.AudioContext = window.AudioContext ||  window.webkitAudioContext;
navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia;

const constraints = { audio : true };

function processAudio(audioContext, canvas, stream, buffer, display, settings) {
	var source = audioContext.createMediaStreamSource(stream);
	const BUFFER_LENGTH = buffer;
	var bufferL = [], bufferR = [], node, flip = 0, refreshRate = 70;
	
	if(!audioContext.createScriptProcessor){
       node = audioContext.createJavaScriptNode(BUFFER_LENGTH, 2, 2);
    } else {
       node = audioContext.createScriptProcessor(BUFFER_LENGTH, 2, 2);
    }
    
    node.onaudioprocess = function(e){
      bufferL = e.inputBuffer.getChannelData(0);
      bufferR = e.inputBuffer.getChannelData(1);
    }

    // connect the ScriptProcessorNode with the input audio
    source.connect(node);
    // if the ScriptProcessorNode is not connected to an output the "onaudioprocess" event is not triggered in chrome
    node.connect(audioContext.destination);
    
    setInterval(() => { flip = visualize(canvas, bufferL, bufferR, flip, display.d, settings); }, 20);
    
  
}


async function initAudioInput(canvas, constraints, buffer, display, settings) {
	let stream = null;

	//audioContext.start();
	
	var audioContext = new(window.AudioContext || window.webkitAudioContext)();
	var SAMPLE_RATE = audioContext.sampleRate;


	try {
	  
		stream = await navigator.mediaDevices.getUserMedia(constraints);
    
		processAudio(audioContext, canvas, stream, buffer, display, settings);
    
	} catch(err) {
		console.log("Error : ", err);
	}
}



