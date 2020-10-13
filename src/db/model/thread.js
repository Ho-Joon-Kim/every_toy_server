module.exports = (Sequelize, sequelize) => {
  const thread = sequelize.define('thread', {

    num: {//고유 번호
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },

    category: {//카테고리
      type: Sequelize.INTEGER,
      allowNull: false
    },

    title: {//제목
      type: Sequelize.STRING(30),
      allowNull: false
    },

    content: {//내용
      type: Sequelize.TEXT,
      allowNull: false
    },

    like: {//좋아요
      type: Sequelize.INTEGER,
      defaultValue: 0
    },

    dislike: {//싫어요
      type: Sequelize.INTEGER,
      defaultValue: 0
    },

    date: {//만들어진 날짜
      type: Sequelize.DATE,
      defaultValue: Sequelize.fn('now')
    }

  }, 
  {freezeTableName: true});
 
  thread.sync();
  return thread;
};