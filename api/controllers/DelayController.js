/**
 * DelayController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

 module.exports = {
  'set':async function(req,res){
  	let {vr_delay,vetc_delay,vr_time,vetc_time} = req.body;
   vr_delay = parseInt(vr_delay) || 0;
   vetc_delay = parseInt(vetc_delay) || 0;
   vr_time = parseInt(vr_time) || 0;
   vetc_time = parseInt(vetc_time) || 0;
   await Delay.destroy({});
   await Delay.create({vr_delay,vetc_delay,vr_time,vetc_time});
   return res.ok();
 },
 'get':async function(req,res){

   let data = await Delay.find();
   return res.send(data[0]);
 }
 

};

