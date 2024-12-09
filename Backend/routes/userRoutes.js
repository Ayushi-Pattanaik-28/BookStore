const router = require("express").Router();

//Sign-Up
router.post("/sign-up", async (req,res) =>{
    try{
      const { username, email, password, address } = req.body;

      //check username length is more than 3
      if(username.length <= 4)
      {
        return res.status(400).json({ message: "username length should be greater than 3"});
      }
      
      //check username already exists ?
      const existingUsername = await  User.find({ username: username });
      if (existingUsername) {
        return res.status(400).json({ message: "Username already exists" });
      }

      const existingEmail = await User.find({ email: email });
      if (existingEmail) {
        return res.status(400).json({ message: "Email already exists" });
      }

      //check password length
      if(password.length <= 5 )
      {
        return res.status(400).json({ mesage: "Password length should be greater than 5"});
      }



    } catch(error) {
        res.status(500).json({ message: "Internal server error" });        
    }
});

module.exports = router;