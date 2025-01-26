const authMiddleware = (req,res,next) => {

    const token = "xyz";
    const validToken = token === "xyz";

    if(!validToken){
      res.status(401).send("Not Authorized")
    }else{
      next();
    }
}

const userMiddleware = (req,res,next) => {

    const token = "xfyz";
    const validToken = token === "xyz";

    if(!validToken){
      res.status(401).send("Not Authorized")
    }else{
      next();
    }
}

module.exports = {
    authMiddleware,
    userMiddleware
}