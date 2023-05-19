import express from "express";
import peliculaService from "./services/peliculaService.js";
import personajeService from "./services/personajeService.js";

const app = express();
const port = 3000;
app.use(express.json());
app.get('/', (req,res) => {
    res.send('Hello World bro');
})

app.listen (port, () =>{
    console.log(`Escuchando puerto ${port}`);
})
//------------------------------------------------------------Personaje----------------------------------------------------------------
//GET ALL 
app.get('/personaje', async (req,res) => {
    let personaje = await personajeService.getAll();
    res.status(200).send(personaje)
})
// GET BY ID
app.get('/personaje/:id', async (req,res) => {
    let personaje = await personajeService.getById(req.params.id);
    res.status(200).send(personaje)
})
// INSERT
app.post('/personaje', async(req,res) =>{

    console.log("En post, req:", req)
    try{
        await personajeService.insert(req.body)
        res.status(200).json({message : 'personaje creada'});
    } catch (error){
        console.error(error);
        res.status(500).json({error:'Fallo el insert browli'});
    }
})
//UPDATE
app.put('/personaje',async (req,res) => {
    console.log("En update, req:", req)
    try{
        await personajeService.update(req.body)
        res.status(200).json({message : 'personaje actualizada'});
    } catch (error){
        console.error(error);
        res.status(500).json({error:'Fallo el insert browli'});
    }
})  

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
//
app.delete ('/personaje/:id',async (req,res) => {
    console.log("En delete, req:", req)
    try{
        await personajeService.deleteById(req.params.id)
        res.status(200).json({message : 'personaje eliminada'});
    } catch (error){
        console.error(error);
        res.status(500).json({error:'Fallo el insert browli'});
    }
})
//---------------------------------------------Pelicula------------------------------------------------------
//GET ALL 
app.get('/pelicula', async (req,res) => {
    let pelicula = await peliculaService.getAll();
    res.status(200).send(pelicula)
})
// GET BY ID
app.get('/pelicula/:id', async (req,res) => {
    let pelicula = await peliculaService.getById(req.params.id);
    res.status(200).send(pelicula)
})
// INSERT
app.post('/pelicula', async(req,res) =>{

    console.log("En post, req:", req)
    try{
        await               Service.insert(req.body)
        res.status(200).json({message : 'pelicula creada'});
    } catch (error){
        console.error(error);
        res.status(500).json({error:'Fallo el insert browli'});
    }
})
//UPDATE
app.put('/pelicula',async (req,res) => {
    console.log("En update, req:", req)
    try{
        await peliculaService.update(req.body)
        res.status(200).json({message : 'pelicula actualizada'});
    } catch (error){
        console.error(error);
        res.status(500).json({error:'Fallo el insert browli'});
    }
})
//
app.delete ('/pelicula/:id',async (req,res) => {
    console.log("En delete, req:", req)
    try{
        await peliculaService.deleteById(req.params.id)
        res.status(200).json({message : 'pelicula eliminada'});
    } catch (error){
        console.error(error);
        res.status(500).json({error:'Fallo el insert browli'});
    }
})


