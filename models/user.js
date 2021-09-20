import mongoose from 'mongoose';
const { Schema } = mongoose;
const { createHmac } = await import('crypto');
import pkg from 'uuid';
const { v4: uuidv4 } = pkg;

const userSchema=new Schema({
    name: {
        type: String,
        required: true,
        maxlength: 32,
        trim: true
    },    
    lastname:{
        type:String,
        maxlength:32,
        trim:true
    },
    email:{
        type:String,
        trim:true,
        required:true,
        unique:true
    },
    userinfo:{
        type:String,
        trim:true
    },
    encry_password:{
        type:String,
        required:true,
    },
    salt: String,
    role:{
        type:Number,
        default:0,
    },
    purchases:{
        type:Array,
        default:[]
    }


},{timestamps:true});

userSchema.virtual("password")
  .set(function(password){
      this._password=password;  // this '_' is used for private variable 
      this.salt=uuidv4();
      this.encry_password=this.securePassword(password)
  })
  .get(function(){
      return this._password 
  })

userSchema.methods={
    
    authenticate:function(plainpassword){
        return this.securePassword(plainpassword)===this.encry_password
    },

    securePassword:function(plainpassword){
        if(!plainpassword) return"";
        try {
            return createHmac('sha256',this.salt)
            .update(plainpassword)
            .digest('hex');
            
        } catch (err) {
            return ""
        }
    }
}

const User =  mongoose.model("User", userSchema )

export default User;

