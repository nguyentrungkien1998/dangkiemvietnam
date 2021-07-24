const request = require('request-promise');
const cheerio = require('cheerio');
const Refresh = require('./Refresh');
module.exports = async (bks,cookie,__VIEWSTATE,__VIEWSTATEGENERATOR,__EVENTVALIDATION)=>{
	
		var headers = {
			'Connection': 'keep-alive',
			'Cache-Control': 'max-age=0',
			'Upgrade-Insecure-Requests': '1',
			'Origin': 'http://app.vr.org.vn',
			'Content-Type': 'application/x-www-form-urlencoded',
			'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36 OPR/69.0.3686.77',
			'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
			'Referer': 'http://app.vr.org.vn/ptpublicweb/ThongTinPT.aspx',
			'Accept-Language': 'vi-VN,vi;q=0.9,fr-FR;q=0.8,fr;q=0.7,en-US;q=0.6,en;q=0.5',
			'Cookie':cookie
		};

		var options = {
			url: 'http://app.vr.org.vn/ptpublicweb/ThongTinPT.aspx',
			headers: headers,
			method:'POST',
			form:{
				__VIEWSTATE,
				__VIEWSTATEGENERATOR,
				__EVENTVALIDATION,
				'txtBienDK':bks,
				'Button1':'Tra cứu',
			}
		};

		let responseHTML = await request(options);
		let $ = cheerio.load(responseHTML);

		let loai_phuong_tien = $('span#txtLoaiPT').text();
		let so_may_thuc_te = $('span#txtSoMay').text();
		let chu_phuong_tien = $('span#txtChuPT').text();
		let dia_chi_chu_phuong_tien = $('span#txtDiaChi').text();
		let nhan_hieu = $('span#txtNhanHieu').text();
		let so_khung_thuc_te = $('span#txtSoKhung').text();
		let khoi_luong_ban_than = $('span#txtTuTrongTK').text();
		let so_nguoi_cho_phep_tro = $('span#txtSoCho').text();
		let kinh_doanh_van_tai = $('span#txtKDVT').text();
		let lap_dat_thiet_bi_GSHT = $('span#txtTB_GSHT').text();
		let cong_thuc_banh_xe = $('span#txtCTBanhXe').text();
		let kich_thuoc_bao = $('span#txtKichThuocBao').text();
		let chieu_dai_co_so = $('span#txtChieuDaiCoSo').text();
		let khoi_luong_hang_hoa_chuyen_cho_cho_phep_TGGT = $('span#txtTaiTrongGT').text();
		let khoi_luong_toan_bo_cho_phep_tham_gia_giao_thong = $('span#txtTrLgToanBoGT').text();
		let khoi_luog_keo_theo_cho_phep = $('span#txtTrLgToanBoGT').text();
		let phuong_tien_cai_tao = $('span#txtCaiTao').text();
		let vet_banh_xe = $('span#txtVetBanhXe').text();
		let kich_thuoc_thung_hang = $('span#txtKichThuocThung').text();
		let co_lop = $('span#txtCoLop').text();
		let nam_san_xuat = $('span#txtNamSX').text();

		let lan_cuoi_kiem_dinh_da_thuc_hien = [];
		$('table#DGKiemDinh').find('tr').each(function(){
			let don_vi_kiem_dinh = $(this).find('td').eq(0).text();
			let ngay_KD = $(this).find('td').eq(1).text();
			let so_tem_GCN = $(this).find('td').eq(2).text();
			let thoi_han_KD = $(this).find('td').eq(3).text();

			lan_cuoi_kiem_dinh_da_thuc_hien.push({don_vi_kiem_dinh,ngay_KD,so_tem_GCN,thoi_han_KD})
		});
		lan_cuoi_kiem_dinh_da_thuc_hien = lan_cuoi_kiem_dinh_da_thuc_hien.slice(1)
		let data= {bks,loai_phuong_tien,so_may_thuc_te,chu_phuong_tien,dia_chi_chu_phuong_tien,nhan_hieu,so_khung_thuc_te,khoi_luong_ban_than,nam_san_xuat,so_nguoi_cho_phep_tro,kinh_doanh_van_tai,lap_dat_thiet_bi_GSHT,cong_thuc_banh_xe,kich_thuoc_bao,chieu_dai_co_so,khoi_luong_hang_hoa_chuyen_cho_cho_phep_TGGT,khoi_luong_toan_bo_cho_phep_tham_gia_giao_thong,khoi_luog_keo_theo_cho_phep,phuong_tien_cai_tao,vet_banh_xe,kich_thuoc_thung_hang,co_lop,lan_cuoi_kiem_dinh_da_thuc_hien};
		return data;
	
};
