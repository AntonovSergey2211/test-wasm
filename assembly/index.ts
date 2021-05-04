export function transform(length: u32, rm: f32, gm: f32, bm: f32, am: f32, ro: f32, go: f32, bo: f32, ao: f32): void {
	for (let i: u32 = 0; i < length; i += 4) {
		const r = load<u8>(i) as f32;
		store<u8>(i, <i32>(r * rm + ro));
		i++;

		const g = load<u8>(i) as f32;
		store<u8>(i, <i32>(g * gm + go));
		i++;

		const b = load<u8>(i) as f32;
		store<u8>(i, <i32>(b * bm + bo));
		i++;

		const a = load<u8>(i) as f32;
		store<u8>(i, <i32>(a * am + ao));
	}
}