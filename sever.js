const express = require('express')
const app = express()
var bodyParser = require('body-parser')
const AccountModel = require('./models/accont')
const { body, validationResult } = require('express-validator');
const bcrybt = require('bcrypt')
const saltRounds = 10;


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


app.post('/register',
[body('username').notEmpty().withMessage('Chua nhap tai khoan'),
body('password').notEmpty().withMessage('Chua nhap mat khau')], 
 (req, res, next) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        const errorMessages = errors.array().map(error => error.msg);
        return res.status(400).json({ errors: errorMessages });
    }
   var username = req.body.username
   var password = req.body.password
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
                                password: mahoamatkhau
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
})


app.post('/login', async  (req, res, next) =>{
    var username = req.body.username
    var password = req.body.password

    AccountModel.findOne({
         username: username
     })
    .then(account => {
        if (!account) {
            return res.status(500).json('Tai khoan khong chinh xac')
        }

        const checkPassword = bcrybt.compareSync(password, account.password)
        if (!checkPassword) {
            return res.status(500).json('Mat khau khong chinh xac')
        }else {
            return res.status(200).json('Đang nhap thanh cong')
        }
    })
    .catch(error => {
        res.status(500).json('Loi sever')
    })
})



var router = require('./router/account')
app.use('/api/account', router)


app.get('/', (req, res, next) =>{
    res.json("Home")
})
app.listen(3000,() =>{
    console.log(`Link: http://localhost:${3000}`)
})