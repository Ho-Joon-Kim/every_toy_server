import Sequelize from 'sequelize';

import thread from './thread';

module.exports = (Sequelize, sequelize) => {
	return {
    thread: thread(Sequelize, sequelize)
	};
};