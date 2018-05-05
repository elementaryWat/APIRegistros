const jwt=require("jwt-simple");
const moment=require("moment");
var secret="publicadores_norte_barranqueras";

exports.createToken=(user)=>{
    var payload={
        sub:user._id,
        user:user,
        iat:moment().unix(),
        exp:moment().add(14,"days").unix()
    }
    return jwt.encode(payload,secret);
}