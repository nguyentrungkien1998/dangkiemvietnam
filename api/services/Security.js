const CryptoJS = require("crypto-js");
const CryptoRandomString = require('crypto-random-string');
const {crypt:{key,index}} = require('../../nuxt.config');
let encode = async function(str){
	str = JSON.stringify(str);
	let start = await CryptoRandomString({length: index, characters: 'fv62734fv8qefuyqwefvuy97264fuoywefg82fg8g8w7efyev248fgwuiyf2487fg4fgweiyf'});
	let end = await CryptoRandomString({length: 100-index, characters: 'klasbdf8q3gfiasdKasdfHbsdui98JhiouhuOIUiufdsii89w4d298woeirgnn348odfi'});
	let center = await CryptoJS.AES.encrypt(str, key).toString();
	if(center.slice(0,10) === 'U2FsdGVkX1') center = center.slice(10);
	return start + center +end;
};

let decode = async function(hash){
	let token_remake = 'U2FsdGVkX1'+hash.slice(index,hash.length - 100 + index);
	let result = await CryptoJS.AES.decrypt(token_remake,key).toString(CryptoJS.enc.Utf8);
	return JSON.parse(result);
};

module.exports = {encode,decode};

