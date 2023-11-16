import fs from "fs"

export class ProductManager{
    constructor(filename){
        this.path = filename
        if(fs.existsSync(filename)){
            try{
                let products = fs.readFileSync(filename, "utf-8")

                this.products = JSON.parse(products)
            }catch(error){
                this.products = [];
            }
        }else{
            this.products = [];
            fs.writeFileSync(filename, JSON.stringify(this.products,null,"\t"))
        }
    }

    async saveFile(){
        try{
            await fs.promises.writeFile(this.path, JSON.stringify(this.products,null,"\t"))
            return true
        }catch(error){
            console.log(error);
            return false
        }
    }

    verificarMaxId (array){ 
        let maxId = 0
        console.log(array.length)
        for (let index = 0; index < array.length; index++) {
            const element = array[index];
            if (element.id > maxId) { 
                maxId = element.id
            }
        }
        return maxId
    }

    async addProducts(product) {
        
        
        if(!product.title || !product.description || !product.price || !product.thumbnail || !product.code || !product.stock){
            console.error("Todos los campos son obligatorios")
            return 
        }
        
        const codeExist= this.products.find(p => p.code === product.code)
        if(codeExist){
            console.error("El producto con el mismo codigo ya existe");
            return
        }

        product.id = this.verificarMaxId(this.products) + 1
        this.products.push(product);

        const respuesta = await this.saveFile()

        if(respuesta){
            console.log("Producto cargado");
        }else{
            console.log("Hubo un error al cargar el producto");
        }
    }

   
        getProducts() {
      
        return this.products
        }

    getProductsById(id){
        const product = this.products.find(product => product.id === id)
       
            if(!product){
                return 'Producto no encontrado'
            }else{
                return product
            }
    }


    async updateProduct({id, ...newValues}) {
        try {
            const index = this.products.findIndex(product => product.id === id);
    
            if (index === -1) {
                console.log("Producto no encontrado");
            } else {
                this.products[index] = {...this.products[index], ...newValues}
                await this.saveFile()
            }
        } catch (error) {
            console.log(error);
        }
    }

    async deleteProduct(id){
        try {
            const index = this.products.findIndex(product => product.id === id)

            if(index === -1){
              console.log("No encontrado" );
            }else{
                console.log(this.products)
                this.products = this.products.filter((product)=> product.id != id )
                await this.saveFile()
            }
        }catch(error){
            console.log(error);
        }
    }
}


class Product{

    constructor(
        title,
        description,
        price,
        thumbnail,
        code,
        stock
    ){
        this.title=title
        this.description=description
        this.price=price
        this.thumbnail= thumbnail
        this.code=code
        this.stock=stock
    }
    
}


const product1= new Product("Producto 1", "Descripcion", 240 ,"-", "1", 23)

const product2= new Product("Producto 2", "Descripcion", 250,"-", "2", 21)

const product3= new Product("Producto 3", "Descripcion", 224,"-", "3", 23)
const product4= new Product("Producto 4", "Descripcion", 224,"-", "4", 23)
const product5= new Product("Producto 5", "Descripcion", 224,"-", "5", 23)
const product6= new Product("Producto 6", "Descripcion", 224,"-", "7", 23)


const prueba1 = new ProductManager("Productos.json")

const test = async () =>
{
    await prueba1.addProducts(product1);

    await prueba1.addProducts(product2);

    await prueba1.addProducts(product3);
    await prueba1.addProducts(product4);
    await prueba1.addProducts(product5);
    await prueba1.addProducts(product6);


}

// test()


