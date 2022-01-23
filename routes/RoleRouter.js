const Express = require("express");
const RoleRouter = Express.Router()
const RoleController = require("../controllers/RoleController");
const RoleValidator = require("../validators/RoleValidator");

RoleRouter.route("/club/:id_club")
    .get(RoleValidator.getAllRole, RoleController.getAllRole)
    .post(RoleValidator.addRole, RoleController.addRole)
RoleRouter.route("/club/:id_club/addPresident")
    .put(RoleValidator.addPresident, RoleController.addPresident)
RoleRouter.route("/:id_club/role/:id_role")
    .get(RoleValidator.getRole, RoleController.getRole)
    .put(RoleValidator.updateRole, RoleController.updateRole)
RoleRouter.route("/delete/:id_club/role/:id_role")
    .delete(RoleValidator.deleteRole, RoleController.deleteRole)
RoleRouter.route("/club/:id_club/pres")
    .post(RoleValidator.addRoleAdmin, RoleController.addRoleAdmin)
RoleRouter.route("/delete/:id_role/pres")
    .delete(RoleValidator.deleteRoleAdmin, RoleController.deleteRoleAdmin)

RoleRouter.route("/club/:id_club/userClubs")
    .get(RoleValidator.getUserClubs, RoleController.getUserClubs)

// added by badr     
RoleRouter.route("/club/:id_club/deletePresident/:id_user")
    .delete(RoleValidator.deleteRoleAdmin, RoleController.deletePresident)

module.exports = RoleRouter;