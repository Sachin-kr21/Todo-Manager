"use strict";
const { Model, Op } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    // eslint-disable-next-line no-unused-vars
    static associate(models) {
    }

    static async remove(id, userId) {
      return this.destroy({
        where: {
          id,
          userId,
        },
      });
    }

    static async completedtodos(userId) {
      // FILL IN HERE TO RETURN OVERDUE ITEMS
      // retrieve items from table
      // return list of items where due date is less than todays date
      try {
        const completedTodos = await Todo.findAll({
          where: {
            completed: true,
            userId,
          },
        });
        return completedTodos;
      } catch (error) {
        console.log(error);
      }
    }

    static async overdue(userId) {
      // FILL IN HERE TO RETURN OVERDUE ITEMS
      // retrieve items from table
      // return list of items where due date is less than todays date
      try {
        const overdues = await Todo.findAll({
          where: {
            dueDate: {
              [Op.lt]: new Date(),
            },
            completed: false,
            userId,
          },
        });
        return overdues;
      } catch (error) {
        console.log(error);
      }
    }

    static async dueToday(userId) {
      // FILL IN HERE TO RETURN ITEMS DUE tODAY
      try {
        const overdues = await Todo.findAll({
          where: {
            dueDate: {
              [Op.eq]: new Date(),
            },
            completed: false,
            userId,
          },
        });
        return overdues;
      } catch (error) {
        console.log(error);
      }
    }

    static async dueLater(userId) {
      // FILL IN HERE TO RETURN ITEMS DUE LATER
      try {
        const overdues = await Todo.findAll({
          where: {
            dueDate: {
              [Op.gt]: new Date(),
            },
            completed: false,
            userId,
          },
        });
        return overdues;
      } catch (error) {
        console.log(error);
      }
    }

    static addTodo({ title, dueDate, userId }) {
      return this.create({
        title: title,
        dueDate: dueDate,
        completed: false,
        userId,
      });
    }

    static getTodos() {
      return this.findAll();
    }

    setCompletionStatus(completionStatus, userId) {
      
      
      return this.update({
        completed: completionStatus,
      
      },{where:{
        userId
      }});
    }

    markAsCompleted() {
      return this.update({ completed: true });
    }
    deleteTodo() {
      this.destroy();
    }
  }
  Todo.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: true,
          len: {
            args: 5,
            msg: "Length should be greater than 5!",
          },
        },
      },
      dueDate: {
        type: DataTypes.DATEONLY,
      },
      completed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "Todo",
    }
  );
  return Todo;
};
