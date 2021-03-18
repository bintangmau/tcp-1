import { ArgumentMetadata, Injectable, PipeTransform, Logger, HttpStatus } from '@nestjs/common';
import * as Joi from '@hapi/joi';
import { RpcException } from '@nestjs/microservices';
import { ResponseHelper } from 'src/common/helper/response';
import { join } from 'path';

@Injectable()
export class CreateSettings implements PipeTransform {

    transform(value: any, metadata: ArgumentMetadata) {
        const schema  = Joi.object({
            data: Joi.object({
                name: Joi.string().required(),
                games_id: Joi.number().min(1).required(),
                user: Joi.number().min(1).required(),
                rules: Joi.object().required(),
                commission: Joi.number().required(),
                isVerified: Joi.boolean().required()
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
export class UpdateSettings implements PipeTransform {

    transform(value: any, metadata: ArgumentMetadata) {
        const schema  = Joi.object({
            data: Joi.object({
                id: Joi.string().required(),
                rules: Joi.object(),
                commission: Joi.number(),
                name: Joi.string()
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
export class GetSettingOne implements PipeTransform {

    transform(value: any, metadata: ArgumentMetadata) {
        const schema  = Joi.object({
            data: Joi.object({
                id: Joi.string().required(),
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
export class GetSettingByUser implements PipeTransform {

    transform(value: any, metadata: ArgumentMetadata) {
        const schema  = Joi.object({
            data: Joi.object({
                user_id: Joi.array().required(),
                game_id: Joi.number().min(1).required()
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
export class GetSettingByGame implements PipeTransform {

    transform(value: any, metadata: ArgumentMetadata) {
        const schema  = Joi.object({
            data: Joi.object({
                agent_id: Joi.array().required(),
                game_id: Joi.number().min(1).required(),
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
export class CreateTables implements PipeTransform {

    transform(value: any, metadata: ArgumentMetadata) {
        const schema  = Joi.object({
            data: Joi.object({
                game_id: Joi.number().min(1).required(),
                user_id: Joi.number().min(1).required(),
                setting_id: Joi.string().required(),
                name: Joi.string().required(),
                type: Joi.string().required(),
                key: Joi.string().required()
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
export class UpdateTables implements PipeTransform {

    transform(value: any, metadata: ArgumentMetadata) {
        const schema  = Joi.object({
            data: Joi.object({
                id: Joi.number().min(1).required(),
                name: Joi.string().required(),
                type: Joi.string().required()
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
export class GetTableById implements PipeTransform {

    transform(value: any, metadata: ArgumentMetadata) {
        const schema  = Joi.object({
            data: Joi.object({
                id: Joi.number().min(1).required()
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
export class BetHistory implements PipeTransform {

    transform(value: any, metadata: ArgumentMetadata) {
        const schema  = Joi.object({
            data: Joi.object({
                from: Joi.string(),
                to: Joi.string(),
                tableType: Joi.string().required()
            }).required()
        })

        const { error} = schema.validate(value);
        if (error) {
            throw new RpcException (ResponseHelper.error(HttpStatus.BAD_REQUEST, 'Validation failed', error.message));
        }
    
        return value
    }

} 