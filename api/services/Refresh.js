
module.exports = {
	vr:async function(id){

		let {username,password} = await Crawl.findOne({id});;
		

		let cookie =  await GetCookie_vr(username,password);
		let {__VIEWSTATE,__VIEWSTATEGENERATOR,__EVENTVALIDATION} = await GetConfig_vr(cookie);
		
		let data = await Crawl.update({id}).set({active:true,cookie,status:true,startTime:Date.now()});
		await Config.destroy({username});
		await Config.create({__VIEWSTATE,__VIEWSTATEGENERATOR,__EVENTVALIDATION,username});
		return cookie;
	},
	vetc:async function(){
		let find_vetc = await Crawl.findOne({type:'vetc'});
		if(!find_vetc) return null;
		let {username,password} = find_vetc;
		let cookie =  await GetCookie_vetc(username,password);
		await Crawl.update({type:'vetc'}).set({cookie});
		return cookie;
	}
}
