

module.exports = {
	'set':async function(req,res){
		try{
			let {bks} = req.body;
			if(!bks) throw 'Không tìm thấy BKS';
			let find_account_vetc = await Crawl.findOne({type:'vetc'});
			if(!find_account_vetc) throw 'Không tìm thấy tài khoản Vetc nào ';
			let {cookie} = find_account_vetc;
			let data = await GetInfo_vetc(bks,cookie);
			if((data.bks || '').length < 3) throw 'Không xóa được bks:'+bks;
			await Vetc.destroy({bks:data.bks});
			await Vetc.create(data);
			return res.send({success:true});
		}catch(error){
			
			return res.send({error});
		}
	},
        'refresh':async function(req,res){
              await Refresh.vetc();
              return res.ok();
        },
	'find-list':async function(req,res){
		let {limit,skip} = req.body;
		limit = limit || 1;
		skip = skip || 0;
		let data = await Vetc.find().sort("createdAt ASC").limit(limit).skip(skip);
		return res.send(data);
	},
	'count':async function(req,res){
		let data = await Vetc.count({});
		return res.send({count:data})
	},
	'add':async function(req,res){
		
		await Vetc.create(req.body);
		return res.send({success:true});
		
	},
	'destroy':async function(req,res){
		try{
			let {bks} = req.body;
			bks = bks || '';
			if(bks.length < 4) throw 'Lỗi khi xóa bks:'+bks;
			await Vetc.destroy({bks});
			return res.send({success:true});
		}catch(error){
			return res.send({error});
		}

	}
};

