//var Plan = require("../models/plan");
var Database = require("../models/index");

class PlansService {

  constructor(){
    this.Plan = Database["Plan"];
  }

  async listAll(){ // no curso pelo professor o nome do method is getall()
    let dbPlan = {};
    var errors = {};
    try {
      dbPlan = await this.Plan.findAll({ order:[['id','DESC']], limit: 4 });
      return dbPlan;
      //  console.log(dbPlan);
    } catch (e) {

      errors.system_msg = e;

      return errors;
    }

  }


  async store(plans){
    var errors = {};
    if(plans.import != undefined){
      plans.import = true;
    }else {
      plans.import = false;
    }

    var isValid = this.validate(plans, errors);

    if (isValid) {
      try {
        await this.Plan.create(plans);
        return true;
      } catch (e) {

        errors.system_msg = "Não foi possível salvar o plano";
        return errors;
      }
    }else {
      return errors;
    }
    // Plan.create(plans).then(() => {
    //
    // }).catch(err => {
    //
    // });
  }

  validate(plan, errors){
    var erroCount = 0;
    if(plan.title == undefined){
      errors.title_msg = "o título é inválido";
      erroCount++;
    }else {
      if(plan.title.length < 3){
        errors.title_msg = "o título muito pequeno"
        erroCount++;
      }
    }

    if(plan.list  == undefined){
      errors.list_msg = "A quantidade de listas é inválida"
      erroCount++;
    }else {
      if(plan.list < 1){
        errors.list_msg = "A quantidade de listas é inválida"
        erroCount++;
      }
    }
    if (erroCount == 0) {
      return true
    }else {
      return false;
    }
  }

}
module.exports = new PlansService();
