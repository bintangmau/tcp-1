import { Injectable, Inject, Logger, InternalServerErrorException, HttpStatus } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { SettingDocument, Settinggames } from 'src/games/schemas/setting.schema';
import { TransactionDocument, Transactions } from 'src/games/schemas/transaction.schema'; 
import { TableDto } from './dto/tables.dto';
import { TablesEntity } from './tables.entity';
import { HttpErrorException } from 'src/common/exception/http-error-exception'

@Injectable()
export class GameService {

    private readonly logger: Logger = new Logger(GameService.name);

    constructor(
        @Inject('TABLE_REPOSITORY') private tableRepository: typeof TablesEntity,
        @InjectModel(Settinggames.name) private settingModel: Model<SettingDocument> ,
        @InjectModel(Transactions.name) private transactionModel: Model<TransactionDocument>
    ) { }

    async createSetting(payload: object) {
        const create = new this.settingModel(payload["data"])
        return this.settingModel.find({
            name: payload["data"]["name"]
        })
        .then((res) => {
            if(res.length > 0) {
                return 0
            }
            return create.save()
            .then((result) => {
                return result;
            })
            .catch((err) => {
                return err;
            })
        }).catch((error) => {
            return error;
        })
    }

    async updateSetting(payload: object) {
        const { id, commission, rules, name } = await payload["data"];
        return await this.settingModel.findByIdAndUpdate(id, 
            { name, commission, rules }, 
            { new: true, useFindAndModify: false 
        })
        .then((result) => {
            return {
                data: result,
                status: "success"
            }
        })
        .catch((err) => {
            return {
            message: err,
                status: "failed"
            }
        })
    }

    async getSetttingOne(payload: object) {
        const { id } = await payload["data"];
        return await this.settingModel.findOne({_id: id})
        .then((result) => {
            if(!result) {
                return {message: "Data not found", status: false}
            }
            return {data: result, status: "OK"}
        })
        .catch((err) => {
            return err;
        })
    }

    async getSettings() {
        return await this.settingModel.find()
        .then((result) => {
            if(!result) {
                return {message: "Data not found", status: false}
            }
            return {data: result, status: "OK"}
        })
        .catch((err) => {
            return err;
        })
    }

    async getSettingByUser(payload: object) {
        const { user_id, game_id } = await payload["data"];
        let where = {
            games_id: game_id,
        }
        let arr = []
        await user_id.map((val) => {
            arr.push(val.id)
        })
        where["user"] = {
            "$in" : arr
        }
        return this.settingModel.find(where)
        .then((result) => {
            if(!result[0]) {
                return {message: "Data not found", status: false}
            }
            return {data: result, status: "success"}
        })
        .catch((err) => {
            return err;
        })
    }

    async getSettingByAgent(payload: object) {
        const { agent_id, game_id } = await payload['data'];
        return this.settingModel.find({
            user: agent_id,
            games_id: game_id
        })
        .then((result) => {
            if(!result[0]) {
                return {message: "Data not found", status: "failed"}
            }
            return {data: result, status: "success"}
        })
        .catch((err) => {
            this.logger.error(err.message)
            throw new InternalServerErrorException
        })
    }

    async getSettingByGame(payload: object) {
        const { agent_id, game_id } = await payload["data"]
        let where = {
            games_id: game_id,
        }
        let arr = []
        await agent_id.map((val) => {
            arr.push(val.id)
        })
        where["user"] = {
            "$in" : arr
        }
        return this.settingModel.find(where)
        .then((result) => {
            if(!result[0]) {
                return {message: "Data not found", status: false}
            }
            return {data: result, status: "OK"}
        })
        .catch((err) => {
            return err;
        })
    } 

    async createTable(payload: TableDto) {
        const { user_id, game_id, setting_id, name, type, key } = await payload["data"]
        let getTable = await this.tableRepository.findAll({
            where: {
                game_id,
                setting_id,
                name,
                type
            },
            attributes: ["id"]
        })
        if(getTable[0]) {
            return {message: "Table type & name used!", status: "failed"}
        }
        return this.tableRepository.create<TablesEntity>({
            user_id,
            game_id,
            setting_id,
            name,
            type,
            key
        })
        .then((result) => {
            return {data: result, status: "success"}
        })
        .catch((err) => {
            return {err: err, status: "failed"}
        })
    }

    async updateTable(payload: TableDto) {
        const { id, name, type } = await payload["data"]
        return this.tableRepository.update<TablesEntity>({
            name,
            type
        }, { where: {
            id
        }})
        .then((result) => {
            if(!result[0]) {
                return {message: "Update failed", status: "failed"}
            }
            return {data: payload["data"], status: "success"};
        })
        .catch((err) => {
            return err;
        })
    }

    async getTables() {
        return this.tableRepository.findAll()
        .then((result) => {
            if(result.length === 0) {
                return {message: "Data not found", status: "failed"}
            }
            return {data: result, status: "success"}
        })
        .catch((err) => {
            return {message: err, status: "failed"}
        })
    }

    async getTableByAgent(payload: object) {
        const { id_agent, game_id } = payload["data"]
        let arr = []
        await id_agent.map((val) => {
            arr.push(val.id)
        })
        let sql = `SELECT * FROM Tables WHERE user_id IN (${arr}) AND game_id = ${game_id};`
        return this.tableRepository.sequelize.query(sql)
        .then((result) => {
            return result
        })
        .catch((err) => {
            this.logger.error(err.message)
            throw new InternalServerErrorException
        })
    }

    async getTableById(payload: TableDto) {
        const { id } = payload["data"]
        return this.tableRepository.findOne({
            where: {
                id
            }
        })
        .then((result) => {
            if(!result) {
                return {message: "Data not found", status: "failed"}
            }
            return {data: result, status: "success"}
        })
        .catch((err) => {
            return {message: err, status: "failed"}
        })
    }

    async betHistory(payload: object) {
        const { from, to, tableType, user } = await payload["data"]
        let usersId = []
        let userData = {}
        let tableData = {}
        let tables = await this.tableRepository.findAll({ attributes: [ "key", "name" ]})
        for (var i = 0; i < user.length; i++) {
            usersId.push(user[i]["id"])
        }
        let where = {
            tableType,
            userId: { $in: usersId }
        }
        if(from && to) {
            where["createdAt"] = {
                $gte: new Date(from),
                $lt: new Date(to)
            }    
        }
        for (var i = 0; i< tables.length; i ++) {
            let key = tables[i]["key"].toString()
            tableData[key] = {
                name: tables[i]["name"]
            }
        }
        for (var u = 0; u < user.length; u++) {
            let key = user[u]["id"].toString()
            userData[key] = {
                username: user[u]["username"],
                displayName: user[u]["displayName"] 
            }
        }
        return this.transactionModel.aggregate([
            { $match: where },
            {
                $project:{
                    round: "$round",
                    userId: "$userId",
                    tableType: "$tableType",
                    typeChoices: "$typeChoice",
                    choice: "$choice",
                    bet: "$bet",
                    isWin: "$betWin",
                    createdAt: "$createdAt",
                    settleAt: "",
                    ticketId: "$_id",
                    commission: "$commission",
                    tableKey: "$tableKey",
                    gamesType: "$gameType",
                }
            }
        ])
        .then((result) => {
            for (var i = 0; i < result.length; i++) {
                let key = result[i]["userId"].toString()
                let key_table = result[i]["tableKey"].toString()
                result[i]["userId"] = userData[key]["username"]
                result[i]["displayName"] = userData[key]["displayName"]
                result[i]["tableName"] = tableData[key_table]["name"]
                delete result[i]["_id"]
                delete result[i]["tableKey"]
            }   
            return result;
        })
        .catch((err) => {
            return err.message;
        })
    }

    async betHistorybyDate(payload: object) {
        const { date, tableType, user } = await payload["data"]
        let usersId = []
        let userData = {}
        let tableData = {}
        let tables = await this.tableRepository.findAll({ attributes: [ "key", "name" ]})
        for (var i = 0; i < user.length; i++) {
            usersId.push(user[i]["id"])
        }
        let to = new Date(date)
        to.setDate(to.getDate() + 1)
        let where = {
            userId: { $in: usersId },
            tableType,
            createdAt: { $gte: new Date(date), $lt: new Date(to) }
        }
        for (var i = 0; i< tables.length; i ++) {
            let key = tables[i]["key"].toString()
            tableData[key] = {
                name: tables[i]["name"]
            }
        }
        for (var u = 0; u < user.length; u++) {
            let key = user[u]["id"].toString()
            userData[key] = {
                username: user[u]["username"],
                displayName: user[u]["displayName"] 
            }
        }
        return this.transactionModel.aggregate([
            { $match: where },
            {
                $project:{
                    round: "$round",
                    userId: "$userId",
                    tableType: "$tableType",
                    typeChoices: "$typeChoice",
                    choice: "$choice",
                    bet: "$bet",
                    isWin: "$betWin",
                    createdAt: "$createdAt",
                    settleAt: "",
                    ticketId: "$_id",
                    commission: "$commission",
                    tableKey: "$tableKey",
                    gamesType: "$gameType",
                }
            }
        ])
        .then((result) => {
            for (var i = 0; i < result.length; i++) {
                let key = result[i]["userId"].toString()
                let key_table = result[i]["tableKey"].toString()
                result[i]["userId"] = userData[key]["username"]
                result[i]["displayName"] = userData[key]["displayName"]
                result[i]["tableName"] = tableData[key_table]["name"]
                delete result[i]["_id"]
                delete result[i]["tableKey"]
            }   
            return result
        })
        .catch((err) => {
            return err;
        })
    }

    async betHistoryDashboard(payload: object) {    
        const { lastWeek, now, childs, game_type, user } = payload["data"]
        let usersId = []
        let userData = {}
        let where = {}
        let arr = []
        await childs.map((val) => {
            arr.push(val.id)
        })
        for (var u = 0; u < user.length; u++) {
            let key = user[u]["id"].toString()
            userData[key] = {
                username: user[u]["username"],
                displayName: user[u]["displayName"] 
            }
        }
        where["userId"] = {
            "$in" : arr
        }
        where["createdAt"] = {
            $gte: new Date(lastWeek),
            $lt: new Date(now)
        }
        where["gameType"] = game_type
        this.logger.log(where)
        return this.transactionModel.aggregate([
            { $match: where },
            {
                $project:{
                    commission: "$commission",
                    status: "$status",
                    betLose: "$betLose",
                    betWin: "$betWin",
                    userId: "$userId",
                    tableKey: "$tableKey",
                    round: "$round",
                    typeChoice: "$typeChoice",
                    choice: "$choice",
                    bet: "$bet",
                    gameType: "$gameType",
                    tableType: "$tableType",
                    createdAt: {$dateToString: {format: "%G-%m-%d %H:%M:%S",date: "$createdAt"}},
                    updatedAt: {$dateToString: {format: "%G-%m-%d %H:%M:%S",date: "$updatedAt"}},
                }
            }
        ])
        .then((result) => {
            this.logger.log(result.length, "RESULT")
            if(!result[0]) {
                // throw new HttpErrorException(HttpStatus.NOT_FOUND, {'bet history data not found'})
                return []
            }
            for (var i = 0; i < result.length; i++) {
                let key = result[i]["userId"].toString()
                result[i]["username"] = userData[key]["username"]
                result[i]["displayName"] = userData[key]["displayName"]
            }   
            return result
        })
        .catch((err) => {
            return err.message
        })
    }

    async betHistoryCount(payload: object) {
        const { game_type, lastWeek, now } = payload["data"]
        let where = {  
            "createdAt": {
                $gte: new Date(lastWeek),
                $lt: new Date(now)
            }
        }

        let dateList = await this.transactionModel.aggregate([
            { $match: where },
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } }
                }
            }
        ])
        for (let i = 0; i < dateList.length; i++) {
            let counts = await this.transactionModel.aggregate([
                { $match: { createdAt: { $gte: new Date(dateList[i]["_id"]) } } },
                { $group : {_id: "$gameType", count: { $sum: 1 } } }
            ])
            dateList[i]['date'] = dateList[i]['_id'];
            dateList[i]["counts"] = counts;
            delete dateList[i]["_id"]
        }
        return dateList
    }

}
