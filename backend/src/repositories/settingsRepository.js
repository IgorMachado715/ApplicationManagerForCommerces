const settingsModel = require('../models/settingsModel');
const bcrypt = require('bcryptjs');

const settingsCache = {};
async function getSettingsDecrypted(id) {
  let settings = settingsCache[id];

  if (!settings) {
    settings = await getSettings(id);
    settings.secretKey = crypto.decrypt(settings.secretKey);
    settingsCache[id] = settings;
  }

  return settings;
}

function clearSettingsCache(id) {
    settingsCache[id] = null;
  }
  

  function getSettingsByEmail(email) {
    return settingsModel.findOne({ where: { email } });
  }
  
  function getSettings(id) {
    return settingsModel.findOne({ where: { id } });
  }

  
async function getDefaultSettings() {
    const settings = await settingsModel.findOne({
      where: { id: process.env.DEFAULT_SETTINGS_ID || 1 },
    });
    return getSettingsDecrypted(settings.id);
  }

async function updateSettings(id, newSettings){
    const currentSettings = await getSettings(id);

    if (newSettings.email && newSettings.email !== currentSettings.email)
    currentSettings.email = newSettings.email;

    if (newSettings.password)
    currentSettings.password = bcrypt.hashSync(newSettings.password);

    await currentSettings.save();

    clearSettingsCache(id);
}

module.exports = {
    getSettingsByEmail,
    getSettings,
    updateSettings,
    getDefaultSettings,
    getSettingsDecrypted,
}