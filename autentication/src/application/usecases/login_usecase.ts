
class LoginUseCase {
    private readonly authRepository: AuthRepository;
    constructor(authRepository: AuthRepository) {
        this.authRepository = authRepository;
    }
}