import { Query, Resolver } from "@nestjs/graphql";
import { AppService } from "./app.service";

@Resolver()
export class AppResolver { 

    constructor(
        private appService: AppService
    ) {}

    @Query(() => String, { name: 'getHello' }) 
    getHello() {
        return this.appService.getHello()
    }

}