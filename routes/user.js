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
    console.log(users);
    res.json(users);
})

module.exports = router;