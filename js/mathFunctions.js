const pi2 = 2*Math.PI;

function map(value, inMin = -1, inMax = 1, outMin = 0, outMax = 1) {
	var middle = clamp(inMin, value, inMax);
		
	return ((middle - inMin)/(inMax - inMin))*(outMax - outMin) + outMin;
} 
/*
function clamp(min, x, max) {
	if (x < min) return min;
	if (x > max) return max;
	return x;
}
*/
function clamp(min, x, max) {
	return Math.max(min, Math.min(x, max));
}

function forceMono(bufferL, bufferR) {
	const l = bufferL.length;
	var out = [];
	for (var i = 0 ; i < l ; i++) {
		out.push((bufferL[i] + bufferR[i])/2);
	}
	return out;
}

function trianglew(angle) {
	return 2*Math.abs(-(angle % pi2)/Math.PI+1)-1;
}

function squarew(angle) {
	if (angle % pi2 > Math.PI) return -1;
	return 1;
}

// amount sits in range [0..1]
function average(a, b, amount) {
	const dif = b - a;
	return [a + dif*amount, b - dif*amount]; 
}

function smoothing(mainArr, newArr, amount) {
	var c = [];
	const l = mainArr.length;
	mainArr.forEach((item, index) => {
		//const dif = arrayB[index] - item;
		c.push(item + (newArr[index] - item)*amount);
	});
	return c;
}

function toColorIndice(x, y, width) {
	const red = (y*width + x)*4;
	return [red, red+1, red+2, red+3];
}

function getRedIndice(x, y, width) {
	return (y*width + x)*4;
}

function getGreenIndice(x, y, width) {
	return (y*width + x)*4 +1;
}

function getBlueIndice(x, y, width) {
	return (y*width + x)*4 +2;
}

function getAlphaIndice(x, y, width) {
	return (y*width + x)*4 +3;
}
