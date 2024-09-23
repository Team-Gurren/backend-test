import { expect, describe, it } from "@jest/globals";
import request from "supertest";

const apiUrl = "http://localhost:3000";
const userId = 4;

describe("Rota aluno", () => {
	it("Deve retornar o aluno com id", async () => {
		const response = await request(apiUrl).get(`/user/${userId}`);
		expect(response.status).toBe(200);
		expect(response.body).toEqual({
			id: expect.any(Number),
			userId: expect.any(Number),
			name: "Pedro",
			lastName: "Silva",
			age: 20,
			class: "10A",
		});
	});

	it("Deve criar um novo aluno", async () => {
		const newUser = {
			userId: 7,
			name: "Jane",
			lastName: "Doe",
			age: 25,
			class: "10B",
			password: "securePassword",
		};
		const response = await request(apiUrl).post("/user").send(newUser);
		expect(response.status).toBe(201);
		expect(response.body.user).toEqual({
			id: expect.any(Number),
			userId: newUser.userId,
			name: newUser.name,
			lastName: newUser.lastName,
			age: newUser.age,
			class: newUser.class,
		});
	});

	it("Deve atualizar o aluno com id 6", async () => {
		const updatedUser = {
			name: "John",
			lastName: "Smith",
			age: 31,
			class: "10C",
		};
		const response = await request(apiUrl)
			.put(`/user/${userId}`)
			.send(updatedUser);
		expect(response.status).toBe(200);
		expect(response.body).toEqual({
			id: expect.any(Number),
			userId: expect.any(Number),
			...updatedUser,
		});
	});

	it("Deve deletar o aluno com id 6", async () => {
		const response = await request(apiUrl).delete(`/user/${userId}`);
		expect(response.status).toBe(204);
		expect(response.text).toBe("");
	});
});
