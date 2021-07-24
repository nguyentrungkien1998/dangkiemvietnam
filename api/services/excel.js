const Excel = require('exceljs');
let make = async (req,res)=>{
	let workbook = new Excel.Workbook();
	workbook.addWorksheet('Thoi_gian_dang_kiem_gan_nhat');
	let worksheet = workbook.getWorksheet('Thoi_gian_dang_kiem_gan_nhat');
	worksheet.columns = [
	{header:'Biển kiểm soát',key:'code', width: 20},
	{ header: 'Đơn vị kiểm định', key: 'don_vi_kiem_dinh', width: 20},
	{ header: 'Ngày KĐ', key: 'ngay_KD', width: 20},
	{header:'Số tem GCN',key:'so_tem_GCN', width: 20},
	{header:'Thời hạn KĐ',key:'thoi_han_KD', width: 20},

	];
	worksheet.addRow({code,don_vi_kiem_dinh:don_vi_kiem_dinh || '',ngay_KD:ngay_KD || '',so_tem_GCN:so_tem_GCN || '',thoi_han_KD:thoi_han_KD || ''});
	workbook.xlsx.writeBuffer()
	.then(function(buffer) {
		res.setHeader('Content-disposition', 'attachment; filename=Thoi_gian_dang_kiem_gan_nhat.xlsx');
		res.setHeader('Content-type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
		res.charset = 'UTF-8';
		res.write(new Buffer(buffer, 'base64'));
		return res.end();
	});
};