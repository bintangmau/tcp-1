import { ArgumentMetadata, Injectable, PipeTransform, Logger, HttpStatus } from '@nestjs/common';
import * as Joi from '@hapi/joi';
import { RpcException } from '@nestjs/microservices';
import { ResponseHelper } from 'src/common/helper/response';

@Injectable()
export class CreateFavbet implements PipeTransform {

    transform(value: any, metadata: ArgumentMetadata) {
        const schema  = Joi.object({
            data: Joi.object({
                player_id: Joi.number().min(1).required(),
                table_key: Joi.string().min(1).required(),
                list_favourite: Joi.alternatives()
                .try(Joi.array(), Joi.object())
            }).required()
        })

        const { error} = schema.validate(value);
        if (error) {
            throw new RpcException (ResponseHelper.error(HttpStatus.BAD_REQUEST, 'Validation failed', error.message));
        }
    
        return value
    }

} 

@Injectable()
export class GetFavbet implements PipeTransform {

    transform(value: any, metadata: ArgumentMetadata) {
        const schema  = Joi.object({
            data: Joi.object({
                player_id: Joi.number().min(1).required(),
                table_key: Joi.string().min(1).required()
            }).required()
        })

        const { error} = schema.validate(value);
        if (error) {
            throw new RpcException (ResponseHelper.error(HttpStatus.BAD_REQUEST, 'Validation failed', error.message));
        }
    
        return value
    }

} 
