const isValidUser = (req,res,next)=>{

    if(req.session.isValid){
        next()
    }
    else{

        res.redirect('/')
    }

}

export default isValidUser