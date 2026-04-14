const db=require('../config/db')
const logger=require('../utils/logger')
async function findUserByEmail(email){
    try {
        const result=db.query('SELECT * FROM users WHERE email=$',[email])
        const user = result.rows[0];
        if (!user){
            throw new Error ('user not found')
            logger.error('user not found')
        }else
            return user
     } catch (error) {
        
    }
}
async function findUserById(id){
    
}


module.exports={logIn,logOut,signUp}