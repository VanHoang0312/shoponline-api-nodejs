const AccountModel = require('../models/account.controller')
const { body, validationResult } = require('express-validator')
const bcrybt = require('bcrypt')
const saltRounds = 10;
const jwt = require('jsonwebtoken')

//register

exports.register = (req, res, next) =>{
    
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        const errorMessages = errors.array().map(error => error.msg);
        return res.status(400).json({ errors: errorMessages });
    }
   var username = req.body.username
   var password = req.body.password
   var role = req.body.role
   let mahoamatkhau = '';
        bcrybt.genSalt(saltRounds, (err, salt)=>{
            bcrybt.hash(password, salt, (err, hash)=>{
                mahoamatkhau = hash;
                AccountModel.findOne({
                    username: username
                   })
                   .then(data=>{
                        if(data){
                            res.json('Acc nay da ton tai')
                        }else{
                            return AccountModel.create({
                                username: username,
                                password: mahoamatkhau,
                                role : role
                            })
                        }
                   })
                   .then(data=>{
                        if (data) {
                            res.json('Tao acc thanh cong')
                        }
                   })
                   .catch(err=>{
                    res.status(500).json('Tao acc that bai')
                   })
            })
        })
}

//login
exports.login = async  (req, res, next) =>{
    var username = req.body.username
    var password = req.body.password
    //var role = req.body.role


    AccountModel.findOne({
         username: username,
         
     })
    .then(data => {
        if (!data) {
            return res.status(500).json('Tai khoan khong chinh xac')
        }

        const checkPassword = bcrybt.compareSync(password, data.password)
        if (!checkPassword) {
            return res.status(500).json('Mat khau khong chinh xac')
        }else {
            var token = jwt.sign({
                _id : data._id
                //username : data.username
            }, 'mk')
            return res.status(200).json({
                message :'Dang nhap thanh cong roiii',
                token: token
            })
        }
    })
    .catch(error => {
        res.status(500).json('Loi sever')
    })
}


//Lấy dữ liệu
exports.get = (req, res, next) =>{
    var username = req.body.username
    var password = req.body.password
    var role = req.body.role
    AccountModel.find({})
    .then(data=>{
        res.json(data)
    })
    .catch(err=>{
        res.status(500).json('Dang bi loi')
    })

}


//Sửa
exports.update = (req, res, next) =>{
    var id = req.params._id
    var newpassword = req.body.newpassword
    
    AccountModel.findByIdAndUpdate(id, {
        password: newpassword
    })
    .then(data=>{
        res.json('Sua thanh cong')
    })
    .catch(err =>{
        res.status(500).json('Loi sever')
    })
}


exports.getById = (req, res, next) =>{
    var id = req.params._id

    AccountModel.findById({id})
    .then(data=>{
        res.json(data)
    })
    .catch(err=>{
        res.status(500).json('Dang bi loi')
    })

}

//Xóa
exports.delete = (req, res, next) =>{
    var id = req.params.id
    AccountModel.deleteOne({
        _id: id
    })
    .then(data=>{
        res.json('Xoa thanh cong')
    })
    .catch(err=>{
        res.status(500).json('Loi sever')
    })
}
