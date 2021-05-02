export function transform(length: u32, rm: f32, gm: f32, bm: f32, am: f32, ro: f32, go: f32, bo: f32, ao: f32): void {
	for (let i: u32 = 0; i < length; i += 4) {
		store<u8>(i, toU8(load<u8>(i) * rm + ro));
		i++;
		store<u8>(i, toU8(load<u8>(i) * gm + go));
		i++;
		store<u8>(i, toU8(load<u8>(i) * bm + bo));
		i++;
		store<u8>(i, toU8(load<u8>(i) * am + ao));
	}
}

// export function test(v: f32): u8 {
// 	if (v < 0) v = 0;
// 	else if (v >= 0xff) v = 0xff;
// 	return <u8>v;
// }

@inline
export function toU8(v: f32): u8 {
	return max(min(v, 0xff),0) as u8;
}
