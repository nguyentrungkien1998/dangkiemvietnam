/**
 * Delay.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

 module.exports = {

    attributes: {
        vr_time:{
            type:'number'
        },
        vetc_time:{
            type:'number'
        },
        vr_delay:{
            type:'number',
            defaultsTo:1000
        },
        vetc_delay:{
            type:'number',
            defaultsTo:1000
        }

    },

};

