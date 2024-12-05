import { AuthResponseType } from "@/types/auth.response.type";
import { RefreshTokenResponseType } from "@/types/refresh-token.response.type";
import { User } from "@/types/user.type";

export class AuthService {
    baseUrl: string = "https://dummyjson.com/auth";
    expirationTime: number = 120;

    /**
     * Iniciar sesión con el email y la contraseña
     * @param {string} username El nombre de usuario del usuario
     * @param {string} password La contraseña del usuario
     * @returns {Promise<User>} Una promesa que resuelve al usuario
     */
    async login(username: string, password: string): Promise<AuthResponseType> {
        try {
            const response = await fetch(`${this.baseUrl}/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password, expiresInMins: this.expirationTime }),
            });
            if (!response.ok) {
                throw new Error(`Error logging in: ${response.statusText}`);
            }
            const data = await response.json();

            localStorage.setItem("accessToken", data.accessToken);
            localStorage.setItem("refreshToken", data.refreshToken);

            return data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async currentUser(): Promise<User> {
        try {
            const response = await this.fetchWithRefresh(`${this.baseUrl}/me`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                },
            });
            if (!response.ok) {
                throw new Error(`Error fetching current user: ${response.statusText}`);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async refreshToken(): Promise<RefreshTokenResponseType> {
        try {
            const response = await fetch(`${this.baseUrl}/refresh`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ refreshToken: localStorage.getItem("refreshToken"), expiresInMins: this.expirationTime }),
            });
            if (!response.ok) {
                throw new Error(`Error refreshing token: ${response.statusText}`);
            }
            const data = await response.json();

            localStorage.setItem("accessToken", data.accessToken);
            localStorage.setItem("refreshToken", data.refreshToken);

            return data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    private async fetchWithRefresh(url: string, options: RequestInit): Promise<Response> {
        let response = await fetch(url, options);
        if (response.status === 401) {
            // Token might be expired, try to refresh it
            await this.refreshToken();
            // Retry the original request with the new token
            options.headers = {
                ...options.headers,
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
            };
            response = await fetch(url, options);
        }
        return response;
    }
}