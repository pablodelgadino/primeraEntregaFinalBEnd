import express from 'express'
import Manager from '../controllers/cart.manager.js'
const router = express.Router()
const manager = new Manager()

let isAdmin = false


router.get('/', (req, res) => {
    manager.findAll()
        .then(result => res.send(result))
        .catch(err => res.send({error: 0, description: err}))
})

router.get('/:id/productos', (req, res) => {
    if(isNaN(req.params.id)) return res.status (404).send({error:-2, descripcion: `ruta ${req.baseUrl} ${req.url} metodo ${req.method} no implementada`});
    manager.findById(req.params.id)
        .then(result => res.send(result))
        .catch(err => res.send({error: 0, description: err}))
})


router.post('/', (req, res) => {
    if(!isAdmin)  return res.send({error:-1, descripcion: `ruta ${req.baseUrl} ${req.url} metodo ${req.method} no implementada`});
    if(!req.body.nombre || !req.body.descripcion || !req.body.codigo || !req.body.foto || !req.body.precio || !req.body.stock)  return res.send({error:-1, descripcion: `ruta ${req.baseUrl} ${req.url} metodo ${req.method} no implementada`});
    manager.create(req.body)
        .then(result => res.send(result))
        .catch(err => res.send({error: 0, description: err}))
})

router.put('/:id/productos', (req, res) => {
    if(!isAdmin)  return res.send({error:-1, descripcion: `ruta ${req.baseUrl} ${req.url} metodo ${req.method} no implementada`});
    if(isNaN(req.params.id)) return res.status (404).send({error:-2, descripcion: `ruta ${req.baseUrl} ${req.url} metodo ${req.method} no implementada`});
    if(!req.body.nombre || !req.body.descripcion || !req.body.codigo || !req.body.foto || !req.body.precio || !req.body.stock)  return res.send({error:-1, descripcion: `ruta ${req.baseUrl} ${req.url} metodo ${req.method} no implementada`});
    manager.update(req.params.id, req.body)
        .then(result => res.send(result))
        .catch(err => res.send({error: 0, description: err}))
})


router.delete('/:id/productos/:id_prod', (req, res) => {
    if(!isAdmin)  return res.send({error:-1, descripcion: `ruta ${req.baseUrl} ${req.url} metodo ${req.method} no implementada`});
    if(!req.body.nombre || !req.body.descripcion || !req.body.codigo || !req.body.foto || !req.body.precio || !req.body.stock)  return res.send({error:-1, descripcion: `ruta ${req.baseUrl} ${req.url} metodo ${req.method} no implementada`});
    manager.delete(req.params.id)
        .then(result => res.send(result))
        .catch(err => res.send({error: 0, description: err}))
})

export default router
