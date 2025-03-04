import { PrismaClient } from "@prisma/client";
import express from "express"
const client = new PrismaClient();

const app = express();



app.get("/users", async (req,res)=>{
    const user = await client.user.findMany();
    res.json({
        user
    })
})

app.get("/todo/:id", async (req, res)=>{
    const id = req.params.id as unknown as number;
    const user  = await client.user.findFirst({
        where: {
            id: Number(id)
        },
        select: {
            todos:true
        }
    })
    res.json({
        user
    })
})
async function createUser(){
    await client.user.create({
    data: {
        username:"Hakirat",
        password: "12345678",
        age: 21
    }
})
};

async function findUser(){
    const user = await client.user.findFirst({
        where:{
            id: 1
        },
        include:{
            todos: true
        }
    })
    console.log(user)
}
// createUser(); 
// findUser();
app.listen(3000)