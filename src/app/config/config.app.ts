const Config = {
	port: Number(process.env.PORT),
	allowedHosts: String(process.env.ALLOWED_HOSTS).split(","),
	secretPayload: String(process.env.SECRET_PAYLOAD),
};

export default Config;
