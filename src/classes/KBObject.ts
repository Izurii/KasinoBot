class KBObject {

	public static ERROR_UNKNOW = 9999;

	public data: any;
	protected constructor() {
		this.data = [];
	}

	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
	public static loadWithData(data: any): KBObject {
		const obj = new this();
		obj.data = data[0];
		return obj;
	}

}

export { KBObject };