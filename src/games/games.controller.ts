import { Controller, HttpStatus, Logger, UsePipes } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { 
    BetHistory,
    CreateSettings, 
    CreateTables, 
    GetSettingByGame, 
    GetSettingByUser, 
    GetSettingOne, 
    GetTableById, 
    UpdateSettings, 
    UpdateTables } from 'src/games/games.pipe';
import { GameService } from 'src/games/games.service'
import { SettingDto } from './dto/settings.dto';
import { TableDto } from './dto/tables.dto';

@Controller('game')
export class GameController {

    private readonly logger: Logger = new Logger(GameController.name);
    
    constructor(
        private readonly gameService: GameService
    ) { }

    @UsePipes(new CreateSettings())
    @MessagePattern({ cmd: "createSetting" })
    async createSetting(payload: object) {
        return this.gameService.createSetting(payload)
    }

    @UsePipes(new UpdateSettings())
    @MessagePattern({ cmd: "updateSetting"})
    async updateSetting(payload: object) {
        return this.gameService.updateSetting(payload)
    }

    @UsePipes(new GetSettingOne())
    @MessagePattern({ cmd: "getSettingOne"})
    async getSettingOne(payload: object) {
        return this.gameService.getSetttingOne(payload)
    }

    @MessagePattern({ cmd: "getSettings" })
    async getSettings() {
        return this.gameService.getSettings()
    }

    @UsePipes(new GetSettingByUser())
    @MessagePattern({ cmd: "getSettingsByUser"})
    async getSettingByUser(payload: SettingDto) {
        return this.gameService.getSettingByUser(payload)
    }

    @MessagePattern({ cmd: "getSettingByAgent" })
    async getSettingByAgent(payload: object) {
        return this.gameService.getSettingByAgent(payload)
    }

    @UsePipes(new GetSettingByGame())
    @MessagePattern({ cmd: "getSettingsByGame"})
    async getSettingByGame(payload: SettingDto) {
        return this.gameService.getSettingByGame(payload)
    }

    @UsePipes(new CreateTables())
    @MessagePattern({ cmd: "createTable"})
    async createTable(payload: TableDto) {
        return this.gameService.createTable(payload)
    }   

    @UsePipes(new UpdateTables())
    @MessagePattern({ cmd: "updateTable"})
    async updateTable(payload: TableDto) {
        return this.gameService.updateTable(payload)
    }

    @MessagePattern({ cmd: "getTables"})
    async getTables() {
        return this.gameService.getTables()
    }

    @MessagePattern({ cmd: 'getTableByAgent' })
    async getTableByAgent(payload: object) {
        return this.gameService.getTableByAgent(payload)
    }

    @UsePipes(new GetTableById())
    @MessagePattern({ cmd: "getTableById"})
    async getTableById(payload: TableDto) {
        return this.gameService.getTableById(payload)
    }

    @MessagePattern({ cmd: "betHistory" })
    async betHistory(payload: object) {
        return this.gameService.betHistory(payload)
    }

    @MessagePattern({ cmd: 'betHistorybyDate' })
    async betHistorybyDate(payload: object) {
        return this.gameService.betHistorybyDate(payload)
    }

    @MessagePattern({ cmd: "betHistoryDashboard"}) 
    async betHistoryDashboard(payload: object) {
        return this.gameService.betHistoryDashboard(payload)
    }

    @MessagePattern({ cmd: "betHistoryCount" })
    async betHistoryCounct(payload: object) {
        return this.gameService.betHistoryCount(payload)
    }
}