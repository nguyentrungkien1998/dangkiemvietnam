export const strict = false;
export const state = ()=> ({
	dialog:false,
	step:0,
	loading_check:false,
	code:'',
	OldPassword:'',
	NewPassword:'',
	RenewPassword:'',
	show:{
		OldPassword:true,
		NewPassword:false,
		VerifyPassword:false
	},
	title:'Nhập mật khẩu cũ'

});
export const mutations = {
	turnOn_dialog(state,val){
		state.dialog = val;
	},
	CancelShow(state){
		state.dialog = false;
		state.show.OldPassword = true;
		state.show.NewPassword = false;
		state.show.VerifyPassword = false;
		state.step = 0;
		state.OldPassword = '';
		state.NewPassword = '';
		state.RenewPassword = '';
	},
	set_code(state,val){
		state.code = val;
	},
	toggle(state,val){
		Object.keys(state.show).filter(e=>e!==val).map(e=>state.show[e] = false);
		state.show[val] = true
	},
	updateStep(state,step){
		state.step = step
	},
	setTitle(state,val){
		state.title = val;
	},
	ChangePassword(state,val){
		state.OldPassword = val;
	},
	ChangeNewPassword(state,val){
		state.NewPassword = val;
	},
	ChangeReNewPassword(state,val){
		state.RenewPassword = val;
	}
	


};
export const getters = {

};
export const actions =  {
	
	async CheckPass({ commit} ,password){
		
		let {data:{error,code}} = await this.$axios.post('/api/account/check-password',{password});
		if(error) throw error;
		commit('set_code',code);
		commit('toggle','NewPassword');
		commit('updateStep',1);
		commit('setTitle','Nhập mật khẩu mới')


	},
	async UpdatePass({ state:{code}, commit} ,password){
		let {data:{error}} = await this.$axios.post('/api/account/update-password',{password,code});
		if(error) throw error;
		commit('toggle','VerifyPassword');
		commit('updateStep',2);
		commit('setTitle','Đăng xuất thiết bị')

	},
	async Logout({ commit },device){
		let {data:{error}} = await this.$axios.post('/api/account/logout');
		if(error) throw error;

	}
	

};