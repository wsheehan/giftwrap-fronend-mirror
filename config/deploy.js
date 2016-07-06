module.exports = function(deployTarget) {  
  return {
    pagefront: {
      app: 'giving',
      key: process.env.PAGEFRONT_KEY
    }
  };
};
