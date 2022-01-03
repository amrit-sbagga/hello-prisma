const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");

const { user } = new PrismaClient();
//console.log("user here => ", user);

router.get('/', async (req, res) => {
    const users = await user.findMany({
        select : {
            username: true,
            posts: true
        }
        // ,
        // where : {
        //     username: "amr2"
        // }
    });
    //console.log(users);
    res.json(users);
})

//create user
router.post('/createUser', async(req, res) => {
    //console.log("req received here => ", req);
    const { username } = req.body;
    console.log("username received here => ", username);

    const userExists = await user.findUnique({
        where : {
            username : username
        },
        select : {
            username : true
        }
    })
    // .catch((err) => {
    //     res.json({"err" : err});
    // });
    //res.json(userExists);

    if(userExists){
        return res.status(400).json({
            msg : "User already exists!!"
        })
    }

    console.log("create new user here..!!");
    const newUser = await user.create({
        data : {
            username
        }
    });

    res.json(newUser);

})

module.exports = router;