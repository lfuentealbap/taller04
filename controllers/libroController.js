var Libro = require('../modelos/libro.js');

//Guarda un libro
function guardar(req,res){

    try{
      
        let libro = new Libro()
        libro.nombre = req.body.nombre
        libro.anio = req.body.anio
        libro.idioma = req.body.idioma
        libro.autor = req.body.autor

        libro.save((err, librostore) => {
    
            if (err) return res.status(400).send({mensaje:`Error al intentar guardar en base de datos> ${err}`})
    
            res.status(200).send({ libro: librostore })
    
        })
    } catch (error) {
        res.status(500).send({ mensaje: `error:` + error })
    }
    }
    //Lista todos los libros
    function listarTodo(req,res)
    {
        Libro.find({}, (err, libros) => {
            if (err) return res.status(500).send({ message: 'error al realizar la peticion' })
            res.status(200).send({ libros })
        })
    }
    //Lista un libro por id
    function listar(req,res)
    {
        let idlibro = req.params.id
        Libro.findById(idlibro, (err, libro) => {
            if (err) return res.status(500).send({ message: 'error al realizar la peticion' })
            if (!libro) return res.status(404).send({ message: 'Error la persona no existe' })
    
            res.status(200).send({ libro })
        })
    }
    //modifica un libro por id y atributos en el body
    function modificar(req, res){

        let idlibro = req.params.id
        nombre = req.body.nombre
        anio = req.body.anio
        idioma = req.body.idioma
        autor = req.body.autor

        console.log(req.body)
        console.log(idlibro)

        Libro.findByIdAndUpdate(idlibro, {nombre: nombre, anio:anio, idioma: idioma, autor: autor}, (err, libro)=> {
            if(err) res.status(500).send('Internal Error');

            if(!libro) res.status(404).send('Not Found');

            res.status(200).send({
                message: 'Editado Correctamente',
                data: libro
            });
        })
    }

    //Elimina un libro por id
    function eliminar(req, res){
        let idlibro = req.params.id

        Libro.findByIdAndDelete(idlibro, (err) => {
            if (err) res.status(500).send('Internal Error');

            res.status(200).send({
                message: 'Eliminado'
            });
        }) 
    }
    
    module.exports = {
        guardar,
        listar,
        listarTodo,
        modificar, 
        eliminar
    };