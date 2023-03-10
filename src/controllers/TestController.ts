import { ObjectId } from "mongodb";
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
import { Inject, Singleton } from "typescript-ioc";
import { User, UserAdminStatus } from "../models/TestModel";
import { UserService, UserCreationParams } from "../services/TestService";

@Route("user")
export class UserController extends Controller {
    @Inject
    private userService: UserService;

    constructor(){
        super()
        this.userService = new UserService();
    }

    @Get("{id}")
    public async getUser(
        @Path() id: string,
    ): Promise<User> {
        return this.userService.get(id);
    };
    @SuccessResponse("201", "Retrieved user with id ${id}")

    @Get()
    public async getAllUsers(): Promise<Array<User>> {
        console.log("Get all Users");
        return this.userService.getAllUser();
    };
    @SuccessResponse("201", "Retrieved user array")

    @Post()
    public async createUser(
        @Body() requestBody: UserCreationParams
    ): Promise<void> {
        this.setStatus(201);
        this.userService.create(requestBody);
        return;
    };

    @SuccessResponse("201", "Updated User")
    @Put("updateAdmin")
    public async updateUserAdmin(
        @Query() id: string,
        @Query() status: UserAdminStatus
    ): Promise<void> {
        this.userService.updateAdminStatus(id, status);
        return;
    }
};