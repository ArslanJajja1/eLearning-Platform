exports.register = (req, res) => {
    console.log("Req ", req);
    console.log("Req body ", req.body);
    res.send("Wellcome to our application ");
};
