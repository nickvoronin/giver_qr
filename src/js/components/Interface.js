/**
* @module UI module
*/
export default class Interface {
	constructor() {
		this.loginScreen = document.querySelector('.screen__login');
		this.scannerScreen = document.querySelector('.screen__scanner');
		this.infoScreen = document.querySelector('.screen__info');

		this.showLoginScreen();
	}

	/**
	 * @param  {HTMLElement} element
	 * @private
	 */
	_hideElement(element) {
		element.classList.add('invisible');
	}

	/**
	 * @param  {HTMLElement} element
	 * @private
	 */
	_showElement(element) {
		element.classList.remove('invisible');
	}

	showLoginScreen() {
		this._hideElement(this.scannerScreen);
		this._hideElement(this.infoScreen);
		this._showElement(this.loginScreen);
	}

	showScannerScreen() {
		this._hideElement(this.loginScreen);
		this._hideElement(this.infoScreen);
		this._showElement(this.scannerScreen);
	}

	showQRInfoScreen() {
		this._hideElement(this.loginScreen);
		this._hideElement(this.scannerScreen);
		this._showElement(this.infoScreen);
	}

}
