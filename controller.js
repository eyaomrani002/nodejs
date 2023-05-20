const User=require('./UserModel')

const addUser=async(req,res)=>{
    const user=new User(req.body);
    try{
        await user.save();
        res.status(201).json({message:'succes'});

    }catch(error){
        res.status(500).send(error)
    }

}

const getUsers=async(req,res)=>{
    try {
        const users=await User.find({});
        res.status(201).send(users)
    } catch (error) {
        res.status(500).send(error)

        
    }
}
const getUser=async(req,res)=>{
    try {
        const user=await User.find({_id:req.params.id});
        res.status(201).send(user)
    } catch (error) {
        res.status(500).send(error)

        
    }
}

const updateUser=async(req,res)=>{
    try {
        const user=await User.findByIdAndUpdate(
            {_id:req.params.id},
            {$set:req.body},
            {new:true}
            );
            if(!user){
                res.status(404).send('not found ')
            }
        res.status(201).send(user);
    } catch (error) {
        res.status(500).send(error)

        
    }
}


const deleteUser=async(req,res)=>{
    try {
        const user=await User.findByIdAndDelete(
            {_id:req.params.id})
        res.status(201).send("succes");
    } catch (error) {
        res.status(500).send(error)

        
    }
}

module.exports={
    addUser,
    getUser,
    getUsers,
    updateUser,
    deleteUser
}