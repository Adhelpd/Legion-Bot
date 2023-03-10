import { ObjectId } from "mongodb";
import { UnitCreationParams, UnitService } from "../services/UnitService";
import {
    Body,
    Controller,
    Get,
    Path,
    Post,
    Put,
    Query,
    Route,
    SuccessResponse,
} from "tsoa";

import { Unit } from "../models/UnitModel";
import { Inject } from "typescript-ioc";


@Route("unit")
export class UnitController extends Controller {
    @Inject
    private unitService: UnitService;

    constructor(){
        super();
        this.unitService = new UnitService();
    }

    // @Get("{id}")
    // public async getU

    @Get()
    @SuccessResponse("201", "Successful Search")
    public async getAllUnits():Promise<Array<Unit>|null> {
        // this.setStatus(201);
        return await this.unitService.getAllUnit()
    };

    @Get("{id}")
    @SuccessResponse("201", "Retrieved User")
    public async searchUserAdmin(id:string): Promise<Array<Unit>> {
        return await this.unitService.searchUnitAdmin(id);
    }

    @Get('search/{shorthand}')
    @SuccessResponse("201", "Searched units")
    public async searchShorthand(shorthand: string): Promise<Array<Unit>> {
        return await this.unitService.searchUnitShorthand(shorthand);
    };

    @Put('update/editor/')
    @SuccessResponse("201", "Sucessfully updated")
    public async updateUserEditor(
        @Query() adminId: string,
        @Query() addId: string,
        @Query() status: boolean,
    ): Promise<void> {
        this.unitService.updateUserEditor(adminId, addId, status);
    };

    @Put('update/adminEditor/')
    @SuccessResponse("201", "Successfully updated")
    public async adminUpdateUserEditor (
        @Query() groupName: string,
        @Query() addId: string,
        @Query() status: boolean
    ): Promise<void> {
        this.unitService.adminUpdateUserEditor(groupName, addId, status);
    }

    @SuccessResponse("201", "Created")
    @Post("{requestBody}")
    public async createUnit(
        @Body() requestBody: UnitCreationParams,
        // @Path("{test}") unit : Unit
    ): Promise<Unit|null> {
        this.setStatus(201);
        return await this.unitService.create(requestBody).catch( error=>{
            console.log("error createUnit", error);
            return null
        })
    };
};