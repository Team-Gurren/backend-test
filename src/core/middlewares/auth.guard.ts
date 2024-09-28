import { Jwt } from "hono/utils/jwt";
import Config from "../../app/config/config.app";

function authGuard(userId: number) {
	return Jwt.sign({ userId }, Config.secretPayload, "HS256");
}

export default authGuard;
