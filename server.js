const express = require('express');
const bodyParser = require('body-parser');
const Shop = require('./models').Shop;
const Coffee = require('./models').Coffee

// Shop.create({
//     name: 'Strabucks'
// }).then( shop => {
//     shop.createCoffee({
//         name: 'Columbian',
//         type: 'Dark'
//     }).then(() => console.log('Funcionó'));
// })

const app = express();
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('view engine', 'ejs');


//Shop.findAll({include: [Coffee]}).then(shps => console.log(shps))

app.get('/', async (req, res) => {
    try{
        const compras = await Shop.findAll({include: [Coffee]});
        res.render('landing', {compras: compras});
    } catch (err) {
        console.log(err);
        res.send('nok');
    }
});

app.get('/info/:id', async (req, res) => {
    try{
        const compra = await Shop.findAll({
            where: {
                id: req.params.id
            },
            include: [Coffee]
        });

        res.render('info', {compra: compra});
    } catch (err) {
        console.log(err);
        res.send(`NOK: ${err}`);
    }
});

app.get('/info/:id/modificar', async (req, res) => {
    res.render('modificar', {id: req.params.id});
});

app.post('/info/:id/modificar', async (req, res) => {
    try {
        const tipo = await Coffee.create({
            name: req.body.name,
            type: req.body.type,
            ShopId: req.params.id
        });
        console.log('Creado: ' + tipo);
        res.redirect(`/info/${req.params.id}`);
    } catch (err) {
        res.send(`Error: ${err}`);
    }
});

app.get("/add", (req, res) => {
    res.render("add");
});

app.post("/add", async (req, res) => {
    try {
        const added = Shop.create({
            name: req.body.name
        });
        console.log("Añadido correctamente");
        res.redirect('/');
    } catch (err) {
        res.send(`Error: ${err}`);
    }
    
    
});

app.listen(5000, () => console.log('Corriendo'));