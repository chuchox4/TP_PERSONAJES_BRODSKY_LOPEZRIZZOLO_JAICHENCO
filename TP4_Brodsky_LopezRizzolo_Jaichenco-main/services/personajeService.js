import config from '../dbconfig.js'
import sql from 'mssql';

class personajeService {
    static getAll = async () => {
        let returnEntity = null;
        console.log('Estoy en: personajeService.GetAll');
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
                .query('SELECT * FROM personaje');
            returnEntity = result.recordsets[0];
        } catch (error) {
            console.log(error);
        }
        return returnEntity;
    }
    static getById = async (id) => {
        {
            let returnEntity = null;
            //console.log(`Estoy en: personajeService.GetById ${id}`);
            try {
                let pool = await sql.connect(config);
                let result = await pool.request()
                    .input('pId', sql.Int, id)
                    .query('SELECT * FROM personaje WHERE IdPersonaje = @pId');
                returnEntity = result.recordsets[0][0];
            } catch (error) {
                console.log(error);
            }
            return returnEntity;

        }
    }

    static insert = async(personaje) =>{
            let rowsAffected = 0;
            console.log('Estoy en: personajeService.insert(personaje)');
            try{
                let pool = await sql.connect(config);
                let result = await pool.request()
                    .input('pNombre',personaje.Nombre)
                    .input('pImagen',personaje.Imagen)
                    .input('pEdad',personaje.Edad)
                    .input('pPeso',personaje.Peso)
                    .input('pHistoria',personaje.Historia)
                    .query('INSERT INTO personaje (Nombre, Imagen, Edad, Peso , Historia) VALUES (@pNombre, @pImagen, @pEdad, @pPeso, @pHistoria)');
                rowsAffected = result.rowsAffected;
            } catch (error) {
                console.log(error)
            }
            return rowsAffected;
            } 
    
    static update = async (personaje) => {
        let rowsAffected = 0;
        const{IdPersonaje,Nombre,Imagen,Edad,Peso,Historia} = personaje;
            console.log('Estoy en: personajeService.update(personaje)');
            try{
                let pool = await sql.connect(config);
                let result = await pool.request()
                    .input('pId', IdPersonaje)
                    .input('pNombre',Nombre)
                    .input('pImagen',Imagen)
                    .input('pEdad',Edad)
                    .input('pPeso',Peso)
                    .input('pHistoria',Historia)

                    .query('UPDATE personaje SET Nombre = @pNombre ,Imagen = @pImagen , Edad= @pEdad, Peso = @pPeso, Historia = @pHistoria WHERE IdPersonaje = @pId;');
                rowsAffected = result.rowsAffected;
            } catch (error) {
                console.log(error)
            }
            return rowsAffected;
            }

        /*
static update = async (pizza) => {
        let rowsAffected = 0;
        const{Id,Nombre,LibreGluten,Importe,Descripcion} = pizza;
           
            console.log('Estoy en: PizzaService.update(pizza)');
            try{
                let pool = await sql.connect(config);
                let result = await pool.request()
                    .input('pId', Id)
                    .input('pNombre',Nombre)
                    .input('pLibreGluten',LibreGluten)
                    .input('pImporte',Importe)
                    .input('pDescripcion',Descripcion)

                    .query('UPDATE Pizzas SET Nombre = @pNombre , LibreGluten= @pLibreGluten, Importe = @pImporte, Descripcion = @pDescripcion WHERE id = @pId;');
                rowsAffected = result.rowsAffected;
            } catch (error) {
                console.log(error)
            }
            return rowsAffected;
            }
*/
        
            static deleteById = async (id) => {
            let rowsAffected = 0;
            console.log('Estoy en: personajeService.deleteById(id)');
            try {
                let pool = await sql.connect(config);
                let result = await pool.request()
                    .input('pId', sql.Int, id)
                    .query('DELETE FROM personaje WHERE IdPersonaje = @pId');
                rowsAffected = result.rowsAffected;
            } catch (error) {
                console.log(error)
            }
            return rowsAffected;

        }


    }
    export default personajeService;
