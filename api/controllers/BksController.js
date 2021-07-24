
const fs = require('fs');
function isBks(n) {
	n = n.slice(0,2);
  return !isNaN(parseFloat(n)) && isFinite(n);
};
let validate = async (req)=>await Security.decode(req.headers.authorization);
module.exports = {
	up:async function(req,res){
		req.file('code').upload(async function (err, uploadedFiles) {

			if(!(uploadedFiles[0] || {filename:''}).filename.includes('.txt')) return res.send({error:'File tải lên phải đúng định dạng .txt'});

			let content = fs.readFileSync(uploadedFiles[0].fd, 'utf8');
			let list_code = content.split('\n');
			for(let code of list_code){
				code = code.replace(/[^a-zA-Z0-9]/g,'').toUpperCase();
				if((code.length > 0) && isBks(code)){
					let find = await Bks.find({code});
					if(find.length === 0) await Bks.create({code})
				}
		}
		return res.send(list_code.length.toString());
	});
	},
	'find-list':async function(req,res){
		let {limit,skip} = req.query;
		limit = limit || 1;
		skip = skip || 0;
		let data = await Bks.find().sort("createdAt ASC").limit(limit).skip(skip);
		return res.send(data);
	},
	'get':async function(req,res){
		let {page} = req.body;
		page = page || 1;
		page = parseInt(page);
		let data = await Bks.find().limit(10).skip((page-1)*10);
		return res.send(data);
	},
	count:async function(req,res){
		let data = await Bks.count({});
		return res.send({count:data})
	}




};

