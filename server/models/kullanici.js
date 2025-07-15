import mongoose from 'mongoose'
const userSchema=new mongoose.Schema({

    firstName:{type:String, required:false},
    lastName:{type:String, required:false},
    email:{type:String,required:true},
    password:{type:String,required:true
    },
    tel:{type:String,required:false
    },
    hakkimda: { type: String, required: false, default: "" },

    file:{type:String,required:false
    },
    uzmanlik:[{
      type:String,required:false
    
    }],
    sertifika:[{
      type:String,required:false
    
    }],
    selectedFile:{type:String, required:false},  
      unvan:{type:String, required:false},
    id:{type:String}
})
export default mongoose.model('User',userSchema)