const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");

const { user, post } = new PrismaClient();

//create post
router.post('/', async(req, res) => {
    //console.log("req received here => ", req);
    const { title, content, user_id } = req.body;
 
    //find if user exists, then only associate post
    const userExists = await user.findUnique({
        where : {
            id : user_id
        }
    });

    console.log("userExists here => ", userExists);

    if(!userExists){
        return res.status(400).json({
            msg : "User not found!!"
        })
    }

    const newPost = await post.create({
        data : {
            title,
            post : content, 
            user_id
        }
    })
    res.json(newPost);

});

// get all posts associated with user
router.get('/:user_id', async(req, res) => {

    //read from path parameter
    const { user_id } = req.params;

    const posts = await post.findMany({
        where:{
            user_id : parseInt(user_id)
        },
        select : {
            title: true,
            created_at : true,
            post : true,
            user : true
        }
    });
    res.json(posts);
})

module.exports = router;