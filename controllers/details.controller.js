const Details = require('../models/details.model');
const createError = require('http-errors')

module.exports.create = (req, res, next) => {
    const { date, hours, consume, price, costPerHour } = req.body;
    if (!date || !hours || !consume || !price || !costPerHour) {
      throw createError(400, "All inputs are required");
    }
    const details = new Details(req.body)
    details 
        .save()
        .then(data => {
            res.status(201).json(data)
        })
        .catch(next)
}

module.exports.readAllDetails = (req, res, next) => {
    Details.find({})
        .sort({date: 1})
        .then((data) => res.status(200).json(data))
        .catch(next)
}

module.exports.readOne = (req, res, next) => {
    Details.findById(req.params.id)
        .then(data => res.status(200).json(data))
        .catch(next)
}

module.exports.update = (req, res, next) => {
    Details.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    })
    .then((data) => res.status(200).json(data))
    .catch(next)
}

module.exports.delete = (req, res, next) => {
    Details.findByIdAndDelete(req.params.id)
      .then(() => res.status(204).json())
      .catch(next);
  };

