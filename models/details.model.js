const mongoose = require('mongoose')

const detailsSchema = new mongoose.Schema(
    {
        date: {
            type: Date,
            required: [true, 'La fecha es obligatoria']
        },
        hours: {
            type: Number,
            required: [true, 'La hora es obligatoria']
        },
        consume: {
            type: Number,
            required: [true, 'el consumo  es obligatorio']
        },
        price: {
            type: Number,
            required: [true, 'El precio es obligatorio']
        },
        costPerHour: {
            type: Number,
            required: [true, 'El precio por hora es obligatorio']
        }
    }, {
        timestamps: true,
        toJSON: {
            transform: (doc, ret) => {
                ret.id = doc._id
                delete ret._id
                delete ret.__v
                return ret
            }
        }
    }
)

const Details = mongoose.model("Details", detailsSchema)

module.exports = Details