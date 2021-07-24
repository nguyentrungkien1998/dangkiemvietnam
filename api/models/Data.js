/**
 * Data.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

 module.exports = {

  attributes: {
    url:{
      type:'string',
      required:true
    },
    list_h1:{
        type:'json',
        defaultsTo:[]
    },
    list_h2:{
        type:'json',
        defaultsTo:[]
    },
    list_h3:{
        type:'json',
        defaultsTo:[]
    },
    list_a:{
       type:'json',
       defaultsTo:[]
   },
   list_img:{
    type:'json',
    defaultsTo:[]
},
count_keyword:{
    type:'json',
    defaultsTo:[]
},
responseHTML:{
  type:'string',
  required:true
},
count_word_body:{
  type:'string'
}


},

};

