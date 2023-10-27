const { Sequelize, DataTypes, Op } = require('sequelize')

module.exports = (App, db) => {
  App.db = new Sequelize(db)
  App.db.Op = Op

  App.db.User = App.db.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  })

  App.db.Solved = App.db.define('Solved', {
    storyId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
  })

  App.db.Session = App.db.define('Session', {
    token: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  })

  App.db.Log = App.db.define('Log', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    storyId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    value: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    correct: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  })

  /*

  

  App.db.SolutionLog = App.db.define('MSolutionLog2', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    questId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    solution: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  })

  App.db.LegacyShare = App.db.define('MShare', {
    // outdated, but we still support reading from it
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    publicId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  })

  App.db.define('MSolutionLog', {
    // outdated, not in use anymore
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    questId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    solution: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  })*/
}
