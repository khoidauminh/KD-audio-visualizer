// The spectrum will shrink the audio stream by conbining 2 halves of them together. Speed is put prior to accuration.
// The complex part of the output is ignored, which means the complex rotaion of the equation is direction-independent on the real axis, and therefore, the minus sign of -2πif can be removed.

function getFreqDomain(buffer, freqMin = 0, freqMax = 200000, freqReso = 1024) {
	return fourierTransform(buffer, freqMin, freqMax, freqReso);
}

function fourierTransform(buffer, freqMin = 0, freqMax = 200000, freqReso = 1024) {
	const 
	bufferLengthH = buffer.length/2;
	
	var 
	freqTable = [],
	combinedBuffer = [];
	
	for (var i = 0 ; i < bufferLengthH ; i++) {
		combinedBuffer.push((buffer[i] + buffer[i+bufferLengthH])/2);
	}
	
	for (var currentBand = 0; currentBand < freqReso ; currentBand++) {
		const 
		bandFreq = (currentBand/freqReso)*(freqMax-freqMin) + freqMin,
		revolutions = bandFreq*pi2;
		
		var
		weight = 0;
				
		for (var sample = 0 ; sample < bufferLengthH ; sample++) {
			weight += Math.cos(revolutions*(sample/bufferLengthH))*combinedBuffer[sample];
		}
		//weight /= bufferLength;
		
		freqTable.push(weight);
	}
	
	return freqTable;
}

// ft but with diferent wave functions.

function ft_nonSineW(buffer, freqMin = 0, freqMax = 200000, freqReso = 1024) {
	const bufferLengthH = buffer.length;
	
	var 
	freqTable = [],
	combinedBuffer = [];
	
	for (var i = 0 ; i < bufferLengthH ; i++) {
		combinedBuffer.push((buffer[i] + buffer[i+bufferLengthH])/2);
	}
	
	for (var currentBand = 0; currentBand < freqReso ; currentBand++) {
		const 
		bandFreq = (currentBand/freqReso)*(freqMax-freqMin) + freqMin,
		revolutions = bandFreq*pi2;
		
		var
		weight = 0;
				
		for (var sample = 0 ; sample < bufferLengthH ; sample += 2) {
			weight += trianglew(revolutions*(sample/bufferLengthH))*combinedBuffer[sample];
		}
		//weight /= bufferLength;
		
		freqTable.push(weight);
	}
	
	return freqTable;
}

// these are for testing purposes and probably useless at the moment.

function generateSineWave(freq = 100, vol = 1, dur = 1024, existingStream = []) {
	const revolutions = freq*Math.PI;
	if (existingStream.length > 0) {
		for (var sample = 0 ; sample < dur ; sample++) {
			existingStream[sample] += Math.sin(revolutions*(sample/dur))*vol;
		}
		return existingStream;
	} else {
		var stream = [];
		for (var sample = 0 ; sample < dur ; sample++) {
			stream.push(Math.sin(revolutions*(sample/dur))*vol);
		}
		return stream;
	}
}


function generateSquareWave(freq = 100, vol = 1, dur = 1024, existingStream = []) {
	const pulse = freq*Math.PI/2;

	const flip = (pos, flip) => {
		if (pos < flip) return 1;
		else 			return 0;
	};
	
	if (existingStream.length > 0) {
		for (var sample = 0 ; sample < dur ; sample++) {
			existingStream[sample] += flip(sample/dur, pulse)*vol;
		}
		return existingStream;
	} else {
		var stream = [];
		for (var sample = 0 ; sample < dur ; sample++) {
			stream.push(flip(sample/dur, pulse)*vol);
		}
		return stream;
	}
}


