class ProductManager { 
    constructor(){
        this.products = []
    }

    static id = 0

    addProduct(title, description, price, thumbnail, code, stock){
        for (let i = 0; i < this.products.length; i++) {
            if(this.products[i].code === code) {
                console.log(`El codigo ${code} se encuentra repetido `);
                break;
            }
        }
        
        const newProduct = {title, description, price, thumbnail, code, stock,}


        if (!Object.values(newProduct).includes(undefined)){
            ProductManager.id++
            this.products.push({...newProduct, id: ProductManager.id,})
        }else {
            console.log('Es necesario completar todos los campos');
        }
        
    }

    getProduct(){
        return this.products
    }

    exist(id){
        return this.products.find((producto)=> producto.id === id)
    }

    getProductById(id){
       !this.exist(id) ? console.log('Not Found') : console.log(this.exist(id));
    }
}

const productos = new ProductManager
//Primer llamado, arreglo vacio.


//Productos que fueron agregados manualmente.
productos.addProduct('Pisa', 'cafe intenso', 750, 'image1', 'abc123', 10)
productos.addProduct('Napoli', 'cafe suave', 750, 'image2', 'abc124', 10)
productos.addProduct('Firenze', 'cafe aromatico', 750, 'image3', 'abc125', 10)
productos.addProduct('Milan', 'cafe suave', 750, 'image4', 'abc126', 10)
productos.addProduct('Tirrenia', 'cafe suave', 750, 'image5', 'abc127', 10)


//Segundo llamado. Ya aqui el array con productos.
console.log(productos.getProduct());


//Chequeado de si el 'code' se encuentra repetido o no.
//productos.addProduct('Milan', 'cafe suave', 750, 'image4', 'abc126', 10)


//Busqueda de productos mediante id.
productos.getProductById(3);
