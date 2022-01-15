const mongoose = require('mongoose')

const dbConnection = async() => {
    try {
        
        await mongoose.connect(process.env.DN_CNN);
        console.log('db online')

    } catch (error) {
        console.log(error)
        throw new Error('Error a iniciar bd')
    }
}

module.exports = {
    dbConnection
}