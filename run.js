const request = require('request-promise');
let host = 'http://handangkiem.com'
let list_code = async (page = 1)=>{
	let options = {
		url:host+'/api/bks/get',
		method:'POST',
        	headers:{
			'user-agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.130 Safari/537.36 OPR/66.0.3515.72'
		},
		rejectUnauthorized:false,
		body:JSON.stringify({page})
	};
	let responseText = await request(options);
	return JSON.parse(responseText).map(({code})=>code);
};
let set_vr = async (bks)=>{
	let options = {
		url:host+'/api/vr/set',
		method:'POST',
		headers:{
			'user-agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.130 Safari/537.36 OPR/66.0.3515.72'

		},
		rejectUnauthorized:false,
		body:JSON.stringify({bks})
	};
	return await request(options);
};
let set_vetc = async bks=>{
	let options = {
		url:host+'/api/vetc/set',
		method:'POST',
		headers:{
			'user-agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.130 Safari/537.36 OPR/66.0.3515.72'

		},
		rejectUnauthorized:false,
		body:JSON.stringify({bks})
	};
	return await request(options);
};
let make_vr = async (page)=>{
	let list = await list_code(page);
	if(list.length === 0) return await make_vr(1);
	for(let code of list){
               let load_vr = await set_vr(code);
                console.log('VR:'+code+':'+load_vr);
	};
	return await make_vr(page+=1)
	
};
make_vr(1);
let make_vetc = async (page)=>{
	let list = await list_code(page);
	if(list.length === 0) return await make_vetc(1);
	for(let code of list){
		
		let load_vetc = await set_vetc(code);
		console.log('VETC:'+code+':'+load_vetc)
	};
	return await make_vetc(page+=1)
	
};
make_vetc(1);
