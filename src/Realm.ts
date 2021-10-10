export class Realm {
	public intrinsics: any;
	public globalThis: any;
	public globalEnv: any;
	public templateMap: any;
}

export function CreateRealm() {
	return new Realm();
}
