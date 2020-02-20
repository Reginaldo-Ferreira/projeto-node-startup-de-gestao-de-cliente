const PlansService =require("../services/PlansService");

class PlansController{

 async index(req, res){
	 let plans ={};
	 let erro = {};
	 try {

	 	plans = await PlansService.listAll();
		 if(plans == !undefined ){
			 res.render("plans",{ plans: plans});
		 }else{
			 console.log(" 1 erro ao carrega na view, banco não está funcionando");
			 console.log(plans);
			 res.render("plans",{ plans: plans});
			// res.json("Houve um erro: \n" + JSON.stringify(plans));
		 }

	 } catch (e) {

	 	console.log(e);
	 } finally {

	 }

//		console.log(plans);

	}

	create(req, res){
		res.render("plans/create",{title_msg: req.flash('title_msg'),list_msg: req.flash('list_msg')});
	}

	async store(req, res){
		var { title, list, client, value, imports } = req.body;

		var plan ={ title, list, client, value, import:imports }

	  var result =	await PlansService.store(plan);
		//res.json(plan);
		if (result == true) {

		}else {
			req.flash('title_msg', result.title_msg);
			req.flash('list_msg', result.list_msg);
			res.redirect("/admin/plans/create");
		//	console.log(result);
		}
 	}

}

module.exports = new PlansController();
