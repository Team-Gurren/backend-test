import type { Context, Hono } from "hono";
import { decode, sign, verify } from "hono/jwt";
import Config from "../../app/config/config.app";

interface JwtPayload {
	sub: number;
}

export const AssignJwt = (data: number) => {
	const payload = {
		sub: data,
		iat: Date.now(),
		exp: Date.now() + 60 * 60 * 1000,
	};

	const secret = Config.secretPayload;
	return sign(payload, secret, "HS512");
};

export const VerifyJwt = async (token: string) => {
	const decoded = await verify(token, Config.secretPayload, "HS512");
	return decoded;
};

export const DecodeJwt = async (token: string) => {
	const { header, payload } = decode(token);
	return { header, payload };
};

export const AuthMiddleware = (app: Hono) => {
	app.use(async (c: Context, next) => {
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
	});
};
