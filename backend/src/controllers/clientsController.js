const clientsRepository = require('../repositories/clientsRepository');

async function getClient(req, res, next) {
    const id = req.params.id;
    const client = await clientsRepository.getClient(id);
    res.json(client);
  }

async function getClients(req, res, next) {
    const name = req.params.name && req.params.name.toUpperCase() && req.params.name.toLowerCase();
    const page = parseInt(req.query.page);
    const result = await clientsRepository.getClients(name, page || 1);
    res.json(result);
  }

async function insertClient(req, res, next) {
    const newClient = validateClient(req.body);
    const savedClient = await clientsRepository.insertClient(newClient);
  
    res.status(201).json(savedClient.get({ plain: true }));
  }

async function updateClient(req, res, next) {
    const id = req.params.id;
    const newClient = validateClient(req.body);
  
    const currentClient = await clientsRepository.getClient(id);
  
    const oldIndexes = currentClient.indexes
      ? currentClient.indexes.split(",")
      : [];
  
    const updatedClient = await clientsRepository.updateClient(id, newClient);
  
    res.json(updatedClient);
  }

async function deleteClient(req, res, next) {
    const id = req.params.id;  
    await clientsRepository.deleteClient(id);
  
    res.sendStatus(204);
  }

async function getClientSettings(req, res, next){
    const id = res.locals.token.id;
    const client = await clientsRepository.getClientSettings(id);
    res.json(client);
}

async function updateClientSettings(req, res, next){
    const id = res.locals.token.id;
    const newClientSettings = req.body;
    await clientsRepository.updateClient(id, newClientSettings);
    res.sendStatus(200);

}

function validateClient(newClient) {
    
    return newClient;
  }

module.exports = {
    getClientSettings,
    updateClientSettings,
    getClient,
    getClients,
    insertClient,
    updateClient,
    deleteClient,
}