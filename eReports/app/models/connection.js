module.exports = app => {
    const mongoose = require('mongoose')
    const mongoosePaginate = require('mongoose-paginate')
    const autoIncrement = require('mongoose-auto-increment')
    const Schema = mongoose.Schema
    const ObjectId = mongoose.Schema.Types.ObjectId

    const connection = new Schema({
        // connect_id: {type: Number, index: true, unique: true},
        driver: {type: String, required: true, trim: true},
        user: {type: String, required: true, trim: true},
        password: {type: String, required: true, trim: true},
        nameConect: {type: String, required: true, trim: true},
        connectString: {type: String, required: true, trim: true},
        descrConect: {type: String, required: true, trim: true},
        status: {type : String, required: true, enum : [ 'Active', 'Inactive' ], default : 'Active'},
        created_at: {type: Date, default: Date.now},
        updated_at: {type: Date},
        deleted_at: {type: Date}
    })
    connection.virtual('connect_id').get(function(){
        return this._id;
    })
    autoIncrement.initialize(mongoose.connection);
    connection.plugin(autoIncrement.plugin, { model: 'Connection', field: 'connect_id', startAt: 1, incrementBy: 1 });
    connection.plugin(mongoosePaginate)

    return mongoose.model('Connection', connection)
}
