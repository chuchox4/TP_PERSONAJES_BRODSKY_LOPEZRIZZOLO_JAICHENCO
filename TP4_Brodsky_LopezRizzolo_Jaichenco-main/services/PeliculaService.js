import config from '../dbconfig.js'
import sql from 'mssql';

class PeliculaService {
    static getAll = async () => {
        let returnEntity = null;
        console.log('Estoy en: PeliculaService.GetAll');
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
                .query('SELECT * FROM pelicula');
            returnEntity = result.recordsets[0];
        } catch (error) {
            console.log(error);
        }
        return returnEntity;
    }
    static getById = async (id) => {
        {
            let returnEntity = null;
            //console.log(`Estoy en: peliculaService.GetById ${id}`);
            try {
                let pool = await sql.connect(config);
                let result = await pool.request()
                    .input('pId', sql.Int, id)
                    .query('SELECT * FROM pelicula WHERE id = @pId');
                returnEntity = result.recordsets[0][0];
            } catch (error) {
                console.log(error);
            }
            return returnEntity;

        }
    }

    static insert = async(pelicula) =>{
            let rowsAffected = 0;
            console.log('Estoy en: peliculaService.insert(pelicula)');
            try{
                let pool = await sql.connect(config);
                let result = await pool.request()
                    .input('pImagen',pelicula.Imagen)
                    .input('pTitulo',pelicula.Titulo)
                    .input('pFechaDeCreacion',pelicula.FechaDeCreacion)
                    .input('pCalificacion',pelicula.Calificacion)
                    .query('INSERT INTO pelicula (Imagen, Titulo, FechaDeCreacion ,Calificacion) VALUES (@pImagen, @pTitulo, @pFechaDeCreacion, @pCalificacion)');
                rowsAffected = result.rowsAffected;
            } catch (error) {
                console.log(error)
            }
            return rowsAffected;
            } 
            /*
            IdPelicula;
            Imagen;
            Titulo;
            FechaDeCreacion;
            Calificacion;
            */
    
    static update = async (pelicula) => {
        let rowsAffected = 0;
        const{Id,Nombre,LibreGluten,Importe,Descripcion} = pelicula;
           
            console.log('Estoy en: peliculaService.update(pelicula)');
            try{
                let pool = await sql.connect(config);
                let result = await pool.request()
                    .input('pId', Id)
                    .input('pNombre',Nombre)
                    .input('pLibreGluten',LibreGluten)
                    .input('pImporte',Importe)
                    .input('pDescripcion',Descripcion)

                    .query('UPDATE pelicula SET Nombre = @pNombre , LibreGluten= @pLibreGluten, Importe = @pImporte, Descripcion = @pDescripcion WHERE id = @pId;');
                rowsAffected = result.rowsAffected;
            } catch (error) {
                console.log(error)
            }
            return rowsAffected;
            }
        
            static deleteById = async (id) => {
            let rowsAffected = 0;
            console.log('Estoy en: peliculaService.deleteById(id)');
            try {
                let pool = await sql.connect(config);
                let result = await pool.request()
                    .input('pId', sql.Int, id)
                    .query('DELETE FROM pelicula WHERE id = @pId');
                rowsAffected = result.rowsAffected;
            } catch (error) {
                console.log(error)
            }
            return rowsAffected;

        }


    }
    export default PeliculaService;
