export function transform(length: u32, rm: f32, gm: f32, bm: f32, am: f32, ro: f32, go: f32, bo: f32, ao: f32): void {
	for (let i: u32 = 0; i < length; i += 4) {
		const r = load<u8>(i) as f32;
		store<u8>(i, <u8>(r * rm + ro));
		i++;

		const g = load<u8>(i) as f32;
		store<u8>(i, <u8>(g * gm + go));
		i++;

		const b = load<u8>(i) as f32;
		store<u8>(i, <u8>(b * bm + bo));
		i++;

		const a = load<u8>(i) as f32;
		store<u8>(i, <u8>(a * am + ao));
	}
}

// export function test(v: f32): u8 {
// 	if (v < 0) v = 0;
// 	else if (v >= 0xff) v = 0xff;
// 	return <u8>v;
// }

// @inline
// export function toU8(v: f32): u8 {
// 	return max(min(v, 0xff),0) as u8;
// }
