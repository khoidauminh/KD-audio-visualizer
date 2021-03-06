function visualize(canvas, bufferL, bufferR, display, settings) {
	switch (display) {
		case 'spectrum':
			drawSpectrum(canvas, bufferL, bufferR, settings);
			break;
		case 'waveform':
			drawWaveform(canvas, bufferL, bufferR, settings);
			break;
		case 'sonogram':
			drawSonogram(canvas, bufferL, bufferR, settings);
			break;
		default:
	}
}

function drawWaveform(canvas, bufferL, bufferR, settings) {
	var ctx = canvas.getContext('2d');
	
	//console.log(stream[0]);
	//ctx.fillStyle = '#000000';
	//ctx.fillRect(0, 0, 256, 256);
	//ctx.fillStyle = '#00ff00';
	//var prePos = 0, xPrePos = 0;
	//ctx.moveTo(0, 0);
	
	const
	shiftData = ctx.getImageData(0, 0, canvas.width, canvas.height),
	shiftingRange = canvas.width*settings.w,
	shiftedX = canvas.width - shiftingRange,
	amp = settings.h/10,
	length = bufferL.length;
	
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	
	ctx.fillStyle = '#000000';
	//ctx.fillRect(0, 0, canvas.width, canvas.height);
	ctx.putImageData(shiftData, -shiftingRange, 0);
	
	ctx.moveTo(0, canvas.width/2);
	ctx.beginPath();
	
	ctx.strokeStyle = '#00AA00';
	for (var i = 0; i < length ; i++) {
		
		const 
		y = map(bufferL[i]*amp, -1, 1, 0, canvas.height),
		x = map(i, 0, length, shiftedX, canvas.width);
		
		ctx.lineTo(x, y);
	}
	ctx.stroke();
	ctx.closePath();
	
	ctx.moveTo(0, canvas.width/2);
	ctx.beginPath();
	ctx.strokeStyle = '#0000AA';
	for (var i = 0 ; i < length ; i++) {
		
		const 
		y = map(bufferR[i]*amp, -1, 1, 0, canvas.height),
		x = map(i, 0, length, shiftedX, canvas.width);
		
		ctx.lineTo(x, y);
	}
	
	ctx.stroke();
	ctx.closePath();
}

function drawSpectrum(canvas, bufferL, bufferR, settings) {
	var 
	ctx = canvas.getContext('2d');
	const
	freqResoH = settings.reso/2,
	freqTableL = getFreqDomain(bufferL, settings.minF, settings.maxF, freqResoH),
	freqTableR = getFreqDomain(bufferR, settings.minF, settings.maxF, freqResoH);
	
	settings.L = smoothing(settings.L, freqTableL, settings.s);
	settings.R = smoothing(settings.R, freqTableR, settings.s);
	
	const 
	fL = freqResoH/2,
	barDis = canvas.height/fL,
	barDisH = barDis/1.5;
	
	ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	
	for (var i = 0 ; i < fL; i++) {
		const 	
		x = (i/fL)*canvas.width*2,
		heightL = (.75+i/fL)*settings.L[i]*settings.h*4,
		heightR = (.75+i/fL)*settings.R[i]*settings.h*4;
		
		ctx.fillStyle = '#00AA00';
		ctx.fillRect(x, canvas.height-heightL, barDisH, heightL);
		ctx.fillStyle = '#0000AA';
		ctx.fillRect(x+barDis, canvas.height-heightR, barDisH, heightR);
		
		//console.log('a');
	}

}

function drawSonogram(canvas, bufferL, bufferR, settings) {
	var ctx = canvas.getContext('2d');
	
	const
	freqResoH = settings.reso/2,
	freqTableL = getFreqDomain(bufferL, settings.minF, settings.maxF, freqResoH),
	freqTableR = getFreqDomain(bufferR, settings.minF, settings.maxF, freqResoH),
	shiftData = ctx.getImageData(0, 0, canvas.width, canvas.height),
	shiftingRange = canvas.width*settings.w/3,
	x = canvas.width - shiftingRange,
	streamLength = bufferL.length,
	freqTaLength = freqTableL.length/2,
	prevColorX = x-10,
	barDis = canvas.height/freqTaLength,
	barDisH = barDis/1.5;
	
	ctx.fillStyle = '#000000';
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	ctx.putImageData(shiftData, -shiftingRange, 0);
	
	for (var i = 0 ; i < freqTaLength ; i++) {
		const 
		y = (i/freqTaLength)*canvas.height*2,
		pos = freqTaLength - i -1;
		//color1 = ctx.getImageData(prevColorX, y, 1, 1).data[1],
		//color2 = clamp(0, (1 + 6*pos/freqTaLength)*freqTable[pos]*16000, 255);
		
		ctx.fillStyle = 'rgb(0, ' + clamp(0, (1 + 6*pos/freqTaLength)*freqTableL[pos]*settings.h*6, 255) + ', 0)';
		ctx.fillRect(x, y, shiftingRange, barDisH);
		
		ctx.fillStyle = 'rgb(0, 0, ' + clamp(0, (1 + 6*pos/freqTaLength)*freqTableR[pos]*settings.h*6, 255) + ')';
		ctx.fillRect(x, y+barDis, shiftingRange, barDisH);
	}
	
}

/* 

const 
		y = (i/freqTaLength)*canvas.height,
		pos = freqTaLength - i -1,
		color1 = ctx.getImageData(colorPickAtX, y, 1, 1).data[1],
		color2 = clamp(0, (1 + 6*pos/freqTaLength)*freqTable[pos]*16000, 255),
		colorDif = color2-color1;
	
		//var currentColor = 0;
	
		// cosine color interpolation. (not used).
		// liner color interpolation (using gradient).

		//currentColor = color1 + (-Math.cos(i/shiftingRange*Math.PI)/2 + 0.5)*colorDif;
		
		//console.log(color1);
		
		
		var grd = ctx.createLinearGradient(0, 0, shiftingRange, 0);
		
		grd.addColorStop(0, `rgb(0, ${color1}, 0)`);
		grd.addColorStop(1, `rgb(0, ${color2}, 0)`);
		
		
		ctx.fillStyle = 'rgb(0, ${color2}, 0)';
		ctx.fillRect(x, y, shiftingRange, 2);
*/
