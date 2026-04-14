const {Router}=require('express')

const authRouter=Router()

authRouter.post('/login')
authRouter.post('/sign-up')
authRouter.post('/log-out')


module.exports=authRouter;