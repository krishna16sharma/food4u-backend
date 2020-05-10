const handleRegister = (req,res,db,bcrypt) =>{
    const {email,username,password,address,phone} = req.body;
    console.log(email)
    if(!(email && username && password && phone && address)){
        return res.status(400).json("Incorrect form submission")
    }
    const hash = bcrypt.hashSync(password);
    db.transaction(trx =>{
        trx.insert({
            hash: hash,
            email:email
        })
        .into('credentials')
        .returning('email')
        .then(loginEmail =>{
            return trx('customers')
            .returning('*')
            .insert({
                email:loginEmail[0],
                username: username,
                address: address,
                phone: phone,
                joined: new Date()
            }).then(user => {
                res.json(user[0]);
            })
        })
        .then(trx.commit)
        .catch(trx.rollback)
    })
    .catch(err => res.status(400).json('Unable to register'))
}

module.exports = {
    handleRegister: handleRegister
}
