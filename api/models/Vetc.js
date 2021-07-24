/**
 * Vetc.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

 module.exports = {

  attributes: {
    bks:{
        type:'string',
        required:true
    },
    type:{
        type:'string'
    },
    hoso_time:{
        type:'number'
    },
    hoso_tt_duyet:{
        type:'string'
    },
    hoso_dai_li:{
        type:'string'
    },
    dia_chi:{
        type:'string'
    },
    ho_ten:{
        type:'string'
    },
    phone:{
        type:'string'
    },
    tinh:{
        type:'string'
    },
    cmnd:{
        type:'string'
    },
    ngay_sinh:{
        type:'number'
    },
    ngay_cap:{
        type:'number'
    },
    gioi_tinh:{
        type:'string'
    },
    ngay_hieu_luc:{
        type:'number'
    },
    ma_tai_khoan:{
        type:'string'
    },
    chu_ki_hoa_don:{
        type:'string'
    },
    trang_thai:{
        type:'string'
    }
}

};

