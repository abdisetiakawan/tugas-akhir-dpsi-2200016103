const Sequelize = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
  `mysql://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
  {
    dialect: "mysql",
  }
);

// Import models
const User = require("./users")(sequelize, Sequelize.DataTypes);
const UserProfile = require("./userProfile")(sequelize, Sequelize.DataTypes);
const Attendance = require("./attendance")(sequelize, Sequelize.DataTypes);
const Payroll = require("./payroll")(sequelize, Sequelize.DataTypes);

// Define associations
User.hasOne(UserProfile, { foreignKey: "userId" });
UserProfile.belongsTo(User, { foreignKey: "userId" });

User.hasMany(Attendance, { foreignKey: "userId" });
Attendance.belongsTo(User, { foreignKey: "userId" });

User.hasMany(Payroll, { foreignKey: "userId" });
Payroll.belongsTo(User, { foreignKey: "userId" });

module.exports = { sequelize, User, UserProfile, Attendance, Payroll };
