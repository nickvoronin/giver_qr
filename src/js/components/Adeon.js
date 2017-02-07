export default class Adeon {
	
	constructor() {
		if(!NodeList.prototype.forEach) NodeList.prototype.forEach = Array.prototype.forEach;
	}
	
	LegacyValidation(field) {
		var
			valid = true,
			val = field.value,
			type = field.getAttribute("type"),
			chkbox = (type === "checkbox" || type === "radio"),
			required = field.getAttribute("required"),
			minlength = field.getAttribute("minlength"),
			maxlength = field.getAttribute("maxlength"),
			pattern = field.getAttribute("pattern");

		// disabled fields should not be validated
		if (field.disabled) return valid;

		// value required?
		valid = valid && (!required ||
			(chkbox && field.checked) ||
			(!chkbox && val !== "")
		);

		// minlength or maxlength set?
		valid = valid && (chkbox || (
			(!minlength || val.length >= minlength) &&
			(!maxlength || val.length <= maxlength)
		));

		// test pattern
		if (valid && pattern) {
			pattern = new RegExp(pattern);
			valid = pattern.test(val);
		}

		return valid;
	}
	
	validateForm(pattern) {
		let elements = document.querySelectorAll(pattern);
			for (let i = 0, len = elements.length; i < len; i++) {
				if(elements[i].checkValidity() === false || this.LegacyValidation(elements[i]) === false) {
					return false;
				}
			}
			
		return true;
	}
	
	sleep (time) {
		return new Promise((resolve) => setTimeout(resolve, time));
	}
	
	effectiveDeviceWidth() {
		return 'screenW:'+window.screen.width+'<br>screenH:'+window.screen.height+'<br>innerW:'+window.innerWidth+'<br>innerH:'+innerHeight+'<br>clientW:'+document.documentElement.clientWidth+'<br>clientH:'+document.documentElement.clientWidth;
	}
	
	isSecured() {
	   return document.location.protocol == 'https:' || location.hostname == "localhost";
	}
	
	//test
	
	isCheckValiditySupported() {
		return (typeof document.createElement( 'input' ).checkValidity == 'function');
	}
	
	isPromiseSupported() {
		return !(typeof Promise === "undefined");
	}
	
	isNodeListForEachSupported() {
		return NodeList.prototype.forEach;
	}
	
	isCanvasSupported() {
	  let elem = document.createElement('canvas');
	  return !!(elem.getContext && elem.getContext('2d'));
	}

	isGetUserMediaSupported() {
	  return !!(navigator.getUserMedia || navigator.webkitGetUserMedia ||
				navigator.mozGetUserMedia || navigator.msGetUserMedia);
	}

	isMediaDevicesSupported() {
		return (navigator.mediaDevices && navigator.mediaDevices.enumerateDevices);
	}
}


