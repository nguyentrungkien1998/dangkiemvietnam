const request = require('request-promise');
module.exports  = async (bks = '',cookie = '')=>{
	try{
		var headers = {
			'Connection': 'keep-alive',
			'Accept': 'application/json, text/javascript, */*; q=0.01',
			'Origin': 'https://agency.vetc.com.vn',
			'X-Requested-With': 'XMLHttpRequest',
			'Sec-Fetch-Dest': 'empty',
			'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36 OPR/67.0.3575.115',
			'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
			'Sec-Fetch-Site': 'same-origin',
			'Sec-Fetch-Mode': 'cors',
			'Referer': 'https://agency.vetc.com.vn/Enterprise/EnterpriseRegister',
			'Accept-Language': 'vi-VN,vi;q=0.9,fr-FR;q=0.8,fr;q=0.7,en-US;q=0.6,en;q=0.5',
			cookie
		};

		var dataString = 'plateNumber='+bks.toUpperCase()+'&typeEnterprise=C';

		var options = {
			url: 'https://xxx/enterprise/enterpriseregister/getcorporate',
			method: 'POST',
			headers: headers,
			body: dataString,
			rejectUnauthorized:false
		};


		let responseText = await request(options);

		let {error,message,Address,RepreIdIssuePlace,RepreName,RepreDob,RepreGender,RepreIdNo,RepreIdIssueDate,RepreMobiNumber,Account,invCycleEffectDate,InvoiceCycleType} = JSON.parse(responseText);

		if(error) throw message;
		return {
			bks,
			dia_chi:Address || '',
			ho_ten:RepreName || '',
			tinh:RepreIdIssuePlace.replace('Tỉnh','').replace('Thành phố','').trim(),
			cmnd:RepreIdNo || '',
			phone:RepreMobiNumber || '',
			ngay_sinh:parseInt(RepreDob.replace(/[^0-9]/g,'')),
			ngay_cap:parseInt(RepreIdIssueDate.replace(/[^0-9]/g,'')),
			gioi_tinh:RepreGender == "1" ? 'Nam' : 'Nữ',
			ngay_hieu_luc:parseInt(invCycleEffectDate.replace(/[^0-9]/g,'')),
			ma_tai_khoan:Account.AccountNumber,
			chu_ki_hoa_don:InvoiceCycleType == '1' ? 'Theo giao dịch':'Theo tháng',
			trang_thai:Account.Status == '1' ? 'Đang hoạt động': 'Ngừng hoạt động'

		}
	}catch(e){
		return {}
	}
	
};


