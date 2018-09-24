'use strict'
let DataTypes = require('sequelize/lib/data-types');

class SequelizeAttributesBase {

    constructor() {
        this.id = {
            type: DataTypes.BIGINT,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        };

        this.eliminado = {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        };

        this.fec_insert = {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        };

        this.fec_update = {
            type: DataTypes.DATE,
            allowNull: true
        };

        this.ip_insert = {
            type: DataTypes.STRING(60),
            allowNull: false,
            defaultValue: 'unknown'
        };

        this.ip_update = {
            type: DataTypes.STRING(60),
            allowNull: true
        };

        this.usu_insert = {
            type: DataTypes.STRING(60),
            allowNull: false,
            defaultValue: 'unknown'
        };

        this.usu_update = {
            type: DataTypes.STRING(60),
            allowNull: true
        }
    }
}

export default SequelizeAttributesBase;
