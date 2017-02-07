export default class Interface {
	constructor() {
		this.console = document.getElementById('console');

		this.loadingLayout = document.getElementById('loadingLayout');

		this.modalBoxLayout = document.getElementById('modalBoxLayout');
		this.modalBoxText = document.getElementById('modalBoxText');
		this.modalBoxCloseButton = document.getElementById('modalBoxCloseButton');
		
		this.headerGiverButton = document.querySelector("#headerGiverButton");
		this.headerStreamButton = document.querySelector("#headerStreamButton");
		this.headerUploadButton = document.querySelector("#headerUploadButton");
		this.headerLogoutButton = document.querySelector("#headerLogoutButton");
		
		this.authLayout = document.getElementById('authLayout');
		this.authProceedButton = document.getElementById('authProceedButton');

		this.streamLayout = document.getElementById('streamLayout');
		this.streamVideo = document.getElementById('streamVideo');
		this.streamCanvas = document.getElementById('canvas');
		this.streamOverlay = document.getElementById('streamOverlay');

		this.uploadLayout = document.getElementById('uploadLayout');
		this.uploadTrigger = document.getElementById('uploadTrigger');
		this.uploadInput = document.getElementById('uploadInput');
		
		this.loadingIcon = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nMTE0cHgnIGhlaWdodD0nMTE0cHgnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgdmlld0JveD0iMCAwIDEwMCAxMDAiIHByZXNlcnZlQXNwZWN0UmF0aW89InhNaWRZTWlkIiBjbGFzcz0idWlsLWJhbGxzIj48cmVjdCB4PSIwIiB5PSIwIiB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0ibm9uZSIgY2xhc3M9ImJrIj48L3JlY3Q+PGcgdHJhbnNmb3JtPSJyb3RhdGUoMCA1MCA1MCkiPiAgPGNpcmNsZSByPSI1IiBjeD0iMzAiIGN5PSI1MCI+ICAgIDxhbmltYXRlVHJhbnNmb3JtIGF0dHJpYnV0ZU5hbWU9InRyYW5zZm9ybSIgdHlwZT0idHJhbnNsYXRlIiBiZWdpbj0iMHMiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIiBkdXI9IjFzIiB2YWx1ZXM9IjAgMDs5Ljk5OTk5OTk5OTk5OTk5OCAtMTcuMzIwNTA4MDc1Njg4NzciIGtleVRpbWVzPSIwOzEiLz4gICAgPGFuaW1hdGUgYXR0cmlidXRlTmFtZT0iZmlsbCIgZHVyPSIxcyIgYmVnaW49IjBzIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIgIGtleVRpbWVzPSIwOzEiIHZhbHVlcz0iI2I1Y2NmMTsjOTRhOWNlIi8+ICA8L2NpcmNsZT48L2c+PGcgdHJhbnNmb3JtPSJyb3RhdGUoNjAgNTAgNTApIj4gIDxjaXJjbGUgcj0iNSIgY3g9IjMwIiBjeT0iNTAiPiAgICA8YW5pbWF0ZVRyYW5zZm9ybSBhdHRyaWJ1dGVOYW1lPSJ0cmFuc2Zvcm0iIHR5cGU9InRyYW5zbGF0ZSIgYmVnaW49IjBzIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIgZHVyPSIxcyIgdmFsdWVzPSIwIDA7OS45OTk5OTk5OTk5OTk5OTggLTE3LjMyMDUwODA3NTY4ODc3IiBrZXlUaW1lcz0iMDsxIi8+ICAgIDxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9ImZpbGwiIGR1cj0iMXMiIGJlZ2luPSIwcyIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiICBrZXlUaW1lcz0iMDsxIiB2YWx1ZXM9IiM5NGE5Y2U7IzY2NzM5NSIvPiAgPC9jaXJjbGU+PC9nPjxnIHRyYW5zZm9ybT0icm90YXRlKDEyMCA1MCA1MCkiPiAgPGNpcmNsZSByPSI1IiBjeD0iMzAiIGN5PSI1MCI+ICAgIDxhbmltYXRlVHJhbnNmb3JtIGF0dHJpYnV0ZU5hbWU9InRyYW5zZm9ybSIgdHlwZT0idHJhbnNsYXRlIiBiZWdpbj0iMHMiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIiBkdXI9IjFzIiB2YWx1ZXM9IjAgMDs5Ljk5OTk5OTk5OTk5OTk5OCAtMTcuMzIwNTA4MDc1Njg4NzciIGtleVRpbWVzPSIwOzEiLz4gICAgPGFuaW1hdGUgYXR0cmlidXRlTmFtZT0iZmlsbCIgZHVyPSIxcyIgYmVnaW49IjBzIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIgIGtleVRpbWVzPSIwOzEiIHZhbHVlcz0iIzY2NzM5NTsjMjkyNjY0Ii8+ICA8L2NpcmNsZT48L2c+PGcgdHJhbnNmb3JtPSJyb3RhdGUoMTgwIDUwIDUwKSI+ICA8Y2lyY2xlIHI9IjUiIGN4PSIzMCIgY3k9IjUwIj4gICAgPGFuaW1hdGVUcmFuc2Zvcm0gYXR0cmlidXRlTmFtZT0idHJhbnNmb3JtIiB0eXBlPSJ0cmFuc2xhdGUiIGJlZ2luPSIwcyIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiIGR1cj0iMXMiIHZhbHVlcz0iMCAwOzkuOTk5OTk5OTk5OTk5OTk4IC0xNy4zMjA1MDgwNzU2ODg3NyIga2V5VGltZXM9IjA7MSIvPiAgICA8YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPSJmaWxsIiBkdXI9IjFzIiBiZWdpbj0iMHMiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIiAga2V5VGltZXM9IjA7MSIgdmFsdWVzPSIjMjkyNjY0OyNmNWY0ZmEiLz4gIDwvY2lyY2xlPjwvZz48ZyB0cmFuc2Zvcm09InJvdGF0ZSgyNDAgNTAgNTApIj4gIDxjaXJjbGUgcj0iNSIgY3g9IjMwIiBjeT0iNTAiPiAgICA8YW5pbWF0ZVRyYW5zZm9ybSBhdHRyaWJ1dGVOYW1lPSJ0cmFuc2Zvcm0iIHR5cGU9InRyYW5zbGF0ZSIgYmVnaW49IjBzIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIgZHVyPSIxcyIgdmFsdWVzPSIwIDA7OS45OTk5OTk5OTk5OTk5OTggLTE3LjMyMDUwODA3NTY4ODc3IiBrZXlUaW1lcz0iMDsxIi8+ICAgIDxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9ImZpbGwiIGR1cj0iMXMiIGJlZ2luPSIwcyIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiICBrZXlUaW1lcz0iMDsxIiB2YWx1ZXM9IiNmNWY0ZmE7I2YyYmVkMSIvPiAgPC9jaXJjbGU+PC9nPjxnIHRyYW5zZm9ybT0icm90YXRlKDMwMCA1MCA1MCkiPiAgPGNpcmNsZSByPSI1IiBjeD0iMzAiIGN5PSI1MCI+ICAgIDxhbmltYXRlVHJhbnNmb3JtIGF0dHJpYnV0ZU5hbWU9InRyYW5zZm9ybSIgdHlwZT0idHJhbnNsYXRlIiBiZWdpbj0iMHMiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIiBkdXI9IjFzIiB2YWx1ZXM9IjAgMDs5Ljk5OTk5OTk5OTk5OTk5OCAtMTcuMzIwNTA4MDc1Njg4NzciIGtleVRpbWVzPSIwOzEiLz4gICAgPGFuaW1hdGUgYXR0cmlidXRlTmFtZT0iZmlsbCIgZHVyPSIxcyIgYmVnaW49IjBzIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIgIGtleVRpbWVzPSIwOzEiIHZhbHVlcz0iI2YyYmVkMTsjYjVjY2YxIi8+ICA8L2NpcmNsZT48L2c+PC9zdmc+';
	}

	fixContent() {
		document.querySelectorAll('.content, .content-overlay').forEach((function (item) {
			item.setAttribute("style", "height:"+window.screen.height+"px;");
		}).bind(this));
	}
	
	hasClass(element, className) {	
		return (element.classList) ? element.classList.contains(className) : (-1 < element.className.indexOf(className));
	}
	
	addClass(element, className) {
		if(element.classList) element.classList.add(className);
		else if(!element.hasClass(className))
		{
			let classes = element.className.split(" ");
			classes.push(className);
			element.className = classes.join(" ");
		}
	}

	removeClass(element, className) {
		if(element.classList) element.classList.remove(className);	
		else {
			let classes = element.className.split(" ");
			classes.splice(classes.indexOf(className), 1);
			element.className = classes.join(" ");
		}
	}

	toggleElement(element, toggle) {	
		if(toggle) this.removeClass(element, 'hidden');
		else this.addClass(element, 'hidden');
	}
	
	toggleFormInputs(formid, toggle) {	
		let elements = document.querySelectorAll("#"+formid+" input");
			for (let i = 0, len = elements.length; i < len; i++) {
				elements[i].disabled = !toggle;
			}	
	}
	
	//layouts etst sdasd
	
	toggleLoadingLayout(toggle) {
		this.toggleElement(this.loadingLayout, toggle);
	}
	
	toggleModalBoxLayout(toggle, text = "", showCloseIcon = true) {
		this.modalBoxText.innerHTML = text;
		this.toggleElement(this.modalBoxCloseButton, showCloseIcon);
		this.toggleElement(this.modalBoxLayout, toggle); 
	}

	toggleAuthLayout(toggle) {
		this.toggleElement(this.authLayout, toggle);
	}
	
	toggleStreamLayout(toggle) {
		this.toggleElement(this.streamLayout, toggle);
		if(!toggle) this.toggleElement(this.streamOverlay, false);
	}
	
	toggleStreamOverlay(toggle) {
		this.toggleElement(this.streamOverlay, toggle);
	}
	
	toggleUploadLayout(toggle) {
		this.toggleElement(this.uploadLayout, toggle);
	}
}