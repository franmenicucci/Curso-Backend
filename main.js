class ProductManager { 
    constructor(){
        this.products = []
    }

    static id = 0

    addProduct(title, description, price, thumbnail, code, stock){
        // Aplicacion de Array.find para buscar si el código ya existe, como fue pedido en la correccion. 
        const existingProduct = this.products.find(product => product.code === code);

        if (existingProduct) {
            console.log(`El código ${code} se encuentra repetido. Este producto no puede ser agregado.`);
            return;
        }

        const newProduct = { title, description, price, thumbnail, code, stock };

        if (!Object.values(newProduct).includes(undefined)) {
            ProductManager.id++
            this.products.push({ ...newProduct, id: ProductManager.id });
            console.log('Producto agregado correctamente.');
        } else {
            console.log('Es necesario completar todos los campos.');
        }
    }

    getProduct(){
        return this.products;
    }

    exist(id){
        return this.products.find(product => product.id === id);
    }

    getProductById(id){
       const product = this.exist(id);
       !product ? console.log('Not Found') : console.log(product);
    }
}

const productos = new ProductManager();

// Productos que fueron agregados manualmente.
productos.addProduct('Pisa', 'cafe intenso', 750, 'image1', 'abc123', 10);
productos.addProduct('Napoli', 'cafe suave', 750, 'image2', 'abc124', 10);
productos.addProduct('Firenze', 'cafe aromatico', 750, 'image3', 'abc125', 10);
productos.addProduct('Milan', 'cafe suave', 750, 'image4', 'abc126', 10);
productos.addProduct('Tirrenia', 'cafe suave', 750, 'image5', 'abc127', 10);

// Segundo llamado. Ya aquí el array con productos.
console.log(productos.getProduct());

// Chequeado de si el 'code' se encuentra repetido o no.
productos.addProduct('Milan', 'cafe suave', 750, 'image4', 'abc126', 10);

// Busqueda de productos mediante id.
productos.getProductById(3);
