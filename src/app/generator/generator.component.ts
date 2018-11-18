import { Component, OnInit, Input } from '@angular/core';

import * as _ from 'lodash';

 
import * as beautify from 'js-beautify';


// import hljs from 'highlight.js/lib/highlight';



// import javascript from 'highlight.js/lib/languages/javascript';
// hljs.registerLanguage('javascript', javascript);

@Component({
  selector: 'app-generator',
  templateUrl: './generator.component.html',
  styleUrls: ['./generator.component.scss']
})
export class GeneratorComponent implements OnInit {


	config:Object; 
	isExtend:boolean;


	@Input()
  	public _genResult='';


	constructor() { }

	ngOnInit() {

	}



	



	gen(_extendClass, _dbRetrice){
		
		const result = `
		${_extendClass? '': '//'} import ${_extendClass} from './${_.toLower(_extendClass)}';
		`



 


		return result;



	}



	


	




	/***************************/
	/***** generate fields *****/
	/***************************/
	genFields(_dbRetrice){
		let genFlow =  _.flow(this.getColNameValue, this.genFieldsItem)
		let result = genFlow(_dbRetrice); 

		return result;
	} 

	//get DB columnName 
	getColNameValue(_dbRetrice){
		return _dbRetrice.map(item => _.get(item, 'colName'));
	}


	//generate fields item i.e. itemNam: Symbol('itemNam')
	genFieldsItem(_colNameValueArr){
		let result = '';

		result = `const fields = { \n`

		//fileds body
		_.each(_colNameValueArr, v => {
			result += `	${v}:Symbol(${v}),\n`
		} )
	
		//trim the last ,
		result = _.trim(result, ',\n')
		result += `\n}`;

		return result;
	}



	





	/**********************************/
	/***** generate getter setter *****/
	/**********************************/



	genGetterAndSetter(_dbRetrice){ 

		let result = '';

		_.each(_dbRetrice, item => {
			 result += this.genSetter(item);
			 result += this.genGetter(item);
		})


		console.log(result);

		return result;
	}


/*"extendClass":"DDdataModel",
				"dbRetrice": [
					{"colName":"userId", "type":"String", "length":20},
					{"colName":"userId111", "type":"String", "length":10},
					{"colName":"userId222", "type":"String", "length":30}			
				]*/


	genSetter(_item){
		let result = '';
		const [colName, type, length] = [_.get(_item, 'colName'), _.get(_item, 'type'), _.get(_item, 'length')]; 
		

		result += `

		/*** setter - ${colName} ***/
		set ${colName}(value){
			if(DataModel.is${type}(v) && value.length <= ${length}){
				this[fields.${colName}] = value;
			}

		}
		
		`

		return result;
	}



	genGetter(_item){
		let result = '';
		const [colName, type, length] = [_.get(_item, 'colName'), _.get(_item, 'type'), _.get(_item, 'length')]; 
 
		result += `

		/*** getter - ${colName} ***/
		get ${colName}(){
			const value = this[fields.${colName}] ;
    		return DataModel.is${type}(value) ? value.toUpperCase(): value; 
		}

		`

		return result;
	}

 







}
