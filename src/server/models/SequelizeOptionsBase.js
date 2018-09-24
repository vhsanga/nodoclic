'use strict'
let DataTypes = require('sequelize/lib/data-types');

class SequelizeOptionsBase {
    constructor() {
        this.timestamps = false
    }
}

export default SequelizeOptionsBase;