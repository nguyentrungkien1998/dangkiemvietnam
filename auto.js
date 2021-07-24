const hoso = require('./api/services/hoso');
const khdn = require('./api/services/khdn');
const khcn = require('./api/services/khcn');
const GetInfo_vr = require('./api/services/GetInfo_vr');
const GetInfo_vetc = require('./api/services/GetInfo_vetc');
const GetCookie_vr = require('./api/services/GetCookie_vr');
const GetCookie_vetc = require('./api/services/GetCookie_vetc');
const {server:{host,port}} = require('./nuxt.config.js');
const request = require('request-promise');
let wait = time=>{
	return new Promise(resolve=>{
		setTimeout(function(){
			return resolve(time)
		},time)
	})
};
let prior_index = [];
let drop_prior = async ()=>{
	let options = {
		url:'http://'+host+':'+port+'/api/prior/drop',
		method:'POST',
		headers:{
			'user-agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.130 Safari/537.36 OPR/66.0.3515.72'
		},
		rejectUnauthorized:false
	};
	let check_prior = prior_index.includes('vr') && prior_index.includes('vetc');
	if(!check_prior) return null;
	return await request(options);
};
function isBks(n) {
	n = n.slice(0,2); 
	return !isNaN(parseFloat(n)) && isFinite(n);
}
let turn_off_acc = async id=>{
	let options = {
		url:'http://'+host+':'+port+'/api/crawl/turn-off-acc',
		method:'POST',
		headers:{
			'user-agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.130 Safari/537.36 OPR/66.0.3515.72'
		},
		rejectUnauthorized:false,
		body:JSON.stringify({id})
	};
	return await request(options);
};
let get_vetc = async (bks,cookie)=>{

	let hoso_data = await hoso(bks,cookie);
	let khdn_data = await khdn(bks,cookie);
	let khcn_data = await khcn(bks,cookie);
	
	let type = khcn_data.ho_ten ? 'khcn' : 'khdn'; 
	let data = type === 'khcn' ? khcn_data : khdn_data;
	console.log('VETC success:'+bks);
	return {...hoso_data,...data,...{type}};
};
let get_vr = async (bks,cookie,__VIEWSTATE,__VIEWSTATEGENERATOR,__EVENTVALIDATION,id)=>{
	if(!isBks(bks)) return {bks};
	let data = await GetInfo_vr(bks,cookie,__VIEWSTATE,__VIEWSTATEGENERATOR,__EVENTVALIDATION);
	await update_scanned(id);
	console.log('VR success:'+bks);
	return data;
};
const update_scanned = async function(id){
	let options = {
		url:'http://'+host+':'+port+'/api/crawl/update-scanned',
		method:'POST',
		headers:{
			'user-agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.130 Safari/537.36 OPR/66.0.3515.72'
		},
		rejectUnauthorized:false,
		body:JSON.stringify({id})
	};
	return await request(options);
};
const find_crawl = async type=>{
	let options = {
		url:'http://'+host+':'+port+'/api/crawl/find-acc',
		method:'POST',
		headers:{
			'user-agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.130 Safari/537.36 OPR/66.0.3515.72'
		},
		rejectUnauthorized:false,
		body:JSON.stringify({type})

	};
	let responseText = await request(options);

	if(!responseText) throw '';

	return JSON.parse(responseText);
};
const find_config_vr = async (username)=>{
	let options = {
		url:'http://'+host+':'+port+'/api/crawl/find-config-vr',
		method:'POST',
		headers:{
			'user-agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.130 Safari/537.36 OPR/66.0.3515.72'
		},
		rejectUnauthorized:false,
		body:JSON.stringify({username})


	};
	let responseText = await request(options);
	return JSON.parse(responseText);
};
const update_crawl = async (type,cookie)=>{
	let options = {
		url:'http://'+host+':'+port+'/api/crawl/update-acc',
		method:'POST',
		headers:{
			'user-agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.130 Safari/537.36 OPR/66.0.3515.72'
		},
		rejectUnauthorized:false,
		body:JSON.stringify({type,cookie})

	};
	let responseText = await request(options);
	return responseText;
};

const create_vr = async (data)=>{
	let options = {
		url:'http://'+host+':'+port+'/api/vr/add',
		method:'POST',
		headers:{
			'user-agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.130 Safari/537.36 OPR/66.0.3515.72'
		},
		rejectUnauthorized:false,
		body:JSON.stringify(data)

	};
	let responseText = await request(options);
	return JSON.parse(responseText);
};
const destroy_vr = async bks=>{
	let options = {
		url:'http://'+host+':'+port+'/api/vr/destroy',
		method:'POST',
		headers:{
			'user-agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.130 Safari/537.36 OPR/66.0.3515.72'
		},
		rejectUnauthorized:false,
		body:JSON.stringify({bks})

	};
	let responseText = await request(options);
	return JSON.parse(responseText);
};
const destroy_vetc = async bks=>{
	let options = {
		url:'http://'+host+':'+port+'/api/vetc/destroy',
		method:'POST',
		headers:{
			'user-agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.130 Safari/537.36 OPR/66.0.3515.72'
		},
		rejectUnauthorized:false,
		body:JSON.stringify({bks})

	};
	let responseText = await request(options);
	return JSON.parse(responseText);
};
const create_vetc = async (data)=>{
	let options = {
		url:'http://'+host+':'+port+'/api/vetc/add',
		method:'POST',
		headers:{
			'user-agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.130 Safari/537.36 OPR/66.0.3515.72'
		},
		rejectUnauthorized:false,
		body:JSON.stringify(data)

	};
	let responseText = await request(options);
	return JSON.parse(responseText);
};
const count_vr = async ()=>{
	let options = {
		url:'http://'+host+':'+port+'/api/vr/count',
		method:'POST',
		headers:{
			'user-agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.130 Safari/537.36 OPR/66.0.3515.72'
		},
		rejectUnauthorized:false

	};
	let responseText = await request(options);
	let {count} = JSON.parse(responseText);
	return count;
};
const count_vetc = async ()=>{
	let options = {
		url:'http://'+host+':'+port+'/api/vetc/count',
		method:'POST',
		headers:{
			'user-agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.130 Safari/537.36 OPR/66.0.3515.72'
		},
		rejectUnauthorized:false

	};
	let responseText = await request(options);
	let {count} = JSON.parse(responseText);
	return count;
};
const count_bks_action = async ()=>{
	let options = {
		url:'http://'+host+':'+port+'/api/bks/count',
		method:'POST',
		headers:{
			'user-agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.130 Safari/537.36 OPR/66.0.3515.72'
		},
		rejectUnauthorized:false

	};
	let responseText = await request(options);
	let {count} = JSON.parse(responseText);
	return count;
};
const find_vr = async (limit,skip)=>{
	let options = {
		url:'http://'+host+':'+port+'/api/vr/find-list',
		method:'POST',
		headers:{
			'user-agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.130 Safari/537.36 OPR/66.0.3515.72'
		},
		rejectUnauthorized:false,
		body:JSON.stringify({limit,skip})

	};
	let responseText = await request(options);
	return JSON.parse(responseText);
};
const find_vetc = async (limit,skip)=>{

	let options = {
		url:'http://'+host+':'+port+'/api/vetc/find-list',
		method:'POST',
		headers:{
			'user-agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.130 Safari/537.36 OPR/66.0.3515.72'
		},
		rejectUnauthorized:false,
		body:JSON.stringify({limit,skip})

	};
	let responseText = await request(options);
	return JSON.parse(responseText);
};
const find_bks = async (limit,skip)=>{
	if(isNaN(skip)) return [];
	let options = {
		url:'http://'+host+':'+port+'/api/bks',
		method:'GET',
		headers:{
			'user-agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.130 Safari/537.36 OPR/66.0.3515.72'
		},
		rejectUnauthorized:false,
		qs:{limit,skip}

	};
	let responseText = await request(options);
	return JSON.parse(responseText);
};
const find_bks_prior = async (limit,skip)=>{
	if(isNaN(skip)) return [];
	let options = {
		url:'http://'+host+':'+port+'/api/prior',
		method:'GET',
		headers:{
			'user-agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.130 Safari/537.36 OPR/66.0.3515.72'
		},
		rejectUnauthorized:false,
		qs:{limit,skip,sort:'createdAt DESC'}

	};
	let responseText = await request(options);
	return JSON.parse(responseText);
};
const delete_prior = async bks=>{
	let options = {
		url:'http://'+host+':'+port+'/api/prior/remove',
		method:'POST',
		headers:{
			'user-agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.130 Safari/537.36 OPR/66.0.3515.72'
		},
		rejectUnauthorized:false,
		body:JSON.stringify({bks})

	};
	return await request(options);
};
let refesh_vr = async (id)=>{
	let options = {
		url:'http://'+host+':'+port+'/api/vr/refresh',
		method:'POST',
		headers:{
			'user-agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.130 Safari/537.36 OPR/66.0.3515.72'
		},
		rejectUnauthorized:false,
		body:JSON.stringify({id})

	};
	return await request(options);

};
let refresh_vetc = async ()=>{
	let options = {
		url:'http://'+host+':'+port+'/api/vetc/refresh',
		method:'POST',
		headers:{
			'user-agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.130 Safari/537.36 OPR/66.0.3515.72'
		},
		rejectUnauthorized:false

	};
	return await request(options);
};
let get_config = async ()=>{
	let options = {
		url:'http://'+host+':'+port+'/api/delay/get',
		method:'POST',
		headers:{
			'user-agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.130 Safari/537.36 OPR/66.0.3515.72'
		},
		rejectUnauthorized:false

	};
	let responseText =  await request(options);
	return JSON.parse(responseText);
};
let check_prior = async ()=>{
	let options = {
		url:'http://'+host+':'+port+'/api/prior/count',
		method:'POST',
		headers:{
			'user-agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.130 Safari/537.36 OPR/66.0.3515.72'
		},
		rejectUnauthorized:false
	};
	let responseText = await request(options);
	let {num} = JSON.parse(responseText);
	return num;
};

let scan_vetc = async (list_code)=>{
	let vetc_account = await find_crawl('vetc');
	
	
	let {cookie} = vetc_account;
	let map_get_vetc = list_code.map(code=>get_vetc(code,cookie));
	let result = await Promise.all(map_get_vetc);
	
	
	for(let data of result){
		await destroy_vetc(data.bks);
		data.time_update = Date.now();

		await create_vetc(data);
	};
	return null;
};

let scan_vr = async (list_code,try_time = 0)=>{
	let vr_account = await find_crawl('vr');
	if(vr_account.length === 0) return false;
	let {cookie,username,limit,scanned,id} = vr_account[0];
	try{
		
		let {__VIEWSTATE,__VIEWSTATEGENERATOR,__EVENTVALIDATION} = await find_config_vr(username);


		let list_code_length = list_code.length;
		list_code = list_code.slice(0,(limit > (scanned + list_code_length) ) ? list_code_length : (limit - scanned));
		let map_get_vr = list_code.map(code=>get_vr(code,cookie,__VIEWSTATE,__VIEWSTATEGENERATOR,__EVENTVALIDATION,id));
		let result = await Promise.all(map_get_vr);


		for(let data of result){
			await destroy_vr(data.bks);
			data.time_update = Date.now();
			await delete_prior(data.bks);
			await create_vr(data);
		};
		return true;
	}catch(error){
		if(try_time < 10){

			await refesh_vr(id);
			await wait(5000);
			return await scan_vr(list_code,try_time+=1);
		}else{
			
			await turn_off_acc(id);
			throw error;
		}
	}
	return;	
};

let run_vr = async (skip = 0,top = false)=>{
	let data_config = await get_config();
	try{
		
		let limit = data_config.vr_time;
		let num_prior = await check_prior();
		if(!data_config) throw 'Chưa cấu hình tốc độ chạy VR';

		let list_bks_prior = await find_bks_prior(limit,skip)

		if(list_bks_prior.length > 0){
			top = true;
			await wait(data_config.vr_delay*1000);

			let check_scan = await scan_vr(list_bks_prior.map(({code})=>code));
			if(!check_scan){

				await wait(5000);
				return await run_vr(skip,top);
			}
		}else {
			if(top) {
				prior_index.push('vr');
				await drop_prior();
			};


			let count_vr_data = await count_vr();
			if((skip === 0) || top) skip = count_vr_data;   
			top = false;           
			let list_bks_data = await find_bks(limit,skip);
			if(list_bks_data.length === 0){

				await wait(data_config.vr_delay*1000);
				console.log('QUET VR: khong tim thay BKS moi');
				return await run_vr(0,top);
			}else{
				await wait(data_config.vr_delay*1000);
			}
			let check_scan = await scan_vr(list_bks_data.map(({code})=>code));
			if(!check_scan){

				await wait(5000);
				return await run_vr(skip,top);
			}                 
		}
		
		

		return await run_vr(skip+=limit,top);
	}catch(e){
		console.log(e);
		await wait(data_config.vr_delay);
		

		return await run_vr(0,top)
	}
};
let run_vetc = async (skip = 0,top = false)=>{
	let data_config = await get_config();
	try{

		
		let limit = data_config.vetc_time;
		let num_prior = await check_prior();
		if(!data_config) throw 'Chưa cấu hình tốc độ chạy VETC';
		let list_bks_prior = await find_bks_prior(limit,skip);
		if(list_bks_prior.length > 0){
			top = true;
			await wait(data_config.vetc_delay*1000);
			await scan_vetc(list_bks_prior.map(({code})=>code));

		}else {
			if(top) {
				prior_index.push('vetc');
				await drop_prior();
			};


			let count_vetc_data = await count_vetc();
			if((skip === 0) || top) skip = count_vetc_data;
			top = false;
			let list_bks_data = await find_bks(limit,skip);
			if(list_bks_data.length === 0){
				await wait(data_config.vetc_delay*1000);
				console.log('QUET VETC: khong tim thay BKS moi');
				return await run_vetc(0,top);
			}else{
				await wait(data_config.vetc_delay*1000);
			}
			await scan_vetc(list_bks_data.map(({code})=>code));
		}
		
		return await run_vetc(skip+=limit,top);
	}catch(e){
		console.log(e);	
		await wait(data_config.vetc_delay*1000);
		await refresh_vetc();
		return await run_vetc(0,top)
	}
};
run_vr();
run_vetc();
