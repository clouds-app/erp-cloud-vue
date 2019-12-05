export default{
	numberMark(h,params){
		//千分符
		let field = params.column.field;
		let rowData = params.row;
		let value = rowData[field];
		if(!value || value == null || value.length == 0){
			return value;
		}
		try{
			value  = Number(value);
		}catch(e){
			return h('span',value);
		}
		return h('span',value.toLocaleString());
	},
	statusFormat(h,params){
		let field = params.column.field;
		let rowData = params.row;
		let value = rowData[field];
		if(value==undefined || value==null || value=='' || !value){
			 return h('span','禁用');
		}
		return h('span','启用');
	},auditFormat(h,params){
		let field = params.column.field;
		let rowData = params.row;
		let value = rowData[field];
		if(value && value != null){
			 return h('span','已审');
		}
		return h('span','未审');
	},checkBoxFormat(h,params){
		let field = params.column.key;
		let rowData = params.row;
		let value = rowData[field];
		let v = value && value != null && value == true;
		return h('Checkbox',{
			 props:{
				 value:v,
				 disabled:true,
         size:'small'
			 }
		 });
	}
}
