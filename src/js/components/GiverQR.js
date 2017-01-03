import Interface from './Interface.js';
import Login from './Login.js';
import Scanner from './Scanner.js';

/**
 * @class GiverQR class with main loop
 */
export default class GiverQR {
	/**
	 * @constructor
	 */
	constructor() {
		this.start();
	}

	start() {
		this._initNewSession();
	}

	/**
	 * Запуск приложения
	 *
	 * @private
	 */
	_initNewSession() {
		document.body.addEventListener('click', this.onClick.bind(this));
		this.interface = new Interface();
		this.login = new Login();
		this.scanner = new Scanner();
		if (this.login.status === 'connected') {
			this.interface.showScannerScreen();
		}
	}


	/**
	 * Обработка событий клика по кнопкам меню
	 *
	 * @param	{Event} click event
	 */
	onClick(event) {
		event.preventDefault();

		switch (event.target.dataset.action) {
			case 'login':
				this.interface.showScannerScreen();
				break;
			case 'info':
				this.interface.showQRInfoScreen();
				break;
			case 'scan':
				this.interface.showScannerScreen();
				break;
			default:
				break;
		}
	}
}
