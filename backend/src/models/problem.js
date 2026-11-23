const mongoose = require('mongoose');
const { Schema } = mongoose;

const attemptSchema = new Schema(
  {
    date: { type: Date, default: Date.now },
    result: {
      type: String,
      enum: ['solved_alone', 'solved_with_hint', 'could_not_solve'],
      required: true,
    },
  },
  { _id: false }
);
const problemSchema= new Schema({
    user:{
        type: Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    title:{
        type:String,
        required:true,
        trim:true
    },
    difficulty:{
        type:String,
        required:true,
        enum:['Easy','Medium','Hard']
    },
    status:{
        type:String,
        enum:['Not_Attempted','Solved_alone','Solved_with_hints','Could_not_solve'],
        default:'Not_Attempted'
    },
    stage:{
        type:Number,
        min:0,
        default:0
    },
    nextRevisionDate:{
        type:Date,
    },
    attempts:[attemptSchema],
    link:{
        type:String,
        required:true,
        trim:true
    },
    topic:{
        type:String,
        required:true,
        trim:true
    }
},{
    timestamps:true
})

const Problem= mongoose.model('Problem',problemSchema);
module.exports=Problem;