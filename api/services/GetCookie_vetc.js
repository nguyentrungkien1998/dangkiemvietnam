const request = require('request-promise');
const cheerio = require('cheerio');
let cookie_vetc = async ()=>{
	let options = {
		url:'https://xxx/account/login',
		method:'GET',
		headers:{
			'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36 OPR/67.0.3575.115',
		},
		resolveWithFullResponse:true,
		rejectUnauthorized:false
	};
	let {headers,body} = await request(options);
	let $ = cheerio.load(body);
	let cookie = headers['set-cookie'].reduce(((previous,current)=>previous+current.split(';')[0]+';'),'');
	let __RequestVerificationToken = $('input[name="__RequestVerificationToken"]').val();
	return {cookie,__RequestVerificationToken};
};
let get_cookie_user = async (username,password,cookie = '',__RequestVerificationToken = '')=>{
	
	try{
		var headers = {
			'Connection': 'keep-alive',
			'Cache-Control': 'max-age=0',
			'Upgrade-Insecure-Requests': '1',
			'Origin': 'https://agency.vetc.com.vn',
			'Content-Type': 'application/x-www-form-urlencoded',
			'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 11_0_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36 OPR/73.0.3856.284',
			'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
			'Sec-Fetch-Site': 'same-origin',
			'Sec-Fetch-Mode': 'navigate',
			'Sec-Fetch-User': '?1',
			'Sec-Fetch-Dest': 'document',
			'Referer': 'https://agency.vetc.com.vn/account/login',
			'Accept-Language': 'vi-VN,vi;q=0.9,fr-FR;q=0.8,fr;q=0.7,en;q=0.6,en-US;q=0.5',
			'Cookie': cookie
		};
		var dataString = '__RequestVerificationToken='+__RequestVerificationToken+'&UserName='+username+'&Password='+password+'&Captcha=';
		let options = {
			url:'https://xxx/Account/Login',
			method:'POST',
			headers,
			body:dataString,
			rejectUnauthorized:false

		};
		await request(options);

		return {error:'Mật khẩu sai'}
	}catch(e){

		
		return e.response.headers['set-cookie'].reduce(((previous,current)=>previous+current.split(';')[0]+';'),'')
	}
};
module.exports = async (username,password)=>{

	let {cookie,__RequestVerificationToken} = await cookie_vetc();
	let result = await get_cookie_user(username,password,cookie,__RequestVerificationToken);
	
	if(result.error) return null;
	return result;
};