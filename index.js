const express = require("express")
const app = express();

const PORT_NO = 5019;

app.use(express.json());
app.use('/api/user', require("./routes/user"));
app.use('/api/post', require("./routes/post"));

// app.get("/", (req, res) => {
//     res.send("I am working")
// })

app.listen(PORT_NO, () => {
    console.log(`Listening on port ${PORT_NO}`);
})