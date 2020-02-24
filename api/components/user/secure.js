const auth=require('../../../auth')

module.exports = function checkAuth(action) {
    
    function midelware(req,res,next) {
        switch(action){
            case 'update':
                const owner=req.body.id
                auth.check.owh(req,owner)
                break;
            
            default:
                next()    

        }
    }

}