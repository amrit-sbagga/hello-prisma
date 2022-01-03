const express = require("express")
const app = express();

const PORT_NO = 5019;


app.get("/", (req, res) => {
    res.send("I am working")
})

app.listen(PORT_NO, () => {
    console.log(`Listening on port ${PORT_NO}`);
})