const request = require('request-promise');
const cheerio = require('cheerio');
let get_cookie = async ()=>{
	let options = {
		url:'http://xxx',
		method:'GET',
		headers:{
			'user-agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.130 Safari/537.36 OPR/66.0.3515.72',
		},
		resolveWithFullResponse:true
	};
	let {headers} = await request(options);
	return headers['set-cookie'].reduce(((previous,current)=>previous+current.split(';')[0]+';'),'')+'useragent=TW96aWxsYS81LjAgKE1hY2ludG9zaDsgSW50ZWwgTWFjIE9TIFggMTBfMTVfNSkgQXBwbGVXZWJLaXQvNTM3LjM2IChLSFRNTCwgbGlrZSBHZWNrbykgQ2hyb21lLzgzLjAuNDEwMy4xMTYgU2FmYXJpLzUzNy4zNiBPUFIvNjkuMC4zNjg2Ljc3; ';
};
module.exports = async (username,password)=>{

	let cookie = await get_cookie();
	try{
		var headers = {
			'Connection': 'keep-alive',
			'Cache-Control': 'max-age=0',
			'Origin': 'http://www.vr.org.vn',
			'Upgrade-Insecure-Requests': '1',
			'Content-Type': 'application/x-www-form-urlencoded',
			'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.130 Safari/537.36 OPR/66.0.3515.103',
			'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
			'Referer': 'http://www.vr.org.vn/ptpublicweb/login.aspx',
			'Accept-Encoding': 'gzip, deflate',
			'Accept-Language': 'vi-VN,vi;q=0.9,fr-FR;q=0.8,fr;q=0.7,en-US;q=0.6,en;q=0.5',
			cookie
		};

		
		var options = {
			url: 'http://xxx',
			method: 'POST',
			headers: headers,
			form:{
				__VIEWSTATE:'/wEPDwUKMTU1NDU2ODg0NQ9kFgICAQ9kFgICDQ8PFgIeB1Zpc2libGVoZGRkUSskkOHRd9ZVZdapC14eHBucvF0=',
				__VIEWSTATEGENERATOR:'DA943E64',
				__EVENTVALIDATION:'/wEWBAKkqODvBQL6yqb2BwLhi9CEDQKukYrKDp88jWLEhFQZ7lsw8XPQkQzTW0vN',
				txtNguoiDung:username,
				txtMatKhau:password,
				btnDangNhap:'Ðăng nhập'
			}
		};
		await request(options);
		return null
	}catch(e){
	return cookie;
	}
};
