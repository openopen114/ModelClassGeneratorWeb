import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import * as beautify from 'js-beautify';
@Injectable({
  providedIn: 'root'
})
export class GenerateService {



	genResult:string;
	isExtend:boolean; 
	config;

	constructor() { }



	generateModel(_jsonStr){
		this.config = JSON.parse(_jsonStr);
		this.genResult = '';


		const extendClass = _.get(this.config, 'extendClass');
		const dbRestrict = _.get(this.config, 'dbRestrict');
		const modelName = _.get(this.config, 'modelName');


		this.genResult += this.genImport(extendClass);
		this.genResult += this.genFields(dbRestrict);
		this.genResult += this.genClassName(modelName, extendClass);
		this.genResult += this.genGetterAndSetter(dbRestrict);
		this.genResult += '}'


		// console.log('this.genResult');
		// console.log(this.genResult);

		// console.log(beautify.js_beautify(this.genResult));


		this.genResult = beautify.js_beautify(this.genResult);

		return this.genResult;
	}



	/***************************/
	/***** generate Import *****/
	/***************************/
	genImport(_extendClass){
		
		const result = `
			import * as _ from 'lodash';
			${_extendClass? '': '//'} import ${_extendClass} from './${_.toLower(_extendClass)}';
		`
		return result;
	}



	/******************************/
	/***** generate ClassName *****/
	/******************************/

	genClassName(_modelName, _extendClass){
		let result = '';
		let extend = (_extendClass) ? `extends ${_extendClass}` : ``;

		result += `export class ${_modelName} ${extend}{`

		result += `
			constructor(_values){
				${_extendClass? '': '//'} super(fields, _values)
			}

		`

		return result;

	}








	/***************************/
	/***** generate fields *****/
	/***************************/
	genFields(_dbRestrict){
		let genFlow =  _.flow(this.getColNameValue, this.genFieldsItem)
		let result = genFlow(_dbRestrict); 

		return result;
	} 

	//get DB columnName 
	getColNameValue(_dbRestrict){
		return _dbRestrict.map(item => _.get(item, 'colName'));
	}


	//generate fields item i.e. itemNam: Symbol('itemNam')
	genFieldsItem(_colNameValueArr){
		let result = '';

		result = `const fields = { `

		//fileds body
		_.each(_colNameValueArr, v => {
			result += `	${v}:Symbol('${v}'),`
		} )
	
		//trim the last ,
		result = _.trim(result, ',')
		result += `}`;

		return result;
	}



	





	/**********************************/
	/***** generate getter setter *****/
	/**********************************/



	genGetterAndSetter(_dbRestrict){ 

		let result = '';

		_.each(_dbRestrict, item => {
			 result += this.genSetter(item);
			 result += this.genGetter(item);
		}) 

		return result;
	}


 


	genSetter(_item){
		let result = '';
		const [colName, type, length] = [_.get(_item, 'colName'), _.get(_item, 'type'), _.get(_item, 'length')]; 
		


		const isStringCondition = `DataModel.isString(value) && value.length <= ${length}`;
		const isIntCondition = `_.isInteger(value)`;

		result += `

		/*** setter - ${colName} ***/
		set ${colName}(value){
			if(${type == 'String' ? isStringCondition : isIntCondition}){
				this[fields.${colName}] = value;
			}

		}
		
		`

		return result;
	}



	genGetter(_item){
		let result = '';
		const [colName, type, length] = [_.get(_item, 'colName'), _.get(_item, 'type'), _.get(_item, 'length')]; 
 

		let returnUpperCaseValue = `return DataModel.is${type}(value) ? value.toUpperCase(): value; `;
		result += `

		/*** getter - ${colName} ***/
		get ${colName}(){
			const value = this[fields.${colName}] ;
    		${type == 'String' ?  returnUpperCaseValue : 'return value;'}
		}

		`

		return result;
	}


}
