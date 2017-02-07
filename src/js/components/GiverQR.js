import Adeon from './Adeon.js';
import Interface from './Interface.js';

export default class GiverQR {
	
	constructor() {
		
		window.addEventListener("error", (evt) => {
			 if (evt.message) { // Chrome sometimes provides this
			  alert("error: "+evt.message +" at linenumber: "+evt.lineno+" of file: "+evt.filename);
			} else {
			  alert("error: "+evt.type+" from element: "+(evt.srcElement || evt.target));
			}
		}, true);
		
		this.setState('init');
	}

	supportTable() {
		let client = new ClientJS(); // Create A New Client Object
		let userAgent = client.getUserAgent(); // Get User Agent String
		let	
			a = this.Adeon.isCanvasSupported() ? '<FONT COLOR="00b200">true</FONT>' : '<FONT COLOR="b20000">false</FONT>',
			b = window.File ? '<FONT COLOR="00b200">true</FONT>' : '<FONT COLOR="b20000">false</FONT>',
			c = window.FileReader ? '<FONT COLOR="00b200">true</FONT>' : '<FONT COLOR="b20000">false</FONT>',
			e = this.Adeon.isPromiseSupported() ? '<FONT COLOR="00b200">true</FONT>' : '<FONT COLOR="b20000">false</FONT>',
			f = this.Adeon.isGetUserMediaSupported() ? '<FONT COLOR="00b200">true</FONT>' : '<FONT COLOR="b20000">false</FONT>',
			g = this.Adeon.isMediaDevicesSupported() ? '<FONT COLOR="00b200">true</FONT>' : '<FONT COLOR="b20000">false</FONT>'
		;
		
		return '<br><b>window.File:</b> '+b+' (JS)'+
			'<br><b>window.FileReader:</b> '+c+' (JS)'+
			'<br><b>Promise:</b> '+e+ ' (JS)'+
			'<br><b>canvas:</b> '+a+' (HTML5)'+
			'<br><b>getUserMedia:</b> '+f+' (JS)'+
			'<br><b>getMediaDevices:</b> '+g+' (JS)'+
			'<br><br>' + userAgent;
	}
	
	setState(stateName) {
		if(this.stream && this.state == 'stream' && stateName != 'stream') {
			this.stream.getTracks().forEach(item => {
				item.stop();
			});
		}
		
		this.state = stateName;
		
		switch(stateName) {
			case 'init':
				this.Interface = new Interface();
				this.Adeon = new Adeon();

				if(!this.Adeon.isSecured()) {	
					this.Interface.toggleModalBoxLayout(true, '<b>Внимание:</b> Для работы приложения необходим защищённый <b>https</b> протокол шифрования.', false);
					return;
				}
			
				if(!window.File || !window.FileReader || !this.Adeon.isPromiseSupported()) {
					this.Interface.toggleModalBoxLayout(true, '<b>Внимание:</b> Ваше приложение не поддерживает некоторые возможности.<br>'+ this.supportTable(), false);
					return;
				}
				
				this.Interface.fixContent();

				window.addEventListener("orientationchange", () => {
					this.Interface.fixContent();
				});
				
				document.body.addEventListener('click', this.onClick.bind(this));
				
				this.Interface.uploadInput.onchange = this.onUploadInputFileChange.bind(this);
				qrcode.callback = this.onQrCodeDecodeAttept.bind(this);
	
				if(Date.now() < localStorage.getItem("expDate")) {
					this.setState(localStorage.getItem("curState"));
				}
				else {
					this.setState('auth');
				}
	
				break;
				
			case 'auth':
				this.Interface.toggleAuthLayout(true);
				break;
				
			case 'auth-request':
				this.Interface.toggleFormInputs("authForm", false);
				this.Interface.toggleLoadingLayout(true);
				/*
				this.Adeon.sleep(1000).then(() => {
					fetch("https://google.com", {
						method: "POST",
						body: 'a=test&b=a'
					})
					.then(result => {
						this.Interface.toggleFormInputs("authForm", true);
						this.Interface.toggleLoadingLayout(false);
						
						if(Math.random() > 0.8) {
							this.Interface.toggleModalBoxLayout(true, '<b>Ошибка:</b> Неверный email или пароль!', true);
						}
						else {
							this.Interface.toggleAuthLayout(false);
							localStorage.setItem("expDate", Date.now() + 6000000);
							this.setState('stream');
						}
					});
				});
				*/
				this.Adeon.sleep(1000).then(() => {
						this.Interface.toggleFormInputs("authForm", true);
						this.Interface.toggleLoadingLayout(false);
						
						if(Math.random() > 0.8) {
							this.Interface.toggleModalBoxLayout(true, '<b>Ошибка:</b> Неверный email или пароль!', true);
						}
						else {
							this.Interface.toggleAuthLayout(false);
							localStorage.setItem("expDate", Date.now() + 6000000);
							this.setState('stream');
						}
				});
				break;
				
			case 'stream':
				localStorage.setItem("curState", stateName);
				this.Interface.toggleUploadLayout(false);
				this.Interface.streamVideo.style.backgroundImage = "url('/static/qrscanner/img/loading.svg')";
				this.Interface.toggleStreamLayout(true);
				
				if(!this.Adeon.isGetUserMediaSupported()) {
					this.Interface.toggleModalBoxLayout(true, '<b>Внимание:</b> Ваше приложение не поддерживает <b>getUserMedia</b>, в связи с чем Вам недоступен режим сканирования в реальном времени. Однако Вы всегда можете воспользоваться запасным вариантом.<br>' + this.supportTable(), true);
					this.Interface.streamVideo.style.backgroundImage = "url('/static/qrscanner/img/no-video.png')";
				}
				else {
					if(!this.Adeon.isMediaDevicesSupported())
					{
						navigator.getUserMedia({video: true, audio: false}, 
							localMediaStream => {
								if(!localMediaStream.videoTracks.length) {
									this.Interface.toggleModalBoxLayout(true, '<b>Внимание:</b> Ваше приложение не поддерживает <b>mediaDevices</b>, в связи с чем Вам недоступен режим сканирования в реальном времени. Однако Вы всегда можете воспользоваться запасным вариантом.<br>' + this.supportTable(), true);
									this.Interface.streamVideo.style.backgroundImage = "url('/static/qrscanner/img/no-video.png')";
									return;
								}
								
								this.stream = localMediaStream;
								this.Interface.streamVideo.src = window.URL.createObjectURL(localMediaStream);
								this.Interface.streamVideo.play();
											
								this.Interface.streamVideo.onloadedmetadata = (e) => {
									this.Interface.toggleStreamOverlay(true);
								};
							}, 
							error => {
								this.Interface.toggleModalBoxLayout(true, "<b>Внимание:</b> Неизвестная ошибка.<br>" + this.supportTable(), true);
								this.Interface.streamVideo.style.backgroundImage = "url('/static/qrscanner/img/no-video.png')";
							}
						);
					}
					else
					{
						let deviceOptions = true;
						navigator.mediaDevices.enumerateDevices().then(devices => {
							let found = false;
							devices.forEach(device => {
								if(device.kind === 'videoinput')
								{	
									found = true;
									if(device.label.toLowerCase().search("back") >-1)
									{	
										deviceOptions = {'deviceId': {'exact':device.deviceId}, 'facingMode':'environment'} ;
									}
									
									navigator.getUserMedia({video: deviceOptions, audio: false}, 
										localMediaStream => {
											this.stream = localMediaStream;
											this.Interface.streamVideo.src = window.URL.createObjectURL(localMediaStream);
											this.Interface.streamVideo.play();
											
											this.Interface.streamVideo.onloadedmetadata = (e) => {
												this.Interface.toggleStreamOverlay(true);
											};
										}, 
										error => {
											if(error.name === 'PermissionDeniedError') {
												this.Interface.toggleModalBoxLayout(true, '<b>Внимание:</b> Доступ запрещён. Камера недоступна/заблокирована вашем приложением.', true);
											}
											else {	
												this.Interface.toggleModalBoxLayout(true, "<b>Внимание:</b> Неизвестная ошибка.<br>" + this.supportTable(), true);
											}
											this.Interface.streamVideo.style.backgroundImage = "url('/static/qrscanner/img/no-video.png')";
										}
									)
									return;
								}
							});
										
							if(!found) {
								this.Interface.toggleModalBoxLayout(true, '<b>Внимание:</b> Не обнаружено устройств видеозахвата.', true);
								this.Interface.streamVideo.style.backgroundImage = "url('/static/qrscanner/img/no-video.png')";
							}
						});
					}
				}
				
				
				
				/*
				if(!this.Adeon.isCanvasSupported() || !window.File || !window.FileReader) {	
					this.Interface.toggleModalBoxLayout(true, '<b>Внимание:</b> Ваше приложение не поддержвивает возможности HTML5.', true);
					capability = false;
				}
				else if(!this.Adeon.isGetUserMediaSupported()) {	
					this.Interface.toggleModalBoxLayout(true, '<b>Внимание:</b> Ваше приложение не поддержвивает "getUserMedia".', true);
					capability = false;
					
				}
				else if(!this.Adeon.isMediaDevicesSupported()) {	
					this.Interface.toggleModalBoxLayout(true, '<b>Внимание:</b> Ваше приложение не поддержвивает "mediaDevices".', true);
					capability = false;
				}
				
				if(capability) {	
					let deviceOptions = true;
					navigator.mediaDevices.enumerateDevices().then(devices => {
						let found = false;
						devices.forEach(device => {
							if(device.kind === 'videoinput')
							{	
								found = true;
								if(device.label.toLowerCase().search("back") >-1)
								{	
									deviceOptions = {'deviceId': {'exact':device.deviceId}, 'facingMode':'environment'} ;
								}
								
								navigator.getUserMedia({video: deviceOptions, audio: false}, 
									localMediaStream => {
										this.stream = localMediaStream;
										this.Interface.streamVideo.src = window.URL.createObjectURL(localMediaStream);
										this.Interface.streamVideo.play();
										
										this.Interface.streamVideo.onloadedmetadata = (e) => {
											this.Interface.toggleStreamOverlay(true);
										};
									}, 
									error => {
										if(error.name === 'PermissionDeniedError') {
											this.Interface.toggleModalBoxLayout(true, '<b>Внимание:</b> Permission denied. Camera is blocked by your application.', true);
										}
										else {	
											this.Interface.toggleModalBoxLayout(true, "<b>Внимание:</b> Unknown error. "+error.name, true);
										}
									}
								)
								return;
							}
						});
									
						if(!found) {
							this.Interface.toggleModalBoxLayout(true, '<b>Внимание:</b> Не обнаружено устройств видеозахвата.', true);
						}
					});
				}
				else
				{
					navigator.getUserMedia({video: true, audio: false}, 
						localMediaStream => {
							alert('WTF');
							this.stream = localMediaStream;
							this.Interface.toggleModalBoxLayout(true, JSON.stringify(localMediaStream.videoTracks), true);
							this.Interface.streamVideo.src = window.URL.createObjectURL(localMediaStream);
							this.Interface.streamVideo.play();
										
							this.Interface.streamVideo.onloadedmetadata = (e) => {
								alert('metaloaded');
								this.Interface.toggleStreamOverlay(true);
							};
						}, 
						error => {
							if(error.name === 'PermissionDeniedError') {
								this.Interface.toggleModalBoxLayout(true, '<b>Внимание:</b> Доступ запрещён. Камера недоступна/заблокирована вашем приложением.', true);
							}
							else {	
								this.Interface.toggleModalBoxLayout(true, "<b>Внимание:</b> Неизвестная ошибка.<br>data: "+JSON.stringify(error), true);
							}
						}
					);
				}
				*/
				break;
				
			case 'upload':
				localStorage.setItem("curState", stateName);
				this.Interface.toggleStreamLayout(false);
				this.Interface.toggleUploadLayout(true);
				break;
				
			default:
				this.Interface.toggleModalBoxLayout(true, '<b>Внимание:</b> Ошибка состояния приложения. Настройки сброшены, перезагрузите страницу.', false);
				localStorage.removeItem("expDate");
				localStorage.removeItem("curState");
				break;
		}
	}
	
	onQrCodeDecodeAttept(data, error) {	
		
			if (data === 'error decoding QR Code') {
				this.Interface.toggleModalBoxLayout(true, '<b>Ошибка:</b> QR Код не распознан, попробуйте ещё раз.', true);
			}
			else {
				this.Interface.toggleModalBoxLayout(true, '<b>Успех:</b> QR Код распознан! Содержимое: '+data, true);
			}
		
	}

	onUploadInputFileChange() {
		let reader = new FileReader();
		reader.onload = file => {
			console.log(file.target.result);
			let base64 = file.target.result;
			
			this.Interface.uploadTrigger.setAttribute('src', base64);
			qrcode.decode(base64);
		}
		if(this.Interface.uploadInput.files) {
			reader.readAsDataURL(this.Interface.uploadInput.files[0]);
		}
	}
	
	onClick(event) {
		switch (event.target.id) {
			case 'modalBoxCloseButton':
				this.Interface.toggleModalBoxLayout(false);
				break;
				
			case 'authProceedButton':
				if(this.Adeon.validateForm('#authForm input')) {
					event.preventDefault();
					this.setState('auth-request');
				}
				break;
			
			case 'headerGiverButton':
				window.location.href = "https://www.giver.md";
				break;
			
			case 'headerStreamButton':
				if(this.state !== "stream") this.setState('stream');
				break;
			
            case 'headerUploadButton':
				if(this.state !== "upload") this.setState('upload');
				break;
			
            case 'headerLogoutButton':
				localStorage.removeItem("expDate");
				localStorage.removeItem("curState");
				location.reload();
				break;
				
			case 'streamOverlay':
				//if(this.Interface.streamVideo.paused || this.Interface.streamVideo.ended) return;
				let context = this.Interface.streamCanvas.getContext('2d');
				let w = this.Interface.streamVideo.videoWidth;
				let h = this.Interface.streamVideo.videoHeight;
				
				this.Interface.streamCanvas.width = w;
				this.Interface.streamCanvas.height = h;
			
				context.drawImage(this.Interface.streamVideo,0,0,w,h);
				qrcode.decode(this.Interface.streamCanvas.toDataURL());
				console.log('click');
				break;
			
			case 'uploadTrigger':
				this.Interface.uploadInput.click();
				//this.Interface.uploadTrigger.setAttribute('src', this.Interface.loadingIcon);
				break;
			
			case 'uploadInput':
				break;
		}
	}
}