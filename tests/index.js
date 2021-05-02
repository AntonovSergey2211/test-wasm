const assert = require("assert");
const myModule = require("..");

const memoryArray = new Uint8Array(myModule.memory.buffer);

const pixels = Uint8Array.from([1, 2, 3, 4, 5, 6, 7, 8]);
console.log('source', pixels);

const length = pixels.length;

for (let i = 0; i < length; i++) {
	memoryArray[i] = pixels[i];
}

myModule.transform(length, 0, 1, 2, 1, 10, 0, -1, 0);

for (let i = 0; i < length; i++) {
	pixels[i] = memoryArray[i];
}

console.log('result', pixels);
console.log('memoryArray.length', memoryArray.length);
console.log('memory.length', myModule.memory.buffer.byteLength);
myModule.memory.grow(1);
console.log('memory.length', myModule.memory.buffer.byteLength);
console.log("ok");
