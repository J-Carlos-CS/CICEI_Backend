import { sequelize } from "../database/database.js";
import app from "./app.js";
import dotenv from "dotenv";
import { TutorInvestigador } from "./models/tutorInvestigador.model.js";

dotenv.config();
async function main() {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
    await sequelize.sync({ force: false });
    app.listen(process.env.PORT || 4000);
    console.log("Server on port " + process.env.PORT || 4000);
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

main();
