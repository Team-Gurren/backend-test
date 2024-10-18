import AdminServices from "../admin.services";

const services = new AdminServices();

export async function ControlAdminSelling(control: boolean) {
	await services.SellingControll(control); 
	return { message: control ? "Vendas on" : "Vendas off" };
}
