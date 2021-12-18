var userDB = require('../model/model')

// create and save new user
exports.create = (req,res)=>{
    // validate request
    if(!req.body) {
        res.status(400).send({ message: "Content cannot be empty!" });
        return;
    }
    // new user
    const user = new userDB({
        name: req.body.name,
        email: req.body.email,
    })
    // save user in the database
    user.save(user).then(data => {
        res.redirect('/');
    }).catch(err => {
        res.status(500).send({ message: err.message || `Some error occured while creating user` })
    })
}

// retrive and return all users / retrive and return a single user
exports.find = (req,res)=>{
    if(req.query.id){
        const id = req.query.id;
        userDB.findById(id).then(data => {
            if(!data){
                res.status(404).send({ message: `Not found user with id = `+id })
            } else {
                res.send(data);
            }
        })
        .catch(err => {
            res.status(500).send({ message: `Error retriving user with id = `+id });
        })
    } else{
        userDB.find().then(user => {
            res.send(user)
        }).catch(err => {
            res.status(500).send({ message: err.message || `Error occured while retriving user information` })
        })
    }
}

// update an user by user_id
exports.update = (req,res)=>{
    if(!req.body){
        return res.ststus(400).send({ message: `Data to update cannot be empty` })
    }

    const id = req.params.id;
    userDB.findByIdAndUpdate(id, req.body, {useFindAndModify:false}).then(data => {
        if(!data){
            res.status(404).send({ message: `Cannot update user with ${id}. Maybe user not found` })
        } else {
            res.send(data)
        }
    }).catch(err => {
        res.status(500).send({ message: `Error update user information` })
    })
}

// delete an user
exports.delete = (req,res)=>{
    const id = req.params.id;
    userDB.findByIdAndDelete(id).then( data => {
        if(!data){
            res.ststus(404).send({ message: `Cannot delete with id ${id}, Myabe id is wrong` })
        } else {
            res.send({ message: `User was deleted successfully!` })
        }
    }).catch(err => {
        res.status(500).send({mesage: `Couldnot delete the user with = ` +id})
    })
}