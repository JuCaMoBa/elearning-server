const { hash } = require("bcryptjs");
const { Model, virtuals } = require("./model");
const { signToken } = require("../auth");

exports.signin = async (req, res, next) => {
  const { body = {} } = req;
  const { email, password } = body;

  try {
    const user = await Model.findOne({
      email,
    }).exec();

    const statusCode = 200;

    if (!user) {
      return next({
        message: `The email address ${email} is not associated with any account. please check and try again!`,
        statusCode: 401,
      });
    }

    const verified = await user.verifyPassword(password);
    if (!verified) {
      return next({
        message: "The email or password not valid",
        statusCode: 401,
      });
    }

    res.status(statusCode);

    const token = signToken({
      id: user.id,
    });

    return res.json({
      data: user,
      meta: {
        token,
      },
    });
  } catch (error) {
    return next(error);
  }
};
exports.signup = async (req, res, next) => {
  const { body = {} } = req;
  const { password, confirmPassword } = body;

  const document = new Model(body);

  try {
    const message = "confirm password do not match with password";
    const statusCode = 200;
    const verified = password === confirmPassword;
    if (!verified) {
      next({
        message,
        statusCode,
      });
    }
    const data = await document.save();
    const status = 201;
    res.status(status);

    const token = signToken({
      id: data.id,
    });

    res.json({
      data,
      meta: {
        token,
      },
    });

    const { firstName, email } = data;
    mail({
      email,
      subject: "Welcome",
      template: "server/utils/email/templates/welcomeEmail.html",
      data: {
        firstName,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.profile = async (req, res, next) => {
  const { decoded } = req;
  const { id } = decoded;
  try {
    const data = await Model.findById(id);

    res.json({
      data,
    });
  } catch (error) {
    next(error);
  }
};

exports.update = async (req, res, next) => {
  const { body = {}, decoded } = req;
  const { id } = decoded;
  let { password, confirmPassword } = body;

  try {
    const message = "confirm password do not match with password";

    if (password && confirmPassword) {
      const verified = password === confirmPassword;
      if (!verified) {
        next({
          message,
          statusCode: 401,
        });
      }
      password = await hash(password, 10);
      confirmPassword = await hash(confirmPassword, 10);
    }
  } catch (error) {
    next(error);
  }
};