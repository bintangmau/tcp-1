import { Controller, HttpStatus, Logger, UsePipes } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { FavbetService } from 'src/favbets/favbets.service';
import { CreateFavbet, GetFavbet } from 'src/favbets/favbet.pipe'

@Controller('favbet')
export class FavbetController {

    private readonly logger: Logger = new Logger(FavbetController.name);

    constructor(
        private readonly favbetService: FavbetService
    ) { }

    @UsePipes(new CreateFavbet())
    @MessagePattern({ cmd: "createFavbet"})
    async createFavbet(payload: object) {
        return this.favbetService.createFavbet(payload)
    }

    @UsePipes(new GetFavbet())
    @MessagePattern({ cmd: "getFavbet" })
    async getFavbet(payload: object) {
        return this.favbetService.getFavbet(payload)
    }

}   