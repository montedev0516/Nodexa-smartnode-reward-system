import { Router } from "express";
import nodesController from "../../controllers/sharednode.controller";
import { auth, authAdmin } from "../../middlewares/auth.middleware";

const route = Router();

route.post("/create", auth, authAdmin, nodesController.create);
route.get("/", auth, nodesController.getNodesAllInfor);
route.get("/:id", auth, authAdmin, nodesController.getNodeInfor);
route.put("/update/:id", auth, nodesController.updateNode);
route.delete("/delete/:id", auth, nodesController.deleteNode);
route.post("/request", auth, nodesController.makeRequest);
route.get("/request", auth, nodesController.getAllRequests);
route.post("/request/:id/add", auth, nodesController.addRequest);
route.post("/request/:id/cancel", auth, nodesController.cancelNode);

export default route;
