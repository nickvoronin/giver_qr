export default class Info {
	constructor() {
		this._init();
	}
	_init() {
		this.data = null;
		this.error = null;
		this.isScanning = false;
	}

	scan() {
		this.result.isScanning = true;
	}
}
