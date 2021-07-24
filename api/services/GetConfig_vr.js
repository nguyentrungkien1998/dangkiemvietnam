const request = require('request-promise');
const cheerio = require('cheerio');
module.exports = async function(cookie){
	var headers = {
		'Connection': 'keep-alive',
		'Cache-Control': 'max-age=0',
		'Upgrade-Insecure-Requests': '1',
		'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.183 Safari/537.36 OPR/72.0.3815.320',
		'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
		'Accept-Language': 'vi-VN,vi;q=0.9,fr-FR;q=0.8,fr;q=0.7,en;q=0.6,en-US;q=0.5',
		'Cookie': cookie
	};

	var options = {
		url: 'http://xxx',
		headers,
		method:'GET'
	};
	let responseHTML = await request(options);
	let $ = cheerio.load(responseHTML);
	let __VIEWSTATE = $('input[name="__VIEWSTATE"]').val();
	let __VIEWSTATEGENERATOR = $('input[name="__VIEWSTATEGENERATOR"]').val();
	let __EVENTVALIDATION = $('input[name="__EVENTVALIDATION"]').val();
	return {__VIEWSTATE,__VIEWSTATEGENERATOR,__EVENTVALIDATION}

};