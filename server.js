import express from 'express'
import { Prisma, PrismaClient } from '@prisma/client'
import cors from 'cors'


const prisma = new PrismaClient()

const app = express()
app.use(express.json())
app.use(cors("http://localhost:5173"))


app.post("/usuarios", async (req, res) => {

    await  prisma.user.create({
        data: {
            email: req.body.email,
            name: req.body.name,
            age: req.body.age,
        }
    })

    res.status(201).send(req.body)
})

app.get("/usuarios", async (req, res) => {

 const users = await prisma.user.findMany()

 res.status(200).json(users)
})


app.put("/usuarios/:id", async (req, res) => {

    await  prisma.user.update({

        where:{
            id: req.params.id

        },
        data: {
            email: req.body.email,
            name: req.body.name,
            age: req.body.age,
        }
    })

    res.status(201).send(req.body)
})


app.delete("/usuarios/:id", async (req, res) => {

    await prisma.user.delete({
        where: {
            id: req.params.id
        }
    })

    res.status(200).json({message: 'usuario deletado com sucesso'})
})

app.listen(3000)