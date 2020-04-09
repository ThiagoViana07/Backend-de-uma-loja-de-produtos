const mongoose = require('mongoose')
const Product = mongoose.model('Product')
const ValidationContract = require('../validators/fluent-validator')
const repository = require('../repositories/product-repository')

//Listando produtos
exports.get = (req, res, next) => {
  repository
    .get()
    .then(data => {
      res.status(200).send(data);
    }).catch(e => {
      res.status(400).send(e);
    });
}
// Listando produtos pela slug
exports.getBySlug = (req, res, next) => {
  repository
    .getBySlug(req.params.slug)
    .then(data => {
      res.status(200).send(data);
    }).catch(e => {
      res.status(400).send(e);
    });
}
//Listando produtos pelo ID
exports.getById = (req, res, next) => {
  repository
    .getById(req.params.id)
    .then(data => {
      res.status(200).send(data);
    }).catch(e => {
      res.status(400).send(e);
    });
}

exports.getByTag = (req, res, next) => {
  repository
    .getByTag(req.params.tag)
    .then(data => {
      res.status(200).send(data);
    }).catch(e => {
      res.status(400).send(e);
    });
}

//Criando um produto
exports.post = (req, res, next) => {
  let contract = new ValidationContract();
  contract.hasMinLen(req.body.title, 3, 'O titulo deve conter pelo menos 3 caractéres');
  contract.hasMinLen(req.body.slug, 3, 'O titulo deve conter pelo menos 3 caractéres');
  contract.hasMinLen(req.body.description, 3, 'O titulo deve conter pelo menos 3 caractéres');

  if (!contract.isValid()) {
    res.status(400).send(contract.errors()).end()
  }
  repository
    .create(req.body)
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
  repository
    .update(req.params.id, req.body)
    .then(x => {
      res.status(200).send({
        message: 'Produto atualizado com sucesso'
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
  repository
    .delete(req.body.id)
    .then(x => {
      res.status(200).send({
        message: 'Produto Removido com sucesso'
      });
    }).catch(e => {
      res.status(400).send({
        message: 'Falha ao remover produto',
        data: e
      });
    });

});