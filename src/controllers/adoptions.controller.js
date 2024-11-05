// import { adoptionsService, petsService } from "../services/index.js"
import { UserServices } from "../services/user.services.js";

import { AdoptionServices } from "../services/adoption.services.js";

// const usersService = new UserServices();
// const getAllAdoptions = async(req,res)=>{
//     const result = await adoptionsService.getAll();
//     res.send({status:"success",payload:result})
// }

// const getAdoption = async(req,res)=>{
//     const adoptionId = req.params.aid;
//     const adoption = await adoptionsService.getBy({_id:adoptionId})
//     if(!adoption) return res.status(404).send({status:"error",error:"Adoption not found"})
//     res.send({status:"success",payload:adoption})
// }

// const createAdoption = async(req,res)=>{
//     const {uid,pid} = req.params;
//     const user = await usersService.getUserById(uid);
//     if(!user) return res.status(404).send({status:"error", error:"user Not found"});
//     const pet = await petsService.getBy({_id:pid});
//     if(!pet) return res.status(404).send({status:"error",error:"Pet not found"});
//     if(pet.adopted) return res.status(400).send({status:"error",error:"Pet is already adopted"});
//     user.pets.push(pet._id);
//     await usersService.update(user._id,{pets:user.pets})
//     await petsService.update(pet._id,{adopted:true,owner:user._id})
//     await adoptionsService.create({owner:user._id,pet:pet._id})
//     res.send({status:"success",message:"Pet adopted"})
// }

// export default {
//     createAdoption,
//     getAllAdoptions,
//     getAdoption
// }

export class AdoptionsController {
  constructor() {
    this.adoptionsService = new AdoptionServices();
    this.usersService = new UserServices();
  }

  getAllAdoptions = async (req, res, next) => {
    try {
      const result = await this.adoptionsService.getAll();
      res.send({ status: "success", payload: result });
    } catch (error) {
      next(error);
    }
  };

  getAdoption = async (req, res, next) => {
    try {
      const adoptionId = req.params.aid;
      const adoption = await this.adoptionsService.getById(adoptionId);
      if (!adoption) return res.status(404).send({ status: "error", error: "Adoption not found" });
      res.send({ status: "success", payload: adoption });
    } catch (error) {
      next(error);
    }
  };

  createAdoption = async (req, res, next) => {
    try {
      const { uid, pid } = req.params;
      const user = await usersService.getUserById(uid);
      if (!user) return res.status(404).send({ status: "error", error: "user Not found" });
      const pet = await petsService.getBy({ _id: pid });
      if (!pet) return res.status(404).send({ status: "error", error: "Pet not found" });
      if (pet.adopted) return res.status(400).send({ status: "error", error: "Pet is already adopted" });
      user.pets.push(pet._id);
      await usersService.update(user._id, { pets: user.pets });
      await petsService.update(pet._id, { adopted: true, owner: user._id });
      await adoptionsService.create({ owner: user._id, pet: pet._id });
      res.send({ status: "success", message: "Pet adopted" });
    } catch (error) {
      next(error);
    }
  };
}
