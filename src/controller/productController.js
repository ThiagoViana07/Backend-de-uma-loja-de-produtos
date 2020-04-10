
const ValidationContract = require('../validators/fluent-validator')
const repository = require('../repositories/product-repository')

//Listando produtos
exports.get = async (req, res, next) => {
  try {
    var data = await repository.get();
    res.status(200).send(data);
  } catch (e) {
    res.status(500).send({
      message: 'Falha ao processar sua requisição'
    });
  }
}
// Listando produtos pela slug
exports.getBySlug = async (req, res, next) => {
  try {
    var data = await repository.getBySlug(req.params.slug);
    res.status(200).send(data);
  } catch (e) {
    res.status(500).send({
      message: 'Falha ao processar sua requisição'
    });
  }
}
//Listando produtos pelo ID
exports.getById = async (req, res, next) => {
  try {
    var data = await repository.getById(req.params.id)
    res.status(200).send(data);
  } catch (e) {
    res.status(500).send({
      message: 'Falha ao processar sua requisição'
    });
  }
}


exports.getByTag = async (req, res, next) => {
  try {
    var data = await repository.getByTag(req.params.tag)
    res.status(200).send(data);
  } catch (e) {
    res.status(500).send({
      message: 'Falha ao processar sua requisição'
    });
  }
}
//Criando um produto
exports.post = async (req, res, next) => {
  let contract = new ValidationContract();
  contract.hasMinLen(req.body.title, 3, 'O titulo deve conter pelo menos 3 caractéres');
  contract.hasMinLen(req.body.slug, 3, 'O titulo deve conter pelo menos 3 caractéres');
  contract.hasMinLen(req.body.description, 3, 'O titulo deve conter pelo menos 3 caractéres');

  if (!contract.isValid()) {
    res.status(400).send(contract.errors()).end()
    return;
  }

  await repository.create(req.body)
  try {
    res.status(201).send({
      message: 'Produto cadastrado com sucesso!'
    });
  } catch (e) {
    res.status(500).send({
      message: 'Falha ao processar sua requisição'
    });
  }
};
//Atualizando um produto
exports.put = async (req, res, next) => {
  await repository.update(req.params.id, req.body)
  try {
    res.status(200).send({
      message: 'Produto atualizado com sucesso'
    });
  } catch (e) {
    res.status(500).send({
      message: 'Falha ao processar sua requisição'
    });
  }
}

//Excluindo um produto
exports.delete = async (req, res, next) => {
  await repository.delete(req.body.id)
  try {
    res.status(200).send({
      message: 'Produto deletado com sucesso'
    });
  } catch (e) {
    res.status(500).send({
      message: 'Falha ao processar sua requisição'
    });
  }
}
