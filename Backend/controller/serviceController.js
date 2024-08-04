const Service = require('../model/service');

exports.createService = async (req, res, next) => {
  try {
    const service = await Service.create(req.body);
    if (!service) {
      const error = new Error('Service not created');
      error.statuCode = 400;
      throw error;
    }

    res.status(201).json({
      message: 'success',
      service,
    });
  } catch (error) {
    next(error);
  }
};

exports.getAllServices = async (req, res, next) => {
  try {
    const services = await Service.find();
    if (!services) {
      const error = new Error('Services not Found');
      error.statuCode = 400;
      throw error;
    }
    res.status(200).json({
      count: services.length,
      services,
    });
  } catch (error) {
    next(error);
  }
};

exports.updateServices = async (req, res, next) => {
  const id = req.params.id;
  try {
    const updatedServices = await Service.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedServices) {
      const error = new Error('Service not Updated');
      error.statuCode = 400;
      throw error;
    }
    res.status(201).json({
      message: 'updated successfull',
      updatedServices,
    });
  } catch (error) {
    next(error);
  }
};


exports.deleteService = async(req,res,next) => {
    try {
        const deleteService = await Service.findByIdAndDelete(req.params.id)
          if (!deleteService) {
            const error = new Error('Failed to delete service');
            error.statusCode = 400;
            throw error;
          }
          res.status(200).json({
            message : "Deleted Successfull",
            deleteService
          })
    } catch (error) {
        next(error)
    }
}