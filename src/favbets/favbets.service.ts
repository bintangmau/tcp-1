import { Injectable, Inject, Logger } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { FavbetDocument, Favbets } from 'src/favbets/schemas/favbets.schema';

@Injectable()
export class FavbetService {

    private readonly logger: Logger = new Logger(FavbetService.name);

    constructor(
        @InjectModel(Favbets.name) private favbetModel: Model<FavbetDocument> 
    ) { }

    async createFavbet(payload: object) {
        const playerId = payload["data"]["player_id"]
        const tableKey = payload["data"]["table_key"]
        const index = payload["data"]["list_favourite"][0]["index"]
        const list_favourite = payload["data"]["list_favourite"] 
        const pattern = payload["data"]["list_favourite"][0]["pattern"]
        let findFavbet = await this.favbetModel.findOne({
            player_id: playerId,
            table_key: tableKey
        }).select('_id');

        let findFavbet2 = await this.favbetModel.findOne({
            player_id: playerId,
            table_key: tableKey,
            'list_favourite.index': index
        }).select('_id');

        if(!findFavbet) {
            const create = new this.favbetModel(payload["data"])
            return create.save()
            .then((result) => {
                return {data: result, status: "success"}
            })
            .catch((err) => {
                return {message: err, status: "failed"}
            })
        } 

        if(!findFavbet2) {  
            return this.favbetModel.updateMany(
                { player_id: playerId, table_key: tableKey },
                { $addToSet: { list_favourite: list_favourite  } }
            )
            .then((result) => {
                return {data: list_favourite, status: "success"}
            })
            .catch((err) => {
                return {message: err, status: "failed"}
            })
        } 

        return this.favbetModel.updateOne(
            { _id: findFavbet2["_id"], 'list_favourite': { $elemMatch: { index }} },
            { $set: { 'list_favourite.$.pattern' :  pattern  } },
            { new: true }
        )
        .then((result) => {
            if(result["n"] === 0) {
                return {message: "Update failed", status: "failed"}
            } 
            if(result["nModified"] === 0) {
                return {message: "Nothing to update", status: "failed"}
            }
            return {data: list_favourite, status: "success"}
        })
        .catch((err) => {
            return {message: err, status: "failed"}
        })

    }

    async getFavbet(payload: object) {
        return await this.favbetModel.findOne({
            player_id: payload["data"]["player_id"],
            table_key: payload["data"]["table_key"]
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

}