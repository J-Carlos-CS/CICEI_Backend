import { DataTypes, Sequelize } from "sequelize";
import { sequelize } from "../../database/database.js";
import { TutorInvestigador } from "./tutorInvestigador.model.js";

export const User = sequelize.define("user", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  email: DataTypes.STRING,
  password: DataTypes.STRING,
  firstName: DataTypes.STRING,
  lastName: DataTypes.STRING,
  birthDate: DataTypes.DATEONLY,
  picture: DataTypes.STRING,
  resume: DataTypes.TEXT,
  rol: DataTypes.STRING,
  career: DataTypes.STRING,
  state: DataTypes.BOOLEAN,
  status: DataTypes.BOOLEAN,
  cellPhone: DataTypes.INTEGER,
});

User.hasOne(TutorInvestigador, {
  as: "tutor",
  foreinkey: "tutorId",
  sourceKey: "id",
});
TutorInvestigador.belongsTo(User, { as: "tutor", foreinkey: "tutorId", targetId: "id" });

User.hasMany(TutorInvestigador, {
  as: "investigador",
  foreinkey: "investigadorId",
  sourceKey: "id",
});
TutorInvestigador.belongsTo(User, { as: "investigador", foreinkey: "investigadorId", targetId: "id" });
