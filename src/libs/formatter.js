export default{
  numberMark (h, params) {
    // 千分符
    let field = params.column.key
    let rowData = params.row
    let value = rowData[field]
    if (!value || value == null || value == 0 || value.length == 0) {
      return h('span', value)
    }

    let dotIndex = (value + '').indexOf('.')
    let number
    if (dotIndex != -1) { // 带小数点
      number = (value + '').substring(0, dotIndex)
    } else {
      number = value
    }

    try {
      number = Number(number)
    } catch (e) {
      return h('span', value)
    }
    if (dotIndex != -1) {
      let dotNumber = (value + '').substr(dotIndex)
      return h('span', number.toLocaleString() + dotNumber)
    }
    return h('span', number.toLocaleString())
  },
  statusFormat (h, params) {
    let field = params.column.key
    let rowData = params.row
    let value = rowData[field]
    let v = value == undefined || value == null || value == '' || !value
    let checkbox = h('Checkbox', {
    	 props: {
    		 value: v,
    		 disabled: true,
        size: 'small'
    	 }
    })
    return h('div', {
      attrs: {
        class: 'checkbox-disabled'
      }
    }, [checkbox])
  },
  auditFormat (h, params) {
    let field = params.column.key
    let rowData = params.row
    let value = rowData[field]
    if (value && value != null) {
			 return h('span', '已审')
    }
    return h('span', '未审')
  },
  checkBoxFormat (h, params) {
    let field = params.column.key
    let rowData = params.row
    let value = rowData[field]
    let v = value && value != null && value == true
    return h('Checkbox', {
			 props: {
				 value: v,
				 disabled: true,
        size: 'small'
			 }
		 })
  }
}
