import Sequelize from 'sequelize';
import database from '../../db.js';

const User = database.define('user', {
   id: {
         type: Sequelize.INTEGER,
         autoIncrement: true,
         allowNull: false,
         primaryKey: true
      },
   name: {
         type: Sequelize.STRING,
         allowNull: false,
      },
   token:{
         type: Sequelize.STRING,
         allowNull: false,
      }

})

const Scheduling = database.define('schedules',{
   type: {
         type: Sequelize.STRING,
         allowNull: false,
      },
   when_to_notify:{
         type: Sequelize.STRING,
         allowNull: false
   },
   title:{
         type: Sequelize.STRING,
         allowNull: false
      },
   body:{
         type: Sequelize.STRING,
         allowNull: false
      },


});

User.hasMany(Scheduling);
Scheduling.belongsTo(User)

export { User, Scheduling };