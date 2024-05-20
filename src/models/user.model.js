import { DataTypes, Sequelize } from "sequelize";
import { sequelize } from "../../database/database.js";
import { TutorInvestigador } from "./tutorInvestigador.model.js";
import { Guias } from "./guias.model.js";

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
  rol: DataTypes.STRING,
  career: DataTypes.STRING,
  status: DataTypes.BOOLEAN,
  cellPhone: DataTypes.INTEGER,
});

TutorInvestigador.belongsTo(User, { foreignKey: "tutorId", as: "tutor" });
TutorInvestigador.belongsTo(User, { foreignKey: "investigadorId", as: "investigador" });

User.hasMany(Guias, { foreinkey: "usuarioId", targetId: "id" });
Guias.hasMany(User, { foreinkey: "usuarioId", targetId: "id" });
