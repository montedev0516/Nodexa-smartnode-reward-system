import { Router } from "express";
import usersRoute from "./api/users.routes";
import uploadRoute from "./api/upload.routes";
import vpsRoute from "./api/vps.routes";
import nodesRoute from "./api/nodes.routes";

const route = Router();
route.use("/user", usersRoute);
route.use("/upload", uploadRoute);
route.use("/vps", vpsRoute);
route.use("/node", nodesRoute);

export default route;
