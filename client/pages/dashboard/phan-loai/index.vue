<template>
	<el-row>
		<el-col :span="24" :offset="0">
			<el-form ref="form" :rules="ruleForm"   status-icon label-width="auto" label-position="top" :inline="false" :disabled="false" :inline-message="false" show-message validate-on-rule-change size="small">

				<el-form-item label="Thời gian duyệt hồ sơ : " prop="range_time" align="left">
					<el-date-picker
					v-model="range_time"
					type="daterange"
					:picker-options="pickerOptions"
					range-separator="To"
					start-placeholder="Từ ngày"
					end-placeholder="Đến ngày"
					value-format="timestamp"
                                        unlink-panels
					align="left">
				</el-date-picker>
			</el-form-item>
			<el-form-item label="Danh sách cột đăng kiểm : " prop="list_bks" align="left">
				<el-checkbox-group v-model="vr">
					<el-checkbox v-for="({label,text},index) in options.filter(e=>e.type ==='vr')" :key="index" :label="label" :border="false" :checked="label === 'bks'" :disabled="label === 'bks'">{{text}}</el-checkbox>	
				</el-checkbox-group>


			</el-form-item>
			<el-form-item label="Danh sách cột thông tin chủ sở hữu : " prop="list_bks" align="left">
				<el-checkbox-group v-model="vetc">
					<el-checkbox v-for="({label,text},index) in options.filter(e=>e.type ==='vetc')" :key="index" :label="label" :border="false" :checked="(label === 'hoso_time')" :disabled="label === 'hoso_time'">{{text}}</el-checkbox>					
				</el-checkbox-group>

			</el-form-item>
			<el-form-item label="Danh sách biển số : " align="left">
				<el-input v-model="text" type="textarea" :rows="4" :autosize="false" placeholder="Nhập danh sách biển số ( Nếu để trống sẽ lấy tất cả)"></el-input>
			</el-form-item>

			<el-form-item align="center">
				<el-button type="primary" @click="export_data" :loading="loading" size="small">Export</el-button>
			</el-form-item>
		</el-form>
	</el-col>

</el-row>
</template>
<script>
	export default {
		data(){
			return {
				bks:'',
				options:[
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
				{ type:'vr', text:'Lần cuối đăng kiểm đã thực hiện',label:'lan_cuoi_kiem_dinh_da_thuc_hien'},
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
				],


				pickerOptions: {
					shortcuts: [{
						text:'Tuần trước',
						onClick(picker) {
							const end = new Date();
							const start = new Date();
							start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
							picker.$emit('pick', [start, end]);
						}
					}, {
						text:'Tháng trước',
						onClick(picker) {
							const end = new Date();
							const start = new Date();
							start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
							picker.$emit('pick', [start, end]);
						}
					}, {
						text:'3 tháng trước',
						onClick(picker) {
							const end = new Date();
							const start = new Date();
							start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
							picker.$emit('pick', [start, end]);
						}
					}]
				},
				text:'',
				vr:[],
				vetc:[],
				range_time:[],
				loading:false,
				ruleForm:{
					
				},
				
				loading:false

			}
		},
		computed:{
			list_bks(){
				return this.text.split('\n').filter(e=>e.length > 0);
			}
		},
		methods:{
			async export_data(){
				this.loading = true;
				if((this.list_bks.length === 0) && (this.range_time.length === 0)){
					return this.$message({type:'error',message:'Bạn phải chọn khoản thời gian Hoặc nhập danh sách biển kiểm soát.'})
				};

				let start = this.range_time[0];
				let end = this.range_time[1];


				let response = await this.$axios.post('/api/crawl/export',{start,end,list_bks:this.list_bks,vr:this.vr,vetc:this.vetc},{responseType: 'blob'})
				

				const url = window.URL.createObjectURL(new Blob([response.data]));
				const link = document.createElement('a');
				link.href = url;
   link.setAttribute('download', 'linhngan.xlsx'); //or any other extension
   document.body.appendChild(link);
   link.click();


   this.loading = false;

}
}
}
</script>
<style scoped>

</style>
