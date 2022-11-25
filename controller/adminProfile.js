
// Admin profile 
const adminProfile = (req,res) =>{
    res.josn(req.user)
}
// Admin home
const adminHome = (req,res) =>{
   res.json(req.user)
}

module.exports = {
    adminProfile,
    adminHome
}