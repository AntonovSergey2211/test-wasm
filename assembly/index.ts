export function transform(length: u32, rm: f32, gm: f32, bm: f32, am: f32, ro: f32, go: f32, bo: f32, ao: f32): void {
	for (let i: u32 = 0; i < length; i += 4) {
		const r = load<u8>(i) as f32;
		store<u8>(i, <u8>max(min(r * rm + ro, 0xff), 0));
		i++;

		const g = load<u8>(i) as f32;
		store<u8>(i, <u8>max(min(g * gm + go, 0xff), 0));
		i++;

		const b = load<u8>(i) as f32;
		store<u8>(i, <u8>max(min(b * bm + bo, 0xff), 0));
		i++;

		const a = load<u8>(i) as f32;
		store<u8>(i, <u8>max(min(a * am + ao, 0xff), 0));
	}
}