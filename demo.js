const request = require('request-promise');
let get_bks = async ()=>{
	let options = {
		url:'http://handangkiem.com/api/vr?limit=1000000000000&select=bks',
		method:'GET',
		headers:{
		    'user-agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.130 Safari/537.36 OPR/66.0.3515.72'
		},
		rejectUnauthorized:false
	};
	let responseText = await request(options);
	let list_bks = JSON.parse(responseText).map(({bks})=>bks);
	return list_bks;
};
let save_bks = async function(code){
	let options = {
		url:'http://handangkiem.com/api/bks',
		method:'POST',
		headers:{
		    'user-agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.130 Safari/537.36 OPR/66.0.3515.72'
		},
		rejectUnauthorized:false,
		body:JSON.stringify({code})
	};
	return await request(options);
};
(async ()=>{
	let list = await get_bks();
	for(let bks of list){
		await save_bks(bks);
	}
})();

