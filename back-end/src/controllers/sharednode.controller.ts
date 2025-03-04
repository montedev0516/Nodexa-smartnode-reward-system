import { Request, Response } from "express";
import SharedNodes from "../models/sharednode.model";

const nodesController = {
  getNodesAllInfor: async (req: Request, res: Response) => {
    try {
      const nodes = await SharedNodes.find();
      res.json(nodes);
    } catch (err: any) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getAllRequests: async (req: Request, res: Response) => {
    try {
      const nodes = await SharedNodes.find({status: "REQUESTED"});
      res.json(nodes);
    } catch (err: any) {
      return res.status(500).json({ msg: err.message });
    }
  },
  makeRequest: async (req: Request, res: Response) => {
    const { title, alias, description, version, nodeAddress, coinType, period, rewards, lastPaidAt, nextPaidDate, starttedAt, expireDate, funds } = req.body;
    try {
      if ( !title || !nodeAddress)
        return res.status(400).json({ msg: "Please fill in all fields." });
      else if(funds < 10000)
        return res.status(400).json({msg: "Please send more funds"})

      const node = await SharedNodes.findOne({ nodeAddress });

      if (node)
        return res.status(400).json({ msg: "This Ip Address already exists." });

      const newNode = {
        title, 
        alias, 
        description, 
        version, 
        nodeAddress, 
        coinType, 
        period, 
        rewards, 
        lastPaidAt, 
        nextPaidDate, 
        starttedAt, 
        expireDate,
        funds,
        status: "REQUESTED",
        users: [(<any>req).user.id]
      };

      if(funds > 1000000) {
        newNode.status = "CREATED"
      }
      const _newNode = new SharedNodes(newNode);
      await _newNode.save();
    } catch (error: any) {
      return res.status(500).json({ msg: error.message });
    }
  },
  create: async (req: Request, res: Response) => {
    const { title, alias, description, version, nodeAddress, coinType, period, rewards, lastPaidAt, nextPaidDate, starttedAt, expireDate } = req.body;
    try {
      if ( !title || !nodeAddress)
        return res.status(400).json({ msg: "Please fill in all fields." });

      const node = await SharedNodes.findOne({ nodeAddress });

      if (node)
        return res.status(400).json({ msg: "This Ip Address already exists." });

      const newNode = {
        title, 
        alias, 
        description, 
        version, 
        nodeAddress, 
        coinType, 
        period, 
        rewards, 
        lastPaidAt, 
        nextPaidDate, 
        starttedAt, 
        expireDate
      };

      const _newNode = new SharedNodes(newNode);
      await _newNode.save();
    } catch (error: any) {
      return res.status(500).json({ msg: error.message });
    }
  },
  getNodeInfor: async (req: Request, res: Response) => {
    try {
      const node = await SharedNodes.findById(req.params.id);
      res.json(node);
    } catch (err: any) {
      return res.status(500).json({ msg: err.message });
    }
  },
  updateNode: async (req: Request, res: Response) => {
    try {
      const { title, alias, description, version, nodeAddress, coinType, period, rewards, lastPaidAt, nextPaidDate, starttedAt, expireDate } = req.body;
      await SharedNodes.findOneAndUpdate(
        { _id: req.params.id },
        { title, alias, description, version, nodeAddress, coinType, period, rewards, lastPaidAt, nextPaidDate, starttedAt, expireDate }
      );
      res.json({ msg: "Update Success!" });
    } catch (err: any) {
      return res.status(500).json({ msg: err.message });
    }
  },
  addRequest: async (req: Request, res: Response) => {
    try {
      let { funds } = req.body;
      if(funds < 10000)
        return res.status(400).json({msg: "Please send more funds"})
      const node = await SharedNodes.findById(req.params.id);
      funds = funds + node?.funds;
      const users = node?.users.push((<any>req).user.id);
      if(funds > 1000000) {
        await SharedNodes.findOneAndUpdate(
          { _id: req.params.id },
          { users: users, funds:  funds, status: "CREATED"},
        );
        res.json({ msg: "Node Created!" });
      }
      else {
        await SharedNodes.findOneAndUpdate(
          { _id: req.params.id },
          { users: users, funds:  funds},
        );
        res.json({ msg: "Apply Success!" });
      } 
    } catch (err: any) {
      return res.status(500).json({ msg: err.message });
    }
  },  
  deleteNode: async (req: Request, res: Response) => {
    try {
      await SharedNodes.findByIdAndDelete(req.params.id);
      res.json({ msg: "Deleted Success!" });
    } catch (err: any) {
      return res.status(500).json({ msg: err.message });
    }
  },

  cancelNode: async (req: Request, res: Response) => {
    try {
      await SharedNodes.findByIdAndDelete(req.params.id);
      res.json({ msg: "Deleted Success!" });
    } catch (err: any) {
      return res.status(500).json({ msg: err.message });
    }
  },  
};
export default nodesController;
