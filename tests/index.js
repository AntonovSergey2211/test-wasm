const assert = require("assert");
const myModule = require("..");

const memoryArray = new Uint8Array(myModule.memory.buffer);

let count = 2880 * 1800 * 4;
const pixels = new Uint8Array(count);

for (let j = 0; j < count; j++) {
	pixels[j] = (Math.random() * 0xff);
}

const pixelsJS = pixels.slice(0, count);
const pixelsWasm = pixels.slice(0, count);

const rm = 0;
const gm = 1;
const bm = 0.5;
const am = 1;
const ro = 128;
const go = -64;
const bo = 0;
const ao = 0;

let time;

time = Date.now();
transformJS(pixelsJS, rm, gm, bm, am, ro, go, bo, ao);
console.log('js', Date.now() - time);

time = Date.now();
transformWasm(pixelsWasm, rm, gm, bm, am, ro, go, bo, ao);
console.log('wasm', Date.now() - time);

for (let i = 0; i < count; i++) {
	try {
		//console.log(i, pixelsJS[i], pixelsWasm[i]);
		assert(pixelsJS[i] === pixelsWasm[i], 'Incorrect result');
	} catch (e) {
		throw `Incorrect values: index: ${i}, source: ${pixels[i]}, JS: ${pixelsJS[i]} ', WASM: ' ${pixelsWasm[i]}`;
	}
}

console.log("ok");

function transformWasm(pixels, rm, gm, bm, am, ro, go, bo, ao) {
	const length = pixels.length;

	for (let i = 0; i < length; i++) {
		memoryArray[i] = pixels[i];
	}

	myModule.transform(length, rm, gm, bm, am, ro, go, bo, ao);

	for (let i = 0; i < length; i++) {
		pixels[i] = memoryArray[i];
	}
}

function transformJS(pixels, rm, gm, bm, am, ro, go, bo, ao) {
	const length = pixels.length;
	for (let i = 0; i < length; i += 4) {
		pixels[i] = pixels[i++] * rm + ro;
		pixels[i] = pixels[i++] * gm + go;
		pixels[i] = pixels[i++] * bm + bo;
		pixels[i] = pixels[i] * am + ao;
	}
}