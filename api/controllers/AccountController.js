/**
 * AccountController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
 const fs = require('fs');
 const random = require('randomstring');
 const verify_email_template = fs.readFileSync('./api/templates/verify-email.html','UTF-8');
 const verify_phone_template = fs.readFileSync('./api/templates/verify-phone.txt','UTF-8');

 const forgot_email_template = fs.readFileSync('./api/templates/forgot-email.html','UTF-8');
 const forgot_phone_template = fs.readFileSync('./api/templates/forgot-phone.txt','UTF-8');
 
 const {head:{title},domain,limit_log} = require('../../nuxt.config');
 let validate = async (req)=>await Security.decode(req.headers.authorization);
 module.exports = {
 	info:async function(req,res){
 		try{
 			let {id,log,time} = await validate(req);
 			let data = await Account.findOne({id,logs:{contains:log}});
 			if(!data) throw null;
 			return res.json(data);
 		}catch(error){
 			
 			return res.send({error:'Token hết hạn'})
 		}
 	},
 	register:async function(req,res){
 		try{
 			let {id,log,time} = await validate(req);
 			
 			let find_admin = await Account.findOne({id,username:'admin'});
 			if(!find_admin) throw 'Bạn không được cấp quyền sử dụng tính năng này !';
 			let {username,permission,phone,password} = req.body;
 			if(!username) throw 'Không tìm thấy tên đăng nhập';
 			if((permission || []).length === 0 ) throw 'Bạn phải chọn ít nhất 1 quyền sử dụng';
 			if(username){
 				let find_exists = await Account.findOne({username});
 				if(find_exists) throw 'Tên đăng nhập này đã được đăng kí';
 			}
 			

 			let pass_hash = await Security.encode(password);

 			let user = await Account.create({username,pass_hash,permission}).fetch();

 			

 			return res.send(user);

 		}catch(error){
 			
 			return res.send({error})
 		}
 	},
 	login:async function(req,res){
 		try{
 			let {username,password} = req.body;
 			
 			if(!username) throw 'Không tìm thấy tên đăng nhập';

 			let find = null;
 			if(username) find = await Account.findOne({username});
 			
 			if(!find) throw 'Tài khoản chưa được kích hoạt !';

 			let {id,pass_hash,logs} = find;

 			
 			let password_user = await Security.decode(pass_hash);
 			
 			if(password !== password_user) throw 'Login failed';
 			let log = random.generate(32);
 			logs = logs.length >= limit_log ? logs.slice(logs.length - (limit_log - 1)) : logs;
 			logs.push(log);
 			await Account.update({id}).set({logs});

 			let token = await Security.encode({id,log,time:Date.now()})
 			
 			return res.json({token});

 		}catch(error){
 			
 			if(!error) error = 'Not Found';
 			return res.send({error});
 		}
 	},
 	'check-password':async function(req,res){
 		try{
 			let {id,log,time} = await validate(req);
 			let data = await Account.findOne({id,logs:{contains:log}});
 			if(!data) throw null;
 			let {password} = req.body;
 			let password_user = await Security.decode(data.pass_hash);
 			if(password_user !== password) throw 'Mật khẩu không chính xác.';

 			return res.json({code:log});
 		}catch(error){
 			
 			return res.send({error})
 		}
 	},
 	'update-password':async function(req,res){
 		try{
 			let {id,log,time} = await validate(req);
 			let data = await Account.findOne({id,logs:{contains:log}});
 			if(!data) throw null;
 			let {code,password} = req.body;
 			let pass_hash = await Security.encode(password);
 			await Account.update({id,logs:{contains:code}}).set({pass_hash})
 			return res.ok();
 		}catch(error){
 			
 			return res.send({error:'Token hết hạn'})
 		}
 	},
 	logout:async function(req,res){
 		let {id,log,time} = await validate(req);
 		await Account.update({id}).set({logs:[]});
 		return res.ok();
 	},
 	'permission/update':async function(req,res){
 		try{
 			let {id,log,time} = await validate(req);
 			let data = await Account.findOne({id,username:'admin'});
 			if(!data) throw 'Bạn không được cấp quyền sử dụng tính năng này';
 			let {id_user,permission} = req.body;
 			await Account.update({id:id_user}).set({permission});
 			return res.ok();
 		}catch(error){
 			
 			return res.send({error})
 		}
 	},
 	'permission/admin':async function(req,res){
 		try{
 			let {id,log,time} = await validate(req);
 			let data = await Account.findOne({id,username:'admin'});
 			if(!data) throw 'Bạn không được cấp quyền sử dụng tính năng này';
 			return res.json({admin:true});
 		}catch(error){
 			
 			return res.send({error})
 		}
 	},
 	permission:async function(req,res){
 		try{
 			let {id,log,time} = await validate(req);
 			let data = await Account.findOne({id});
 			if(!data) throw 'Không tìm thấy tài khoản';
 			return res.json({permission:data.permission});
 		}catch(error){
 			console.log(error)
 			return res.send({error})
 		}
 	}

 };

