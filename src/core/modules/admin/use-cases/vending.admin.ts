import AdminServices from "../admin.services";

const Services = new AdminServices();

export async function VendingAdmin() {
	const vending = await Services.IsSelling();

	if (!vending) {
		return { message: "Vendas off" };
	}

	return { message: "Vendas on" };
}
