import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import * as beautify from 'js-beautify';
import { GenerateServiceService } from '../services/generate-service.service';
 
@Component({
  selector: 'app-config-setting',
  templateUrl: './config-setting.component.html',
  styleUrls: ['./config-setting.component.scss']
})
export class ConfigSettingComponent implements OnInit {

	inputValue: string;


	@Output()
  	emitSpot = new EventEmitter;

	constructor(private generateServiceService:GenerateServiceService) { }

	ngOnInit() {

		this.inputValue = `
		{
		   "modelName":"UserRole",
		   "extendClass":"DataModel",
		   "dbRestrict":[
		      {
		         "colName":"userId",
		         "type":"String",
		         "length":20
		      },
		      {
		         "colName":"userName",
		         "type":"String",
		         "length":10
		      },
		      {
		         "colName":"roleId",
		         "type":"String",
		         "length":30
		      }
		   ]
		}

		`;



		this.inputValue = beautify.js_beautify(this.inputValue);

		this.sendGenResultToGenerator();


	}


	sendGenResultToGenerator(){
		let genResult = this.generateServiceService.generateModel(this.inputValue)
		console.log("=== sendGenResultToGenerator ===");
		this.emitSpot.emit(genResult);

	}

}
