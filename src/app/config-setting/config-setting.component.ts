import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import * as beautify from 'js-beautify';
import { GenerateService } from '../services/generate.service';
 

@Component({
  selector: 'app-config-setting',
  templateUrl: './config-setting.component.html',
  styleUrls: ['./config-setting.component.scss']
})
export class ConfigSettingComponent implements OnInit {

	inputValue: string;


	@Output()
  	emitSpot = new EventEmitter;

	constructor(private generateService:GenerateService) { }

	ngOnInit() {

		this.inputValue = `
			{
			   "modelName":"UserRole",
			   "extendClass":"DataModel",
			   "dbRestrict":[
			      {
			         "colName":"itemNam",
			         "type":"String",
			         "length":200
			      },
			      {
			         "colName":"roleId",
			         "type":"String",
			         "length":20
			      },
			      {
			         "colName":"roleName",
			         "type":"String",
			         "length":50
			      },
			      {
			         "colName":"userId",
			         "type":"String",
			         "length":10
			      },
			      {
			         "colName":"userName",
			         "type":"String",
			         "length":50
			      },
			      {
			         "colName":"menuId",
			         "type":"Int"
			      },
			      {
			         "colName":"roleMenuId",
			         "type":"Int"
			      },
			      {
			         "colName":"userRoleId",
			         "type":"Int"
			      },
			      {
			         "colName":"Action",
			         "type":"String",
			         "length":20
			      }
			   ]
			}

		`;



		this.inputValue = beautify.js_beautify(this.inputValue);

		this.sendGenResultToGenerator();


	}


	sendGenResultToGenerator(){
		let genResult = this.generateService.generateModel(this.inputValue)
		// console.log("=== sendGenResultToGenerator ===");
		this.emitSpot.emit(genResult);

	}

}
