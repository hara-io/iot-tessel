var config = {
  ambient: {
    port: "A"
  },
  relay: {
    port: "B"
  },
  request: {
    host: 'localhost',
    port: '3000',
    authorization : 'Basic dGVzc2VsOnRlc3NlbDEyMw==',
    apiList: '/tessel/device/list/',
    apiSave: '/tessel/ambient/save/'
  },
  wifi: {
    network: '#####',
    pass: '#####',
    security: 'wpa2'
  }
};

module.exports = config;
