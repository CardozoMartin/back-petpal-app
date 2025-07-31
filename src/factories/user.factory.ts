import { UserControllers } from "../controllers/user.controllers";
import { UserRepository } from "../repositories/user.repositories";
import { UserService } from "../services/user.services";

export class DependencyFactory {
    private static userRepository: UserRepository;
    private static userService: UserService;
    private static userController: UserControllers;

    static getUserController(): UserControllers {
        if (!this.userController) {
            this.userController = new UserControllers(this.getUserService());
        }
        return this.userController;
    }

    static getUserService(): UserService {
        if (!this.userService) {
            this.userService = new UserService(this.getUserRepository());
        }
        return this.userService;
    }

    static getUserRepository(): UserRepository {
        if (!this.userRepository) {
            this.userRepository = new UserRepository();
        }
        return this.userRepository;
    }
}