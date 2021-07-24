<template>

	<el-row>
		
		<el-col :span="24" :offset="0">
			<el-row>
				<el-col :span="12" :offset="0">
					<el-button type="primary" icon="el-icon-s-tools" @click="config_show = true" :loading="false" :plain="false" :round="false" :circle="false" :autofocus="false" size="mini" :disabled="false">Cấu Hình Request</el-button>
					<el-button type="danger" icon="el-icon-upload2" @click="vr_prior_show = true" :loading="false" :plain="false" :round="false" :circle="false" :autofocus="false" size="mini" :disabled="false">Quét VR ưu tiên</el-button>
					
					

					

				</el-col>
				<el-col align="right" :span="12" :offset="0">
					<el-tag type="primary" :closable="false" effect="dark" size="mini" :disable-transitions="false">BKS: {{code}}</el-tag>
					<el-tag type="warning" :closable="false" effect="dark" size="mini" :disable-transitions="false">VR: {{vr}}</el-tag>
					<el-tag type="success" :closable="false" effect="dark" size="mini" :disable-transitions="false">VETC: {{vetc}}</el-tag>
				</el-col>
			</el-row>
			<el-divider direction="horizontal" ></el-divider>
			<el-row>
				<el-col :span="10" :offset="7">
					<el-upload
					class="upload-demo"
					drag
					action="/api/bks/up"
					name="code"
					:on-success="finish_upload"
					multiple>
					<i class="el-icon-upload"></i>
					<div class="el-upload__text">Nhấp vào đây để <em> up file lên</em></div>
					<div class="el-upload__tip" slot="tip">Tải lên file .txt chứa biển số xe ô tô,mỗi biển số 1 dòng.</div>
				</el-upload>
			</el-col>
		</el-row>
		<el-dialog title="Cấu Hình REQUEST" :visible.sync="config_show" :center="false" :fullscreen="false" top="15vh" width="30%">
			<el-form status-icon label-width="auto" label-position="top" :inline="false" :disabled="false" :inline-message="false" show-message validate-on-rule-change size="small">

				<el-form-item label="Số biển kiểm soát mỗi lần chạy VR:" prop="vr_time" align="left">
					<el-input-number style="width: 100%" v-model="form_data.vr_time" controls-position="right" placeholder="Số biển kiểm soát" :min="1" :max="100"></el-input-number>
					
				</el-form-item>


				<el-form-item label="Số biển kiểm soát mỗi lần chạy VETC:" prop="vetc_time" align="left">
					<el-input-number style="width: 100%" v-model="form_data.vetc_time" controls-position="right" placeholder="Số biển kiểm soát" :min="1" :max="100"></el-input-number>

					
				</el-form-item>

				<el-form-item label="Khoảng cách thời gian giữa mỗi lần Chạy VR:" prop="vr_delay" align="left">
					<el-input-number style="width: 85%" v-model="form_data.vr_delay" controls-position="right" placeholder="Số biển kiểm soát" :min="1" :max="100"></el-input-number>  ( giây )

				</el-form-item>

				<el-form-item label="Khoảng cách thời gian giữa mỗi lần Chạy VETC:" prop="vr_delay" align="left">
					<el-input-number style="width: 85%" v-model="form_data.vetc_delay" controls-position="right" placeholder="Số biển kiểm soát" :min="1" :max="100"></el-input-number>  ( giây )

				</el-form-item>
				


				
			</el-form>
			<span slot="footer">
				<el-button @click="config_show = false">Cancel</el-button>
				<el-button type="primary" :loading="confirm_save" @click="setTime">Xác Nhận</el-button>
			</span>
		</el-dialog>
		<el-dialog title="Quét hạn đăng kiểm đối với BKS ưu tiên" :visible.sync="vr_prior_show" :center="false" :fullscreen="false" top="15vh" width="28%">
			<el-row :gutter="20">
				<el-col :span="12" :offset="0">
					<el-tag size="medium" type="success">Tổng BKS:  {{prior_num}}</el-tag>
					

				</el-col>
				<el-col align="right" :span="12" :offset="0">
					<el-popconfirm title="Bạn có chắc chắn?" @confirm="removeAll" confirmButtonText='OK' cancelButtonText='Không,cảm ơn.' icon="el-icon-info" iconColor="red">

						<el-button slot="reference" type="danger" icon="el-icon-delete-solid" :loading="false" :plain="false" :round="false" :circle="false" :autofocus="false" size="mini" :disabled="false">Xoá tất cả</el-button>
					</el-popconfirm>
				</el-col>
			</el-row>
			<br>
			<el-row :gutter="20">
				<el-col align="center" :span="24" :offset="0">
					<el-upload
					class="upload-demo"
					drag
					action="/api/prior/up"
					name="code"
					:on-success="finish_upload"
					multiple>
					<i class="el-icon-upload"></i>
					<div class="el-upload__text">Nhấp vào đây để <em> up file lên</em></div>
					<div class="el-upload__tip" slot="tip">Tải lên file .txt chứa biển số xe ô tô ƯU TIÊN,mỗi biển số 1 dòng.</div>
				</el-upload>
			</el-col>
		</el-row>


		<br> 


		
	</el-dialog>

</el-col>
</el-row>
</template>
<script>
	export default {
		data(){
			return {
				vr_prior_show:false,
				vr:0,
				vetc:0,
				code:0,
				//vr_time:'',
				confirm_save:false,
				form_data:{
					vr_delay:'',
					vetc_delay:'',
					vr_time:'',
					vetc_time:''
				},
				prior_num:0,
				
				config_show:false
			}
		},
		created:async function(){
			await this.init();
			
		},
		methods:{
			async init(){
				return await Promise.all([this.count(),this.get_config(),this.getNumPrior()])
			},
			async get_config(){
				let {data} = await this.$axios.post('/api/delay/get');
				this.form_data = data;
				this.form_data.vr_delay = data.vr_delay;
				this.form_data.vetc_delay = data.vetc_delay;
				return

			},
			wait(time){
				return new Promise(resolve=>{
					setTimeout(function(){
						return resolve(time)
					},time)
				});
			},
			async count(){
				let {data:{count:{vr,vetc,code}}} = await this.$axios.post('/api/crawl/count');
				this.code = code;
				this.vr = vr;
				this.vetc = vetc;
				await this.wait(2000);
				return await  this.count();
			},
			finish_upload(val){
				
				this.$message({type:'success',message:'Quý khách đã tải lên '+val+' BKS thành công !'})
			},
			async getNumPrior(){
				let {data} = await this.$axios.post('/api/prior/count');
			    this.prior_num = data.num;
			    await this.wait(2000);
			    return await this.getNumPrior();
			},
			async setTime(){
				this.confirm_save = true;
				this.form_data.vr_delay = this.form_data.vr_delay.toString();
				this.form_data.vetc_delay = this.form_data.vetc_delay.toString();
				this.form_data.vr_time = this.form_data.vr_time.toString();
				this.form_data.vetc_time = this.form_data.vetc_time.toString();
				
				let {data} = await this.$axios.post('/api/delay/set',this.form_data);
				this.$message({type:'success',message:'Cấu hình thành công !'});
				this.confirm_save = false;
				this.config_show = false;
				return;
			},
			async removeAll(){
				
				await this.$axios.post('/api/prior/removeAll');
				return this.$message({type:'success',message:'Đã xoá tất cả BKS ưu tiên.'})
			}
		}
	}
</script>
<style scoped>

</style>