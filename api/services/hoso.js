const request = require('request-promise');
let make = async (bks = '',cookie = '')=>{
	var headers = {
		'Connection': 'keep-alive',
		'Accept': 'application/json, text/plain, */*',
		'Origin': 'https://agency.vetc.com.vn',
		'X-Requested-With': 'XMLHttpRequest',
		'Sec-Fetch-Dest': 'empty',
		'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36 OPR/67.0.3575.115',
		'Content-Type': 'application/json;charset=UTF-8',
		'Sec-Fetch-Site': 'same-origin',
		'Sec-Fetch-Mode': 'cors',
		'Referer': 'https://agency.vetc.com.vn/Agent/Profile',
		'Accept-Language': 'vi-VN,vi;q=0.9,fr-FR;q=0.8,fr;q=0.7,en-US;q=0.6,en;q=0.5',
		cookie
	};

	var dataString = '{"query":{"CustomerType":"","FileState":"","Approve":"","ActionType":"","Plate":"'+bks.toUpperCase()+'"},"page":1,"size":5}';

	var options = {
		url: 'https://xxx/Agent/Profile/Transaction',
		method: 'POST',
		headers: headers,
		body: dataString,
		rejectUnauthorized:false
	};

	let responseText = await request(options);
	 
	let {error,message,Data} = JSON.parse(responseText);
	if(error === 'Yêu cầu đăng nhập!') {
		
		let cookie_new = await Refresh.vetc();
		return await make(bks,cookie_new)
	}
	if(error) throw message;
	if(Data.length === 0) return {bks};
	let {CreateDate,Approve,ShopName} = Data[0];
	return {

		bks,
		hoso_time:parseInt(CreateDate.replace(/[^0-9]/g,'')),
		hoso_tt_duyet:Approve == '0' ? 'Chưa duyệt' : 'Đã duyệt',
		hoso_dai_li:ShopName
	};
};
module.exports = make;