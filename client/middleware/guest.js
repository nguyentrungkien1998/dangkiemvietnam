let allow_path = ['/dang-ki','/gioi-thieu','/dieu-khoan','/dang-nhap','/'];
export default function ({route:{path},$auth, store, redirect }) {
	if(!$auth.$state.loggedIn){

		
		if(allow_path.includes(path)) {
			
			return;
		}
		else{
			
			return redirect('/')
		}
	}else{
		
		
		if(allow_path.includes(path)) {
			return redirect('/dashboard');
		}
		else{
			return
		}
	}
e
	

}
