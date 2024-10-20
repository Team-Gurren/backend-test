import type { Context, Hono } from "hono";
import { decode, sign, verify } from "hono/jwt";
import Config from "../../app/config/config.app";
import { basicAuth } from "hono/basic-auth";

interface JwtPayload {
	sub: number;
}

export const AssignJwt = (data: number) => {
    const payload = {
        sub: data,
        iat: Math.floor(Date.now() / 1000), 
        exp: Math.floor(Date.now() / 1000) + 60 * 60, 
    };

    const secret = Config.secretPayload;
    return sign(payload, secret, "HS512");
};


export const VerifyJwt = async (token: string) => {
	try {
		const decoded = await verify(token, Config.secretPayload, "HS512");
		return decoded;
	} catch (error) {
		console.error("JWT Verification Error:", error);
		throw new Error("Invalid token");
	}
};

export const DecodeJwt = async (token: string) => {
	const { header, payload } = decode(token);
	return { header, payload };
};

export const AuthMiddleware = (app: Hono) => {
	return async (c: Context, next: () => Promise<void>) => {
		const token = c.req.header("Authorization")?.replace("Bearer ", "");
		if (token) {
			try {
				const payload = await VerifyJwt(token);
				c.set("user", payload.sub);
			} catch (error) {
				return c.json({ message: "Unauthorized" }, 401);
			}
		} else {
			return c.json({ message: "Authorization token not provided" }, 401);
		}
		await next();
	};
};
export const AuthAdminMiddleware = (app: Hono) => {
	return app.use(
		basicAuth({
			verifyUser: (username, password, c) => {
				return username === "admin" && password === "admin";
			},
		}),
	);
};
