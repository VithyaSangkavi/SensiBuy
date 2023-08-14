import mongoose from 'mongoose';

const connectDatabase=() => {
    mongoose.connect(process.env.DATABASE, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log("Connected to the database")
    }).catch((err) => {
        console.log("Error connecting to the database")
    })

}

export default connectDatabase;