const fs = require('fs');
const path = require('path')
const filePath = path.resolve(__dirname, "../products.json");

class Contenedor {
	constructor(file) {
		this.file = file;
	}

	async validateExistFile() {
		try {
			await fs.promises.stat(`${this.file}`)
		} catch (err) {
			await fs.promises.writeFile(`${this.file}`, JSON.stringify([]));
		}
	}

	async readFileFn() {
		await this.validateExistFile();
		const container = await fs.promises.readFile(`${this.file}`, 'utf-8');
		return JSON.parse(container);
	}

	async writeProducts(products) {
		await this.validateExistFile();
		const data = JSON.stringify(products, null, 4)
		await fs.promises.writeFile(this.file, data)
	}

	async exists(id) {
		const data = await this.getAll()
		const indice = data.findIndex(product => product.id == id)
		// if(indice < 0){
		// 	return false;
		// } else {
		// 	return true;
		// }
		return indice >= 0;
	}

	async save(element) {
		
		if (!element.title || typeof element.title !== 'string' || !element.price) throw new Error('Invalid data');

		const data = await this.readFileFn();
		let id = 1;

		if (data.length) {
			//Si tengo elementos en mi array
			id = data[data.length - 1].id + 1;
		}

		const newProduct = {
			title: element.title,
			price: parseInt(element.price),
			id: id,
		};

		data.push(newProduct);

		await this.writeProducts(data)
		console.log(`New product saved, N° ID: ${newProduct.id}`);

		return newProduct.id;
	}

	//getAll(): Object[] - Devuelve un array con los objetos presentes en el archivo.
	async getAll() {
		try {
			const data = this.readFileFn();
			return data

		} catch {
			console.log('Error getting all data');
		}
	}


	//getById(Number): Object - Recibe un id y devuelve el objeto con ese id, o null si no está.
	async getById(id) {
		const data = await this.readFileFn()
		const idProduct = data.find((product) => product.id === id);

		if (!idProduct) throw new Error("There is no such product");

		return idProduct;

	}



	async updateById(id, updateProduct) {
		const exist = await this.exists(id);
		if (!exist) throw new Error(`There is no item with ID ${id}`)

		const products = await this.getAll()
		const productId = products.findIndex(product => product.id == id)

		const oldProduct = products[productId]

		const changeProduct = {
			id: oldProduct.id,
			title: updateProduct.title,
			price: updateProduct.price
		}

		products.splice(productId, 1, changeProduct)

		await this.writeProducts(products)
		return changeProduct

	}

	// deleteById(Number): void - Elimina del archivo el objeto con el id buscado.
	async deleteById(id) {
		const data = await this.readFileFn()

		const productId = data.findIndex((product) => product.id === id);

		if (productId < 0) {
			throw new Error('The product does not exist');
		}

		data.splice(productId, 1);

		await this.writeProducts(data)

	}

	async deleteAll() {
		await this.writeProducts([])
	}
}



const instanciaProductsApi = new Contenedor(filePath)

module.exports = {
	ProductsController: instanciaProductsApi
} 