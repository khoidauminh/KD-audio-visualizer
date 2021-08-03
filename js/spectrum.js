function getFreqDomain(buffer, freqMin = 0, freqMax = 200000, freqReso = 1024) {
	const 
	bufferLength = buffer.length;
	
	var 
	freqTable = [];
	
	for (var currentBand = 0; currentBand < freqReso ; currentBand++) {
		const 
		bandFreq = map(currentBand, 0, freqReso, freqMin, freqMax),
		revolutions = bandFreq*Math.PI;
		
		var
		weight = 0;
				
		for (var sample = 0 ; sample < bufferLength ; sample++) {
			weight += Math.cos(-revolutions*(sample/l))*buffer[sample];
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


