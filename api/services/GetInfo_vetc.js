const hoso = require('./hoso');
const khdn = require('./khdn');
const khcn = require('./khcn');
module.exports = async function(bks,cookie){
	

	let hoso_data = await hoso(bks,cookie);
	let khdn_data = await khdn(bks,cookie);
	let khcn_data = await khcn(bks,cookie);
	
	let type = khcn_data.ho_ten ? 'khcn' : 'khdn'; 
	let data = type === 'khcn' ? khcn_data : khdn_data;
	return {...hoso_data,...data,...{type}};

}