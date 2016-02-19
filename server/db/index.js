
const Sequelize = require('sequelize');
const path = require('path');
const sequelize = new Sequelize('lunchtrain', null, null, {
  dialect: 'sqlite',
  storage: path.join(__dirname,'lunchtrain.sqlite'),
});

const User = sequelize.define('User', {
  slackId: Sequelize.STRING,
  firstName: Sequelize.STRING,
  lastName: Sequelize.STRING,
});

const Team = sequelize.define('Team', {
  slackTeamId: Sequelize.STRING,
  teamName: Sequelize.STRING,
});

const Destination = sequelize.define('Destination', {
  googleId: Sequelize.STRING,
  name: Sequelize.STRING,
  lat: Sequelize.STRING,
  long: Sequelize.STRING,
  visits: Sequelize.INTEGER,
  likes: Sequelize.INTEGER,
});

const Train = sequelize.define('Train', {
  timeDeparting: Sequelize.INTEGER,
  timeDuration: Sequelize.INTEGER,
});

User.belongsToMany(Team, {through: 'Users_Teams'});
Team.belongsToMany(User, {through: 'Users_Teams'});

User.belongsToMany(Train, {through: 'Users_Trains'});
Train.belongsToMany(User, {through: 'Users_Trains'});

Team.belongsToMany(Destination, {through: 'Teams_Destinations'});
Destination.belongsToMany(Team, {through: 'Teams_Destinations'});

Destination.hasMany(Train);
Train.hasMany(User);
Team.hasMany(Train);

module.exports = {
    User,
    Team,
    Destination,
    Train,
    sequelize,
  };
