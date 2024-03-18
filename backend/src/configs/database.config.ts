import {connect , ConnectOptions} from 'mongoose';


export const dbConnect = () =>{
    connect(process.env.MONGODB_URI!,{
        // useNewUrlParser:true,
        // useUnifiedRopology:true
    } as ConnectOptions).then(()=>{
        console.log('connect Successfully'),
        (error: any) => console.log(error)
        
    }
)}