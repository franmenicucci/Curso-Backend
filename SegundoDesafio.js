const fs = require('fs');

class ProductManager {
  constructor(filePath) {
    this.path = filePath;
    this.products = [];
    this.loadProducts();
  }

  loadProducts() {
    try {
      const data = fs.readFileSync(this.path, 'utf8');
      this.products = JSON.parse(data);
      ProductManager.id = this.products.length > 0 ? this.products[this.products.length - 1].id : 0;
    } catch (error) {
      // Si hay un error (por ejemplo, si el archivo no existe), no hace nada
    }
  }

  saveProducts() {
    fs.writeFileSync(this.path, JSON.stringify(this.products, null, 2), 'utf8');
  }

  addProduct(title, description, price, thumbnail, code, stock) {
    const existingProduct = this.products.find(product => product.code === code);

    if (existingProduct) {
      console.log(`El código ${code} se encuentra repetido. Este producto no puede ser agregado.`);
      return;
    }

    const newProduct = {
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
    };

    if (!Object.values(newProduct).includes(undefined)) {
      ProductManager.id++;
      this.products.push({ ...newProduct, id: ProductManager.id });
      this.saveProducts();
      console.log('Producto agregado correctamente.');
    } else {
      console.log('Es necesario completar todos los campos.');
    }
  }

  getProducts() {
    return this.products;
  }

  exist(id) {
    return this.products.find(product => product.id === id);
  }

  getProductById(id) {
    const product = this.exist(id);
    !product ? console.log('Not Found') : console.log(product);
  }

  updateProduct(id, updatedFields) {
    const productIndex = this.products.findIndex(product => product.id === id);

    if (productIndex !== -1) {
      this.products[productIndex] = { ...this.products[productIndex], ...updatedFields };
      this.saveProducts();
      console.log('Producto actualizado correctamente.');
    } else {
      console.log('Producto con el ID especificado no encontrado.');
    }
  }

  deleteProduct(id) {
    const updatedProducts = this.products.filter(product => product.id !== id);
    if (updatedProducts.length < this.products.length) {
      this.products = updatedProducts;
      this.saveProducts();
      console.log('Producto eliminado correctamente.');
    } else {
      console.log('Producto con el ID especificado no encontrado.');
    }
  }
}

const productos = new ProductManager('productos.json');

// Productos que fueron agregados manualmente.
productos.addProduct('Pisa', 'cafe intenso', 750, 'image1', 'abc123', 10);
productos.addProduct('Napoli', 'cafe suave', 750, 'image2', 'abc124', 10);
productos.addProduct('Firenze', 'cafe aromatico', 750, 'image3', 'abc125', 10);
productos.addProduct('Milan', 'cafe suave', 750, 'image4', 'abc126', 10);
productos.addProduct('Tirrenia', 'cafe suave', 750, 'image5', 'abc127', 10);

// Segundo llamado. Ya aquí el array con productos.
console.log(productos.getProducts());

// Chequeo de si el 'code' se encuentra repetido o no.
productos.addProduct('Milan', 'cafe suave', 750, 'image4', 'abc126', 10);

// Busqueda de productos mediante id.
productos.getProductById(3);
