const mongoose = require('mongoose')
mongoose.connect('mongodb://blogging_blogs:bloggingAdmin0018@ds161024.mlab.com:61024/blogging_blogs',{ useNewUrlParser: true })

const userSchema = mongoose.Schema({
   method:{
      type:String,
      enum:['local','google','linkedin']
   },
   local:{
      username : String,
      email : String,
      password : String,
      defaultProfilePic : String,
      userProfilePic : String,
      defaultCoverPic : String,
      userCoverPic : String
   },
   google:{
      id : String,
      username : String,
      defaultProfilePic : String,
      userProfilePic : String,
      defaultCoverPic : String,
      userCoverPic : String
   },
   linkedin:{
      id:String,
      email:String,
      defaultProfilePic : String,
      userProfilePic : String,
      defaultCoverPic : String,
      userCoverPic : String
   }
})

const User = mongoose.model('user_data',userSchema)
module.exports = User

module.exports.getExistingUsername = (inputUsername,callback) =>{
   query = {"local.username":inputUsername}
   User.findOne(query,callback)
}

module.exports.createNewUser = (newUser,callback) =>{
   newUser.save(newUser,callback)
}

module.exports.getExistingEmail = (inputEmail,callback) =>{
   query = {"local.email":inputEmail}
   User.findOne(query,callback)
}

module.exports.getPassword = (inputPassword,callback) =>{
   query = {password:inputPassword}
   User.findOne(query,callback)
}

module.exports.getByID  = (id,callback) =>{
   User.findById(id, callback)
}

module.exports.getUsersFromGoogleSignUp = (googleID,callback) =>{
   query = {"google.id":googleID}
   User.findOne(query,callback)
}

module.exports.getUsersFromLinkedinSignUp = (linkedinID,callback) =>{
    query = {"linkedin.id":linkedinID}
    User.findOne(query,callback)
}

module.exports.getEmailUpdated = (currentuser,newEmail,callback) =>{
   query = {'local.username':currentuser}
   toUpdate = {'local.email':newEmail}
   User.updateOne(query,{$set:toUpdate},callback)
}

module.exports.checkOldPassword = (currentuser,oldPassword,callback) =>{
   query = {$and : [{'local.username':currentuser,'local.password':oldPassword}]}
   User.findOne(query,callback)
}

module.exports.updatePassword = (currentuser,newPassword,callback) =>{
   query = {'local.username':currentuser}
   toUpdate = {$set:{'local.password':newPassword}}
   User.update(query,toUpdate,callback)
}

module.exports.updateCoverPhotoStatus = (currentuser,imageName,callback) =>{
   query = {'local.username':currentuser}
   toUpdate = {'local.defaultCoverPic':'false','local.userCoverPic':imageName}
   User.update(query,toUpdate,callback)
}

module.exports.updateProfilePhotoStatus = (currentuser,imageName,callback) =>{
   query = {'local.username':currentuser}
   toUpdate = {'local.defaultProfilePic':'false','local.userProfilePic':imageName}
   User.update(query,toUpdate,callback)
}

module.exports.getUsersByMethod = (method,username,callback) =>{
    if(method == 'local'){
        query = {"local.username":username}
        User.findOne(query,callback)
    }
    else if(method =='google'){
        query = {"google.username":username}
        User.findOne(query,callback)
    }
    else if(method =='linkedin'){
        query = {"linkedin.username":username}
        User.findOne(query, callback)
    }
}
