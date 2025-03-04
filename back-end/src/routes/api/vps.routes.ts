import { Router } from "express";
import vpsController from "../../controllers/vps.controller";
import { auth, authAdmin } from "../../middlewares/auth.middleware";

const route = Router();

route.post("/create", auth, authAdmin, vpsController.create);
route.get("/", auth, authAdmin, vpsController.getVpsAllInfor);
route.get("/:id", auth, authAdmin, vpsController.getVpsInfor);
route.put("/update/:id", auth, authAdmin, vpsController.updateVps);
route.delete("/delete/:id", auth, authAdmin, vpsController.deleteVps);

export default route;
