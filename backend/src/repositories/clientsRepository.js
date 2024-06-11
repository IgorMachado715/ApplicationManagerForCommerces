const clientsModel = require('../models/clientsModel');
const Sequelize = require("sequelize");

async function clientExists(rg, cpf) {
  const count = await clientsModel.count({ where: { rg, cpf } });
  return count > 0;
}

async function getClientById(id) {
  const client = await clientsModel.findOne({
    where: { id }
  });
  return client;
}
  
  function getClient(id) {
    return clientsModel.findByPk(id);
  }

  async function getOneClient(name, cpf) {
    const client = await clientsModel.findOne({
      where: { name, cpf },
    });
    return client;
  }

  function getClients(name, page = 1) {
    const options = {
      where: {},
      order: [
        ["name", "ASC"],
      ],
      limit: 10,
      offset: 10 * (page - 1),
      distinct: true,
    };

    if (name) {
      if (name.length < 6)
        options.where = { name: { [Sequelize.Op.like]: `%${name}%` } };
      else options.name = { name };
    }
  
    return clientsModel.findAndCountAll(options);
  }

  async function insertClient(newClient) {
    const alreadyExists = await clientExists(
      newClient.rg,
      newClient.cpf
    );
    if (alreadyExists)
      throw new Error(`Already exists a client with this CPF and/or RG.`);
    return clientsModel.create(newClient);
  }
  
  function deleteClient(id) {
    return clientsModel.destroy({
      where: {id},
    });
  }


async function updateClient(id, newClients){
    const currentClient = await getClient(id);

    if (newClients.email && newClients.email !== currentClient.email)
    currentClient.email = newClients.email;

    if (newClients.name && newClients.name !== currentClient.name)
    currentClient.name = newClients.name;

    if (newClients.phone && newClients.phone !== currentClient.phone)
    currentClient.phone = newClients.phone;

    if (newClients.address && newClients.address !== currentClient.address)
    currentClient.address = newClients.address;

    await currentClient.save();
    return currentClient;

}

module.exports = {
    getClient,
    updateClient,
    getClients,
    insertClient,
    deleteClient,
    getOneClient,
    getClientById
}