const usersRouter=require("express").Router();
const usersController=require("../controllers/user");

usersRouter.post("/registrarUsuario",usersController.registrarUsuario)
usersRouter.post("/registrarCongregacion",usersController.registrarCongregacion)

module.exports=usersRouter;