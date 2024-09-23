const Config = {
	port: Number(process.env.PORT),
	allowedHosts: String(process.env.ALLOWED_HOSTS).split(","),
};

export default Config;
