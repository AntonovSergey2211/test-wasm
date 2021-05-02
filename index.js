const fs = require("fs");
const loader = require("@assemblyscript/loader");
const byteSize = 2880 * 1800 * 4;
const initial = ((byteSize + 0xffff) & ~0xffff) >>> 16;
console.log('byteSize', byteSize);
console.log('initial', initial);
const memory = new WebAssembly.Memory({ initial });
const imports = {
	env: {
		memory
	}
};
const wasmModule = loader.instantiateSync(fs.readFileSync(__dirname + "/build/untouched.wasm"), imports);
module.exports = wasmModule.exports;
