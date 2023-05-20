const express=require('express')
const router=express.Router()


const controller =require('./controller')
router.post('/users',controller.addUser)
router.get('/users',controller.getUser)
router.get('/users/:id',controller.getUsers)
router.patch('/users/:id',controller.updateUser)

router.post('/users/:id',controller.deleteUser)



module.exports =router