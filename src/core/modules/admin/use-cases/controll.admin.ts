import AdminServices from "../admin.services";

const Services = new AdminServices();

export async function ControlAdminSelling(control: boolean) {
	await Services.SellingControll(control);
	return { message: control ? "Vendas on" : "Vendas off" };
}
