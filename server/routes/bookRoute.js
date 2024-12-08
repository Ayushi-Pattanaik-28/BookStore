import express from 'express';
import { create, deleteProduct, getAll, getOne, update } from '../controllers/bookController.js';

const route = express.Router();

route.post("/create", create);

route.get("/get-all-books", getAll);

route.get("/getOne/:id", getOne);

route.put("/update/:id", update);

route.delete("/delete/:id", deleteProduct);

export default route;
