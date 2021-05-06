const mongoose = require('mongoose')

const detailsSchema = new mongoose.Schema(
    {
        date: {
            type: Date,
        },
        hours: {
            type: Number
        },
        consume: {
            type: Number
        },
        price: {
            type: Number
        },
        costPerHour: {
            type: Number
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