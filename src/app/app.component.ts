import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
	title = 'app';

	public genResult = '';

	getGenResultHandler($event){
		console.log('=== getGenResultHandler ===')
		console.log($event)
		this.genResult = $event;


		console.log('this.genResult')
		console.log(this.genResult);
	}


}
