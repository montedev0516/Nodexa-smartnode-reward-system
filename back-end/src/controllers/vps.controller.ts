import { Request, Response } from "express";
import Vps from "../models/vps.model";

const vpsController = {
  getVpsAllInfor: async (req: Request, res: Response) => {
    try {
      const vps = await Vps.find();
      res.json(vps);
    } catch (err: any) {
      return res.status(500).json({ msg: err.message });
    }
  },  
  create: async (req: Request, res: Response) => {
    const { title, description, ipAddress, period, price, lastPaidAt, nextPaidDate } = req.body;
    try {
      if ( !title || !ipAddress)
        return res.status(400).json({ msg: "Please fill in all fields." });

      const vps = await Vps.findOne({ ipAddress });

      if (vps)
        return res.status(400).json({ msg: "This Ip Address already exists." });

      const newVps = {
        title,
        description,
        ipAddress,
        period,
        price,
        lastPaidAt,
        nextPaidDate
      };

      const _newVps = new Vps(newVps);
      await _newVps.save();
    } catch (error: any) {
      return res.status(500).json({ msg: error.message });
    }
  },
  getVpsInfor: async (req: Request, res: Response) => {
    try {
      const vps = await Vps.findById(req.params.id);
      res.json(vps);
    } catch (err: any) {
      return res.status(500).json({ msg: err.message });
    }
  },
  updateVps: async (req: Request, res: Response) => {
    try {
      const { title, description, ipAddress, period, price, lastPaidAt, nextPaidDate } = req.body;
      await Vps.findOneAndUpdate(
        { _id: req.params.id },
        { title, description, ipAddress, period, price, lastPaidAt, nextPaidDate }
      );
      res.json({ msg: "Update Success!" });
    } catch (err: any) {
      return res.status(500).json({ msg: err.message });
    }
  },
  deleteVps: async (req: Request, res: Response) => {
    try {
      await Vps.findByIdAndDelete(req.params.id);
      res.json({ msg: "Deleted Success!" });
    } catch (err: any) {
      return res.status(500).json({ msg: err.message });
    }
  },
};
export default vpsController;
