const { Model: User } = require("../users/model");
const { Model, fields, references, virtuals } = require("./model");

exports.parentId = async (req, res, next) => {
  const { params = {} } = req;
  const { user = "" } = params;

  if (user) {
    const data = await User.findById(user).exec();
    if (data) {
      next();
    } else {
      const message = "User not found";
      next({
        message,
        statusCode: 404,
        level: "warn",
      });
    }
  } else {
    next();
  }
};

exports.create = async (req, res, next) => {
  const { body = {}, decoded } = req;
  const { id } = decoded;

  try {
    const document = new Model({
      ...body,
      user: id,
    });

    const data = await document.save();
    const status = 201;
    res.status(status);
    res.json({
      data,
    });
  } catch (error) {
    next(error);
  }
};

exports.read = async (req, res, next) => {
  const { doc = {} } = req;

  res.json({
    data: doc,
  });
};

exports.update = async (req, res, next) => {
  const { doc = {}, body = {} } = req;

  Object.assign(doc, body);
  try {
    const data = await doc.save();
    res.json({
      data,
    });
  } catch (error) {
    next(error);
  }
};

exports.delete = async (req, res, next) => {
  const { doc = {} } = req;
  try {
    const data = await doc.remove();
    res.json({
      data,
    });
  } catch (error) {
    next(error);
  }
};
