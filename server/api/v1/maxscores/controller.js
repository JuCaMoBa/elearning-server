const { Model: User } = require("../users/model");
const { Model, references } = require("./model");
const { filterByNested } = require("../../../utils/utils");

const referencesNames = [...Object.getOwnPropertyNames(references)];

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

exports.id = async (req, res, next) => {
  const { params = {} } = req;
  const { id = "" } = params;
  try {
    const data1 = await Model.find({ user: id }).sort({ math: -1 }).limit(1);
    const data2 = await Model.find({ user: id }).sort({ history: -1 }).limit(1);
    const data3 = await Model.find({ user: id }).sort({ science: -1 }).limit(1);
    const data4 = await Model.find({ user: id })
      .sort({ geography: -1 })
      .limit(1);
    if (!data1 || !data2 || !data3 || !data4) {
      const message = `${Model.modelName} not found`;
      next({
        message,
        statusCode: 404,
        level: "warn",
      });
    } else {
      req.doc = { data1, data2, data3, data4 };
      next();
    }
  } catch (error) {
    next(error);
  }
};

exports.all = async (req, res, next) => {
  const { params } = req;
  const { filters, populate } = filterByNested(params, referencesNames);
  try {
    const dataMaths = await Model.find(filters).populate(populate);

    res.json({
      dataMaths,
    });
  } catch (error) {
    next(error);
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
