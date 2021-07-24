/**
 * CrawlController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
 const Excel = require('exceljs');
 let options = [
 { type:'vr', text:'Biển kiểm soát',label:'bks'},
 { type:'vr', text:'Chủ sở hữu',label:'chu_phuong_tien'},
 { type:'vr', text:'Loại phương tiện',label:'loai_phuong_tien'},
 { type:'vr', text:'Địa chỉ',label:'dia_chi_chu_phuong_tien'},
 { type:'vr', text:'Khối lượng toàn bộ cho phép',label:'khoi_luong_toan_bo_cho_phep_tham_gia_giao_thong'},
 { type:'vr', text:'Số máy thực tế',label:'so_may_thuc_te'},
 { type:'vr', text:'Số khung thực tế',label:'so_khung_thuc_te'},
 { type:'vr', text:'Chở tối đa',label:'so_nguoi_cho_phep_tro'},
 { type:'vr', text:'Khối Lượng hàng hóa cho phép TGGT',label:'khoi_luong_hang_hoa_chuyen_cho_cho_phep_TGGT'},
 { type:'vr', text:'Thiết bị Giám sát hành trình',label:'lap_dat_thiet_bi_GSHT'},
 { type:'vr', text:'Khối lượng kéo theo cho phép',label:'khoi_luog_keo_theo_cho_phep'},
 { type:'vr', text:'Công thức bánh xe',label:'cong_thuc_banh_xe'},
 { type:'vr', text:'Kinh Doanh Vận Tải',label:'kinh_doanh_van_tai'},
 { type:'vr', text:'Khối lượng bản thân',label:'khoi_luong_ban_than'},
 { type:'vr', text:'Năm sản xuất',label:'nam_san_xuat'},
 { type:'vr', text:'Kích thước bao',label:'kich_thuoc_bao'},
 { type:'vr', text:'Phương tiện cải tạo',label:'phuong_tien_cai_tao'},
 { type:'vr', text:'Vết bánh xe',label:'vet_banh_xe'},
 { type:'vr', text:'Chiều dài cơ sở',label:'chieu_dai_co_so'},
 { type:'vetc', text:'Họ và Tên',label:'ho_ten'},
 { type:'vetc', text:'Ngày sinh',label:'ngay_sinh'},
 { type:'vetc', text:'Địa chỉ',label:'dia_chi'},
 { type:'vetc', text:'Giới tính',label:'gioi_tinh'},
 { type:'vetc', text:'Số điện thoại',label:'phone'},
 { type:'vetc', text:'Số chứng minh',label:'cmnd'},
 { type:'vetc', text:'Ngày cấp chứng minh',label:'ngay_cap'},
 { type:'vetc', text:'Tỉnh',label:'tinh'},
 { type:'vetc', text:'Trạng thái',label:'trang_thai'},
 { type:'vetc', text:'Ngày hiệu lực',label:'ngay_hieu_luc'},
 { type:'vetc', text:'Ngày duyệt hồ sơ',label:'hoso_time'},
 { type:'vetc', text:'Hồ Sơ TT Duyệt',label:'hoso_tt_duyet'},
 { type:'vetc', text:'Hồ Sơ Đại lý',label:'hoso_dai_li'},
 { type:'vetc', text:'Chu kì hóa đơn',label:'chu_ki_hoa_don'},
 { type:'vetc', text:'Mã tài khoản',label:'ma_tai_khoan'}
 ];
 let timeConverter = function(UNIX_timestamp){
 	var a = new Date(UNIX_timestamp);

 	var year = a.getFullYear();
 	var month = a.getMonth()+1;
 	var date = a.getDate();

 	var time = date + '-' + month + '-' + year;
 	return time;
 };
 module.exports = {
 	'remove-config':async function(req,res){
 		let {username} = req.body;
 		await Config.destroy({username});
 		return res.ok();
 	},
 	'find-config-vr':async function(req,res){
 		let {username} = req.body;
 		let data = await Config.find({username});
 		return res.send(data[0]);
 	},
 	'find-acc':async function(req,res){
 		let {type} = req.body;

 		let phut = 60000; // ms
 		let gio = 3600000; // ms
 		let ngay = 86400000; // ms

 		if(type === 'vr'){
 			let list_vr = await Crawl.find({type:'vr'});
 			for(let {startTime,limit,id,scanned} of list_vr){
 				let now = Date.now();
 				if((now > (startTime+ngay)) && (scanned >= limit)){
 					
 					await Crawl.update({id}).set({scanned:0,active:true,startTime:now});
 					list_vr = list_vr.map(e=>{
 						if(e.id === id) {
                            e.active = true;
 							e.scanned = 0;
 							e.startTime = now;
 						}
 						return e;
 					})
 				}
 				
 			}
 			let data = list_vr.filter(({scanned,limit,active})=>active && (scanned < limit));
 			return res.send(data);
 		}else {
 			let data = await Crawl.findOne({type:'vetc'});
 			return res.send(data);
 		}
 		
 	},
 	'update-scanned':async function(req,res){
 		
 		try{

 			let {id} = req.body;
 			if(!id) throw 'Không tìm thấy id tài khoản';
 			
 			let find_acc = await Crawl.findOne({id});
 			if(!find_acc) throw 'Acc không tồn tại';
 			
 			await Crawl.update({id}).set({scanned:find_acc.scanned+=1});
 			return res.ok();  
 		}catch(error){
 			
 			return res.send({error});
 		}
 		
 	},
 	'turn-off-acc':async function(req,res){
		let {id} = req.body;
 		await Crawl.update({id}).set({active:false});
 		return res.ok();
 	},
 	'update-acc':async function(req,res){
 		let {type,cookie} = req.body;
 		await Crawl.update({type}).set({cookie});
 		return res.ok();
 	},
 	'add-vr':async function(req,res){
 		try{
 			let {username,password,limit} = req.body;
 			limit = limit || 0;
 			let cookie = await GetCookie_vr(username,password);
 			if(!cookie) throw false;
			await Crawl.destroy({username});

 			let {__VIEWSTATE,__VIEWSTATEGENERATOR,__EVENTVALIDATION} = await GetConfig_vr(cookie);
 			let data = await Crawl.create({username,password,limit,cookie,type:'vr',status:true,startTime:Date.now()}).fetch();
 			await Config.create({__VIEWSTATE,__VIEWSTATEGENERATOR,__EVENTVALIDATION,username});
 			
 			return res.send(data);
 		}catch(error){
 			error = 'Tài khoản hoặc mật khẩu không chính xác.';
 			return res.send({error})
 		}

 	},
 	'add-vetc':async function(req,res){
 		try{
 			
 			let {username,password,limit} = req.body;
 			limit = limit || 0;
 			let cookie = await GetCookie_vetc(username,password);
 			if(!cookie) throw false;
 			await Crawl.destroy({username})
 			let data = await Crawl.create({username,password,limit,cookie,type:'vetc',status:true,startTime:Date.now()}).fetch();
 			return res.send(data);
 		}catch(error){
 			
 			error = 'Tài khoản hoặc mật khẩu không chính xác.';
 			return res.send({error})
 		}
 	},
 	count:async function(req,res){
 		let vr = await Vr.count();
 		let vetc = await Vetc.count();
 		let code = await Bks.count();
 		return res.send({count:{vr,vetc,code}});
 	},
 	export:async function(req,res){
 		try{
 			let {start,end,list_bks,vr,vetc} = req.body;
 			
 			if((!start || !end) && (list_bks.length === 0)) throw 'Bạn phải điền danh sách biển kiểm soát hoặc Khoảng thời gian';
 			if((vr.length === 0) && (vetc.length === 0)) throw 'Bạn chưa chọn cột dữ liệu';
 			if(!vetc.includes('hoso_time')) vetc.push('hoso_time');
 			if(!vr.includes('bks')) vr.push('bks');
 			if(!vetc.includes('bks')) vetc.push('bks');
 			let vr_worksheet = options.filter(({label})=>vr.includes(label) && label !== 'bks').map(({text,label})=>({header:text,key:label,width:20}))
 			let vetc_worksheet = options.filter(({label})=>vetc.includes(label) && label !== 'bks').map(({text,label})=>({header:text,key:label,width:20}))
 			let headers_excel = vr_worksheet.concat(vetc_worksheet);
 			
 			if(vr.includes('lan_cuoi_kiem_dinh_da_thuc_hien')){

 				headers_excel = headers_excel.concat([
 					{header:'Đơn vị kiểm định',key:'don_vi_kiem_dinh',width:20},
 					{header:'Ngày kiểm định',key:'ngay_KD',width:20},
 					{header:'Số tem GCN',key:'so_tem_GCN',width:20},
 					{header:'Thời hạn kiểm định',key:'thoi_han_KD',width:20},

 					]);
 			}
 			headers_excel.unshift({header:'Biển kiểm soát',key:'bks',width:20});4
 			let find_vr = async bks =>{
 				
 				let data = await Vr.findOne({where:{bks},select:vr});
 				return data || {bks}
 			};
 			let find_vetc = async bks =>{
 				let data = await Vetc.findOne({where:{bks},select:vetc});
 				return data || {bks};
 			};
 			let find_vetc_time = async (bks,start,end)=>{
 				let data = await Vetc.findOne({where:{bks,hoso_time:{'>':start,'<':end}},select:vetc});
 				return data || {bks};
 			};
 			let result = [];
 			if((list_bks.length === 0) && start && end){
 				result = await Vetc.find({where:{hoso_time:{'>':start,'<':end}},select:vetc});
 				if(vr.filter(e=>e!=='bks').length > 0){
 					let vr_data_map = result.map(({bks})=>find_vr(bks));
 					let vr_data = await Promise.all(vr_data_map);
 					result = result.map(item => ({
 						...item,
 						...vr_data.find(({ bks }) => bks === item.bks),
 					}));

 				}	
 			}else if((list_bks.length > 0) && (!start || !end)){
 				let vetc_data_map = list_bks.filter(e=>e.length > 0).map(bks=>find_vetc(bks));
 				result = await Promise.all(vetc_data_map);

 				if(vr.filter(e=>e!=='bks').length > 0){
 					let vr_data_map = result.map(({bks})=>find_vr(bks));
 					let vr_data = await Promise.all(vr_data_map);
 					result = result.map(item => ({
 						...item,
 						...vr_data.find(({ bks }) => bks === item.bks),
 					}));
 				}

 			}else if((list_bks.length > 0) && start && end){
 				let vetc_data_map = list_bks.filter(e=>e.length > 0).map(bks=>find_vetc_time(bks,start,end));
 				result = await Promise.all(vetc_data_map);

 				if(vr.filter(e=>e!=='bks').length > 0){
 					let vr_data_map = result.map(({bks})=>find_vr(bks));
 					let vr_data = await Promise.all(vr_data_map);
 					result = result.map(item => ({
 						...item,
 						...vr_data.find(({ bks }) => bks === item.bks),
 					}));
 				}
 			}
 			result = result.map(e=>{
 				if(e.hoso_time) e.hoso_time = timeConverter(e.hoso_time);
 				if(e.ngay_sinh) e.ngay_sinh = timeConverter(e.ngay_sinh);
 				
 				if(e.ngay_cap) e.ngay_cap = timeConverter(e.ngay_cap);
 				if(e.ngay_hieu_luc) e.ngay_hieu_luc = timeConverter(e.ngay_hieu_luc);
 				return e;
 			});
 			let workbook = new Excel.Workbook();
 			workbook.addWorksheet('linh_ngan');
 			let worksheet = workbook.getWorksheet('linh_ngan');
 			worksheet.columns = headers_excel;

 			for(let row of result){

 				if((row.lan_cuoi_kiem_dinh_da_thuc_hien || []).length > 0){
 					row.don_vi_kiem_dinh = row.lan_cuoi_kiem_dinh_da_thuc_hien[0].don_vi_kiem_dinh;
 					row.ngay_KD = row.lan_cuoi_kiem_dinh_da_thuc_hien[0].ngay_KD;
 					row.so_tem_GCN = row.lan_cuoi_kiem_dinh_da_thuc_hien[0].so_tem_GCN;
 					row.thoi_han_KD = row.lan_cuoi_kiem_dinh_da_thuc_hien[0].thoi_han_KD;

 				}
 				worksheet.addRow(row);

 			}
 			
 			workbook.xlsx.writeBuffer()
 			.then(function(buffer) {
 				res.setHeader('Content-disposition', 'attachment; filename=linh_ngan.xlsx');
 				res.setHeader('Content-type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
 				res.charset = 'UTF-8';
 				res.write(new Buffer(buffer, 'base64'));
 				return res.end();
 			});
 			
 		}catch(error){
 			console.log(error);
 			return res.send({error})
 		}
 		
 	}
 };

