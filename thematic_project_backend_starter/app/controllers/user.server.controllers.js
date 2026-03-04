const create_account = (req, res) => {
    //return res.sendStatus(500);
    const schema = Joi.object({
        first_name: Joi.string().required(),
        last_name: Joi.string().required(),
        email: Joi.string().required().email(),
        password: Joi.string().min(8).max(34).pattern(new RegExp (/[A-Z]/)).pattern(new RegExp (/[a-z]/)).pattern(new RegExp (/[0-9]/)).pattern(new RegExp (/[^A-Za-z0-9]/)).required()
    });

    console.log(schema.validate(req.body));

    const {error} = schema.validate(req.body);
    if (error) return res.status(400).json({ error_message: error.details[0].message });

    const { email } = req.body;

    users.testDuplicateEmail(email, (err, exists) => {
        if(err) return res.sendStatus(500)
        if (exists) return res.status(400).json({ error_message: "Email already used" })
        let user = Object.assign({}, req.body);

        users.addNewUser(user, (err, id) =>{
            if(err) return res.sendStatus(500)

            return res.status(201).json({ user_id: id });
        })
    })
}

const login = (req, res) => {
    const schema = Joi.object({
        email: Joi.string().required().email(),
        password: Joi.string().required()
    });

    const {error} = schema.validate(req.body);
    if (error) return res.status(400).json({ error_message: error.details[0].message });

    users.authenticateUser(req.body.email, req.body.password, (err, id) => {
    if(err === 404) return res.status(400).json({ error_message: "Invalid email/ password supplied" });
    if(err) return res.sendStatus(500);

        users.getToken(id, (err, token) => {
            if(err) return res.sendStatus(500);

            if(token){
                return res.status(200).send({user_id: id, session_token: token})
            }
            else{
                users.setToken(id, (err, token) => {
                    if (err) return res.sendStatus(500);
                    return res.status(200).send({user_id: id, session_token: token})
                })
            }
        })
    })
}

const logout = (req, res) => {
    const token = req.get("X-Authorization");

    if(!token){
        return res.status(401).send({ message: "No token provided" });
    }

    users.removeToken(token, (err, changes) => {
        if (err) return res.sendStatus(500);

        if (changes === 0)  return res.status(401).send({ message: "Invalid token" }) 

        return res.status(200).send({message: "Logged out successfully" });    
        //2) Should return 200 status code for logging out user who is logged in
    })
}

module.exports = {
    create_account: create_account,
    login: login,
    logout: logout
}

