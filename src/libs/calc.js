function add(num1, num2) {
	let mult = getMultiple(num1, num2);
	return (Math.round(num1 * mult) + Math.round(num2 * mult)) / mult;
}

function subtract(num1, num2) {
	return this.add(num1, -num2);
}

function mul(num1, num2) {
	let mult = getMultiple(num1, num2);
	return (Math.round(num1 * mult) * Math.round(num2 * mult)) / (mult*mult);
}

function divide(num1, num2) {
	var d1, d2, n1 = Number(num1.toString().replace(".", "")), n2 = Number(num2
			.toString().replace(".", ""));
	try {
		d1 = num1.toString().split(".")[1].length;
	} catch (e) {
		d1 = 0;
	}
	try {
		d2 = num2.toString().split(".")[1].length;
	} catch (e) {
		d2 = 0;
	}
	return toFixed((n1 / n2) * Math.pow(10, d2 - d1), 2);
}

function toFixed(arg, n) {
	if (n == 0) {
		return Math.round(arg)
	}
	try {
		var d, carryD, i, ds = arg.toString().split('.'), len = ds[1].length, b0 = '', k = 0
		if (len > n) {
			while (k < n && ds[1].substring(0, ++k) == '0') {
				b0 += '0'
			}
			d = Number(ds[1].substring(0, n))
			carryD = Math.round(Number('0.' + ds[1].substring(n, len)))
			len = (d + carryD).toString().length
			if (len > n) {
				return Number(ds[0]) + 1
			} else if (len == n) {
				return Number(ds[0] + '.' + (d + carryD))
			}
			return Number(ds[0] + '.' + b0 + (d + carryD))
		}
	} catch (e) {
	}
	
	return arg;
}

function getMultiple(num1,num2){
	let num1Mult = 1;
	let num2Mult = 1;
	let num1Str = num1.toString();
	let num2Str = num2.toString();
	if(num1Str.indexOf('.') != -1){
		if(Number(num1Str.split('.')[1]) > 0){
			num1Mult = num1Str.split('.')[1].length;
		}
	}
	if(num2Str.indexOf('.') != -1){
		if(Number(num2Str.split('.')[1]) > 0){
			num2Mult = num2Str.split('.')[1].length;
		}
	}
	let mult = num1Mult >= num2Mult ? num1Mult : num2Mult;
	let num = 1;
	for(let i =0;i<mult;i++){
		num = num * 10;
	}
	return num;
}

export default{
	add:add,
	sub:subtract,
	mul:mul,
	div:divide
}

