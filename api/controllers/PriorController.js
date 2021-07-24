const fs = require('fs');
const cmd = require('node-cmd');
function isBks(n) {
	n = n.slice(0,2);
  return !isNaN(parseFloat(n)) && isFinite(n);
};
module.exports = {

	up:async function(req,res){
		req.file('code').upload(async function (err, uploadedFiles) {

			if(!(uploadedFiles[0] || {filename:''}).filename.includes('.txt')) return res.send({error:'File tải lên phải đúng định dạng .txt'});

			let content = fs.readFileSync(uploadedFiles[0].fd, 'utf8');
			let list_code = content.split('\n');
			for(let code of list_code){
				code = code.replace(/[^a-zA-Z0-9]/g,'').toUpperCase();
				if((code.length > 0) && isBks(code)){
					let find = await Prior.findOne({code});
					if(!find) await Prior.create({code})
				}
		}
cmd.run('sudo pm2 restart auto');
		return res.send(list_code.length.toString());
	});
	},
        drop:async function(req,res){
          await Prior.destroy({});
          return res.ok();
       },
	count:async function(req,res){
		let num = await Prior.count();
		return res.send({num})
	},
	removeAll:async function(req,res){
		console.log('hello world');
		await Prior.destroy({});
		return res.ok();
       },
       remove:async function(req,res){
              let {bks} = req.body;
              await Prior.destroy({code:bks});
              return res.ok();

       }
};

