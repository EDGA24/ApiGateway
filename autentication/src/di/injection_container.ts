class InjectionContainer {

    private readonly authRepository: AuthRepository;
    private readonly loginUseCase: LoginUseCase;
    constructor() {
        this.authRepository = new AuthRepositoryImpl();
        this.loginUseCase = new LoginUseCase(this.authRepository);
    }

    init() {
        console.log("Dependency Injection Container initialized.");
    }
}