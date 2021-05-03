const assert = require("assert");
const myModule = require("..");

const memoryArray = new Uint8Array(myModule.memory.buffer);

let count = 2880 * 1800 * 4;
const pixels = new Uint8Array(count);

for (let j = 0; j < count; j++) {
	pixels[j] = (Math.random() * 0xff);
}

let time;
//console.log('source', pixels);

time = Date.now();
transformJS(pixels, 0, 1, 2, 1, 10, 0, -1, 0);// 20
console.log('js', Date.now() - time);

time = Date.now();
transformWasm(pixels, 0, 1, 2, 1, 10, 0, -1, 0);//125 127 128
console.log('wasm', Date.now() - time);

let summ = 0;
for (let i = 0; i < pixels.length; i++) {
	summ += pixels[i];
}
console.log('summ', summ);

// console.log('memoryArray.length', memoryArray.length);
// console.log('memory.length', myModule.memory.buffer.byteLength);
// myModule.memory.grow(1);
// console.log('memory.length', myModule.memory.buffer.byteLength);
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