const mongoose = require('mongoose')
const Product = mongoose.model('Product')

//Listando produtos
exports.get = (req, res, next) =>{
  Product
  .find({
    active:true
  }, 'title price slug')
  .then(data => {
    res.status(200).send(data);
  }).catch(e => {
      res.status(400).send(e);
  });
}
// Listando produtos pela slug
exports.getBySlug = (req, res, next) =>{
  Product
  .findOne({
    slug:req.params.slug,
    active:true
  }, 'title price slug description tags')
  .then(data => {
    res.status(200).send(data);
  }).catch(e => {
      res.status(400).send(e);
  });
}
//Listando produtos pelo ID
exports.getById = (req, res, next) =>{
  Product
    .findById(req.params.id)
    .then(data => {
    res.status(200).send(data);
  }).catch(e => {
      res.status(400).send(e);
  });
}

exports.getByTag = (req, res, next) =>{
  Product
  .find({
    tags:req.params.tag,
    active:true
  }, 'title price slug description tags')
  .then(data => {
    res.status(200).send(data);
  }).catch(e => {
      res.status(400).send(e);
  });
}


//Criando um produto
exports.post = (req, res, next) => {
  var product = new Product(req.body);
  product
    .save()
    .then(x => {
      res.status(201).send({
        message: 'Produto cadastrado com sucesso!'
      });
    }).catch(e => {
        res.status(400).send({
          message: 'Falha ao cadastrar o produto',
          data: e
        });
    });
};
//Atualizando um produto
exports.put = ('/:id', (req, res, next) => {
  Product
  .findByIdAndUpdate(req.params.id,{
    $set:{
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      slug: req.body.slug
    }
  })
  .then(data => {
    res.status(200).send({
      message:'Produto atualizado com sucesso'
    });
  }).catch(e => {
      res.status(400).send({
        message: 'Falha ao atualizar produto',
        data: e
      });
  });
});

//Excluindo um produto
exports.delete = ('/', (req, res, next) => {
  Product
  .findOneAndRemove(req.body.id)
  .then(data => {
    res.status(200).send({
      message:'Produto Removido com sucesso'
    });
  }).catch(e => {
      res.status(400).send({
        message: 'Falha ao remover produto',
        data: e
      });
  });

});