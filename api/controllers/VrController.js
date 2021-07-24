

module.exports = {
	'set':async function(req,res){
		try{
			let {bks} = req.body;
			if(!bks) throw 'Không tìm thấy BKS';
			let find_account_vr = await Crawl.findOne({type:'vr'});
			if(!find_account_vr) throw 'Không tìm thấy tài khoản Vr nào ';
			let {cookie} = find_account_vr;
			let data = await GetInfo_vr(bks,cookie);
			if((data.bks || '').length < 3) throw 'Không xóa được bks:'+bks;
			await Vr.destroy({bks:data.bks});
			await Vr.create(data);
			return res.send({success:true})
		}catch(error){
			return res.send({error});
		}
	},
        'refresh':async function(req,res){
        	let {id} = req.body;
              await Refresh.vr(id);
              return res.send({success:true});
        },
	'find-list':async function(req,res){

        	let {limit,skip} = req.body;
		limit = limit || 1;
		skip = skip || 0;
		let data = await Vr.find().sort("createdAt ASC").limit(parseInt(limit)).skip(parseInt(skip));
		return res.send(data);
	},
	'count':async function(req,res){
		let data = await Vr.count({});
		return res.send({count:data})
	},
	'add':async function(req,res){
		
		await Vr.create(req.body);
		return res.send({success:true});
		
	},
	'destroy':async function(req,res){
		try{
			let {bks} = req.body;
			bks = bks || '';
			if(bks.length < 4) throw 'Lỗi khi xóa bks:'+bks;
			await Vr.destroy({bks});
			return res.send({success:true});
		}catch(error){
			return res.send({error});
		}
	}
};

