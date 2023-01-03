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
      // define association here
    }

    static async remove(id) {
      return this.destroy({
        where: {
          id,
        },
      });
    }

    static async completedtodos() {
      // FILL IN HERE TO RETURN OVERDUE ITEMS
      // retrieve items from table
      // return list of items where due date is less than todays date
      try {
        const completedTodos = await Todo.findAll({
          where: {
            completed: true,
          },
        });
        return completedTodos;
      } catch (error) {
        console.log(error);
      }
    }

    static async overdue() {
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
          },
        });
        return overdues;
      } catch (error) {
        console.log(error);
      }
    }

    static async dueToday() {
      // FILL IN HERE TO RETURN ITEMS DUE tODAY
      try {
        const overdues = await Todo.findAll({
          where: {
            dueDate: {
              [Op.eq]: new Date(),
            },
            completed: false,
          },
        });
        return overdues;
      } catch (error) {
        console.log(error);
      }
    }

    static async dueLater() {
      // FILL IN HERE TO RETURN ITEMS DUE LATER
      try {
        const overdues = await Todo.findAll({
          where: {
            dueDate: {
              [Op.gt]: new Date(),
            },
            completed: false,
          },
        });
        return overdues;
      } catch (error) {
        console.log(error);
      }
    }

    static addTodo({ title, dueDate }) {
      return this.create({ title: title, dueDate: dueDate, completed: false });
    }

    static getTodos() {
      return this.findAll();
    }

    setCompletionStatus(completionStatus) {
      return this.update({
        completed: completionStatus,
      });
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
      title: DataTypes.STRING,
      dueDate: DataTypes.DATEONLY,
      completed: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Todo",
    }
  );
  return Todo;
};
