const PlansService = require("../services/PlansService");

class PlansController {
  async index(req, res) {
    let plans = {};
    let erro = {};
    let tempo = 2000;
    //await enviarStatus(res ,33.3, "recebendo.. request", tempo);

    try {
      //await enviarStatus(res,66.6, "buscando no banco...", tempo);

      plans = await PlansService.listAll(); // getall()
      // res.json(plans);

      if (plans.system_msg == undefined) {
        //await enviarStatus(res, 100.0, "renderizando view...", tempo);

        // console.log("!!ocorreu tudo bem com a connexão!!")
        res.render("plans/indexTable", { plans: plans });
      } else {
        // console.log(" 1 erro ao carrega na view, banco não está funcionando");
        //res.json(plans);
        res.render("plans", { plans: plans });
        // res.json("Houve um erro: \n" + JSON.stringify(plans));
      }
    } catch (e) {
      console.log(e);
    } finally {
    }
    //		console.log(plans);
  }

  create(req, res) {
    res.render("plans/create", {
      title_msg: req.flash("title_msg"),
      list_msg: req.flash("list_msg")
    });
  }

  async store(req, res) {
    var { title, list, client, value, imports } = req.body;

    var plan = { title, list, client, value, import: imports };

    var result = await PlansService.store(plan);
    //res.json(plan);
    if (result == true) {
      res.redirect("/admin/plans");
    } else {
      req.flash("title_msg", result.title_msg);
      req.flash("list_msg", result.list_msg);
      res.redirect("/admin/plans/create");
      //	console.log(result);
    }
  }

  /*  update(req, res) { //renderiza uma tela igual ao do create
    res.render("plans/create", {
      title_msg: req.flash("title_msg"),
      list_msg: req.flash("list_msg")
    });
  } */

  async update(req, res) {
    var { title, list, client, value, imports, id } = req.body;

    var plan = { title, list, client, value, import: imports };

    var result = await PlansService.update(id, plan);
    //res.json(plan);
    if (result == true) {
      res.redirect("/admin/plans");
    } else {
      req.flash("title_msg", result.title_msg);
      req.flash("list_msg", result.list_msg);
      res.redirect("/admin/plans/edit/" + id);
      //	console.log(result);
    }
  }

  async edit(req, res) {
    let plan = {};

    try {
      plan = await PlansService.getById(req.params.id);
      // res.json(plan);
      if (plan.system_msg == undefined) {
        res.render("plans/edit", {
          plan,
          title_msg: req.flash("title_msg"),
          list_msg: req.flash("list_msg")
        });
      } else {
        res.render("plans/edit", { plan });
      }
    } catch (error) {
      console.log(error);
    }

    //res.render("plans/edit");
  }

  async deactivate(req, res) {
    var id = req.params.id;
    var deactivate = req.params.deactivate; // varlor boolean
    await PlansService.deactivate(id,deactivate);
    res.redirect("/admin/plans")
  }
}

//não estou usando esta função não funciona deste jeito (queria mandar notificações para a view)
function enviarStatus(res, status, where, tempo) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(where + "------------------------>");
      const data = { status, where, tempo };
      //res.setHeader('Content-Type', 'application/json');
      //	res.type('json'); // => 'application/json'
      //res.status(200).json({status, where, tempo});
      //	res.write(typeof data);
      //res.json(data);
      //res.send(JSON.stringify({status, where, tempo}) );

      resolve({ status, where, tempo }); // Promessa OK!
    }, tempo);
  });
}

module.exports = new PlansController();
