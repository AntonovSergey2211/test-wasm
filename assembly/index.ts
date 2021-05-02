export function transform(length: u32, rm: f64, gm: f64, bm: f64, am: f64, ro: f64, go: f64, bo: f64, ao: f64): void {
	for (let i: u32 = 0; i < length; i += 4) {
		store<u8>(i, (load<u8>(i) * rm + ro) as u8);
		i++;
		store<u8>(i, (load<u8>(i) * gm + go) as u8);
		i++;
		store<u8>(i, (load<u8>(i) * bm + bo) as u8);
		i++;
		store<u8>(i, (load<u8>(i) * am + ao) as u8);
		i++;
	}
}
