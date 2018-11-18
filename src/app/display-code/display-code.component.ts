import { Component, OnInit, Input, OnChanges } from '@angular/core';

import Prism from 'prismjs'; 

import * as _ from 'lodash';

@Component({
  selector: 'app-display-code',
  templateUrl: './display-code.component.html',
  styleUrls: ['./display-code.component.scss']
})
export class DisplayCodeComponent implements OnInit, OnChanges {

	@Input()
  	public inputTextFromAppComp='';


  	myCode = '';

	constructor() { 

	}

	ngOnInit() {
		this.reloadHighlight();
	}


	ngOnChanges(changes) { 
		this.reloadHighlight();		
	}



	reloadHighlight(){ 
		this.myCode = this.inputTextFromAppComp; 

		let myCodeDiv = <HTMLElement> document.querySelector("#myCode");
		let htmlStr = `
		<pre><code class="language-javascript">${this.myCode}</code></pre>
		` 

		myCodeDiv.innerHTML = htmlStr;
		Prism.highlightAll();
	}

}
