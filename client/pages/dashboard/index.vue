<template>
	<el-row>
		<el-col :span="24" :offset="0">
			<el-row v-if="permission.find(e=>(e === 'dang_kiem') || (e === 'thong_tin_chu_so_huu'))">
				<el-col :span="10" :offset="0">
					<el-form ref="form" :rules="ruleForm" :model="formData"  status-icon label-width="auto" label-position="top" :inline="true" :disabled="false" :inline-message="false" show-message validate-on-rule-change size="small">
						<el-form-item label="Biểm kiểm số : " prop="bks" align="left">
							<el-input  @keypress.enter.native="Search_bks" placeholder="Nhập biển kiểm soát" v-model="formData.bks" size="small"clearable type="text" :autosize="false" :disabled="false" autocomplete="off"></el-input>
						</el-form-item>

						<el-form-item label="."  align="center">
							<el-button type="primary" @click="Search_bks" :loading="loading" size="small">Search</el-button>
						</el-form-item>
					</el-form>
				</el-col>
			</el-row>
			
			<div v-show="vr.createdAt || vetc.createdAt">
				
				<el-divider v-if="permission.find(e=>e === 'dang_kiem')" direction="horizontal">Thông Tin Đăng Kiểm</el-divider>
				<center v-if="!vr.createdAt">Không có thông tin đăng kiểm</center>
				<template v-if="vr.createdAt">

					<el-row v-if="permission.find(e=>e === 'dang_kiem')">
						<el-col :span="24" :offset="0">

							<el-table  :data="vr.lan_cuoi_kiem_dinh_da_thuc_hien" height="105" :border="false" :highlight-current-row="false" :stripe="false" :lazy="false" :show-summary="false" tooltip-effect="light" style="width: 100%">

								<el-table-column label="Đơn vị kiểm định" prop="don_vi_kiem_dinh" align="left" :sortable="false" :fixed="false" width="240"/>
								<el-table-column label="Ngày kiểm định" prop="ngay_KD" align="left" :sortable="false" :fixed="false" width="240"/>
								<el-table-column label="Số tem GCN" prop="so_tem_GCN" align="left" :sortable="false" :fixed="false" width="240"/>
								<el-table-column label="Thời hạn kiểm định" prop="thoi_han_KD" align="left" :sortable="false" :fixed="false" width="240"/>
								<el-table-column label="Còn lại"  align="left" :sortable="false" :fixed="false" width="240">
									<template slot-scope="scope">
										<el-tooltip v-show="day(scope.row.thoi_han_KD) < 0" content="Quá hạn đăng kiểm" effect="dark" placement="top">
											<el-button :type="day(scope.row.thoi_han_KD) >= 0 ? 'success' : 'danger'" icon="" :loading="false" :plain="true" :round="false" :circle="false" :autofocus="false" size="small" :disabled="false">{{day(scope.row.thoi_han_KD)}} ngày</el-button>
										</el-tooltip>
										<el-tooltip v-show="day(scope.row.thoi_han_KD) >= 0" content="Hoạt động bình thường" effect="light" placement="top">
											<el-button :type="day(scope.row.thoi_han_KD) >= 0 ? 'success' : 'danger'" icon="" :loading="false" :plain="true" :round="false" :circle="false" :autofocus="false" size="small" :disabled="false">{{day(scope.row.thoi_han_KD)}} ngày</el-button>
										</el-tooltip>

									</template>
								</el-table-column>

							</el-table>
						</el-col>
					</el-row>
					<el-divider direction="horizontal">Thông Tin Phương Tiện</el-divider>
					<el-row :gutter="20">
						<el-col :span="8" :offset="0">
							<el-form v-model="vr"  status-icon label-width="auto" label-position="top" :inline="false" :disabled="false" :inline-message="false" show-message validate-on-rule-change size="small">

								<el-form-item label="Biểm kiểm soát : " align="left">

									<el-tag type="primary" effect="plain" size="medium">{{formData.bks}}</el-tag>
								</el-form-item>
								<el-form-item label="Chủ Sở Hữu : " align="left">

									<el-tag type="primary" effect="plain" size="medium">{{vr.chu_phuong_tien}}</el-tag>

								</el-form-item>

								<el-form-item label="Địa Chỉ : " align="left">
									<el-tag type="primary" effect="plain" size="medium">{{vr.dia_chi_chu_phuong_tien}}</el-tag>
{{vr.dia_chi_chu_phuong_tien}}


								</el-form-item>


								<el-form-item label="Chở tối đa : " align="left">
									<el-tag type="primary" effect="plain" size="medium">{{vr.so_nguoi_cho_phep_tro}}</el-tag>

								</el-form-item>
								<el-form-item label="Thiết bị Giám sát hành trình : " align="left">

									<el-tag type="primary" effect="plain" size="medium">{{vr.lap_dat_thiet_bi_GSHT}}</el-tag>

								</el-form-item>



								<el-form-item label="Kinh Doanh Vận Tải : " align="left">

									<el-tag type="primary" effect="plain" size="medium">{{vr.kinh_doanh_van_tai}}</el-tag>
								</el-form-item>

								<el-form-item label="Phương tiện cải tạo : " align="left">

									<el-tag type="primary" effect="plain" size="medium">{{vr.phuong_tien_cai_tao}}</el-tag>
								</el-form-item>


							</el-form>

						</el-col>
						<el-col :span="8" :offset="0">
							<el-form v-model="vr"  status-icon label-width="auto" label-position="top" :inline="false" :disabled="false" :inline-message="false" show-message validate-on-rule-change size="small">
								<el-form-item label="Loại Phương Tiện : " align="left">

									<el-tag type="primary" effect="plain" size="medium">{{vr.loai_phuong_tien}}</el-tag>
								</el-form-item>
								<el-form-item label="Khối lượng toàn bộ cho phép : " align="left">

									<el-tag type="primary" effect="plain" size="medium">{{vr.khoi_luong_toan_bo_cho_phep_tham_gia_giao_thong}}</el-tag>

								</el-form-item>

								<el-form-item label="Khối Lượng hàng hóa cho phép TGGT : " align="left">


									<el-tag type="primary" effect="plain" size="medium">{{vr.khoi_luong_hang_hoa_chuyen_cho_cho_phep_TGGT}}</el-tag>

								</el-form-item>

								<el-form-item label="Khối lượng kéo theo cho phép : " align="left">

									<el-tag type="primary" effect="plain" size="medium">{{vr.khoi_luog_keo_theo_cho_phep}}</el-tag>
								</el-form-item>


								<el-form-item label="Khối lượng bản thân : " align="left">

									<el-tag type="primary" effect="plain" size="medium">{{vr.khoi_luong_ban_than}}</el-tag>
								</el-form-item>
								<el-form-item label="Vết bánh xe : " align="left">

									<el-tag type="primary" effect="plain" size="medium">{{vr.vet_banh_xe}}</el-tag>
								</el-form-item>
								<el-form-item label="Cỡ lốp : " align="left">

									<el-tag type="primary" effect="plain" size="medium">{{vr.co_lop}}</el-tag>
								</el-form-item>





							</el-form>
						</el-col>


						<el-col :span="8" :offset="0">
							<el-form v-model="vr"  status-icon label-width="auto" label-position="top" :inline="false" :disabled="false" :inline-message="false" show-message validate-on-rule-change size="small">
								<el-form-item label="Năm sản xuất : " align="left">


									<el-tag type="primary" effect="plain" size="medium">{{vr.nam_san_xuat}}</el-tag>

								</el-form-item>
								<el-form-item label="Nhãn Hiệu : " align="left">


									<el-tag type="primary" effect="plain" size="medium">{{vr.nhan_hieu}}</el-tag>

								</el-form-item>

								<el-form-item label="Số máy thực tế : " align="left">


									<el-tag type="primary" effect="plain" size="medium">{{vr.so_may_thuc_te}}</el-tag>

								</el-form-item>
								<el-form-item label="Số khung thực tế : " align="left">


									<el-tag type="primary" effect="plain" size="medium">{{vr.so_khung_thuc_te}}</el-tag>

								</el-form-item>

								<el-form-item label="Công thức bánh xe : " align="left">

									<el-tag type="primary" effect="plain" size="medium">{{vr.cong_thuc_banh_xe}}</el-tag>
								</el-form-item>


								<el-form-item label="Kích thước bao : " align="left">

									<el-tag type="primary" effect="plain" size="medium">{{vr.kich_thuoc_bao}}</el-tag>
								</el-form-item>

								<el-form-item label="Chiều dài cơ sở : " align="left">

									<el-tag type="primary" effect="plain" size="medium">{{vr.chieu_dai_co_so}}</el-tag>
								</el-form-item>
								<el-form-item label="Kích thước thùng hàng : " align="left">

									<el-tag type="primary" effect="plain" size="medium">{{vr.kich_thuoc_thung_hang}}</el-tag>
								</el-form-item>




							</el-form>

						</el-col>
					</el-row>
				</template>
				<el-divider v-if="permission.find(e=>e === 'thong_tin_chu_so_huu')" direction="horizontal">Thông Tin Chủ Sở Hữu</el-divider>
				<br>
				<center v-if="!vetc.hoso_time">Không có dữ liệu</center>
				<el-row v-if="permission.find(e=>e === 'thong_tin_chu_so_huu') && vetc.hoso_time">
					<el-col :span="24" :offset="0">
						<el-row :gutter="20">
							<el-col :span="8" :offset="0">
								<el-form status-icon label-width="auto" label-position="top" :inline="false" :disabled="false" :inline-message="false" show-message validate-on-rule-change size="small">
									<el-form-item label="Họ và Tên : " align="left">


										<el-tag type="primary" effect="plain" size="medium">{{vetc.ho_ten}}</el-tag>

									</el-form-item>
									<el-form-item label="Địa chỉ : " align="left">
										<h3>{{vetc.dia_chi}}</h3>
										

									</el-form-item>


									<el-form-item label="Số điện thoại : " align="left">


										<el-tag type="primary" effect="plain" size="medium">{{vetc.phone}}</el-tag>

									</el-form-item>
									<el-form-item label="Tỉnh : " align="left">


										<el-tag type="primary" effect="plain" size="medium">{{vetc.tinh}}</el-tag>

									</el-form-item>



									<el-form-item label="Hồ Sơ Đại lý : " align="left">


										<el-tag type="primary" effect="plain" size="medium">{{vetc.hoso_dai_li}}</el-tag>

									</el-form-item>



								</el-form>

							</el-col>
							<el-col :span="8" :offset="0">
								<el-form  status-icon label-width="auto" label-position="top" :inline="false" :disabled="false" :inline-message="false" show-message validate-on-rule-change size="small">
									<el-form-item label="Ngày sinh : " align="left">


										<el-tag type="primary" effect="plain" size="medium">{{timeConverter(vetc.ngay_sinh)}}</el-tag>

									</el-form-item>
									<el-form-item label="Giới tính : " align="left">


										<el-tag type="primary" effect="plain" size="medium">{{vetc.gioi_tinh}}</el-tag>

									</el-form-item>
									<el-form-item label="Số chứng minh : " align="left">


										<el-tag type="primary" effect="plain" size="medium">{{vetc.cmnd}}</el-tag>

									</el-form-item>
									<el-form-item label="Ngày cấp : " align="left">


										<el-tag type="primary" effect="plain" size="medium">{{timeConverter(vetc.ngay_cap)}}</el-tag>

									</el-form-item>
									<el-form-item label="Mã tài khoản : " align="left">


										<el-tag type="primary" effect="plain" size="medium">{{vetc.ma_tai_khoan}}</el-tag>

									</el-form-item>







								</el-form>

							</el-col>
							<el-col :span="8" :offset="0">
								<el-form   status-icon label-width="auto" label-position="top" :inline="false" :disabled="false" :inline-message="false" show-message validate-on-rule-change size="small">

									<el-form-item label="Trạng thái : " align="left">


										<el-tag type="primary" effect="plain" size="medium">{{vetc.trang_thai}}</el-tag>

									</el-form-item>
									<el-form-item label="Ngày hiệu lực : " align="left">


										<el-tag type="primary" effect="plain" size="medium">{{timeConverter(vetc.ngay_hieu_luc)}}</el-tag>

									</el-form-item>

									<el-form-item label="Thời gian duyệt hồ sơ : " align="left">
										
										<el-tag type="primary" effect="plain" size="medium">{{timeConverter(vetc.hoso_time)}}</el-tag>
										

									</el-form-item>


									<el-form-item label="Hồ Sơ TT Duyệt : " align="left">


										<el-tag type="primary" effect="plain" size="medium">{{vetc.hoso_tt_duyet}}</el-tag>

									</el-form-item>
									<el-form-item label="Chu kì hóa đơn : " align="left">


										<el-tag type="primary" effect="plain" size="medium">{{vetc.chu_ki_hoa_don}}</el-tag>

									</el-form-item>







								</el-form>

							</el-col>
						</el-row>
					</el-col>
				</el-row>
			</div>
		</el-col>
	</el-row>
</template>
<script>
	export default {

		data(){
			return {
				
				formData:{
					bks:''
				},
				ruleForm:{
					bks:[{type:'string',required:true,message:'Bạn phải nhập biểm kiểm soát.'}]
				},
				loading:false,
				vr:{},
				vetc:{},
				permission:[]
			}
		},
		created:async function(req,res){
			let {data} = await this.$axios.post('/api/account/permission');
			this.permission = data.permission;
		},
		methods:{
			day(time){
				let day = time.split('/')[0];
				let month = time.split('/')[1];
				let year = time.split('/')[2];
				let unix = new Date(year+'.'+month+'.'+day).getTime();
				let day_left = Math.floor((unix-Date.now())/86400000);
				return day_left;
			},
			timeConverter(UNIX_timestamp){
				var a = new Date(UNIX_timestamp);

				var year = a.getFullYear();
				var month = a.getMonth()+1;
				var date = a.getDate();
				
				var time = date + '-' + month + '-' + year;
				return time;
			},
			async Search_VETC(bks){
				let {data} = await this.$axios.get('/api/vetc?bks='+bks);
				if(!data[0] && bks.includes('T')) return await this.Search_VETC(bks.replace('T','')); 
				this.vetc = data[0] || {};
				//this.$message({type:'error',message:'Không tìm thấy thông tin phương tiện'});
			},
			async Search_VR(bks){
				let {data} = await this.$axios.get('/api/vr?bks='+bks);
				if(!data[0] && bks.includes('T')) return await this.Search_VR(bks.replace('T',''));
				this.vr = data[0] || {};
				if(!data[0]) this.$message({type:'error',message:'Không tìm thấy thông tin phương tiện'});

			},
			async Search_bks(ev){
				ev.preventDefault()
				let _ = this;
				_.$refs['form'].validate(async valid=>{
					if(valid){
						_.loading = true;
						try{
							let bks = _.formData.bks.replace(/[^a-zA-Z0-9]/g,'').toUpperCase();
							bks = bks.slice(-1) === 'T' ? bks : bks+'T';


							await Promise.all([_.Search_VETC(bks),_.Search_VR(bks)])
						}catch(message){
							_.$message({type:'error',message});
						}
						_.loading = false;
					}else{
						return false;
					}
				})
				
			}
		},
		async asyncData({$auth,$router}){

		}
	}
</script>
<style scoped>
.el-tag{
	font-size:18px;
	color:#52555d;
	font-weight: bold;
}
</style>
