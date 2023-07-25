const errorHandler = (err,req,res,nxt)=>{
    console.log(err);
    return res.status(500).json({msg: 'something went wrong, please try again'});
}
module.exports = errorHandler;