interface AuthRepository {
    // Define methods related to authentication
    login(email: string, password: string): Promise<string>;
    register(email: string, password: string): Promise<string>;
    validateToken(token: string): Promise<boolean>;
    logout(token: string): Promise<boolean>;
}