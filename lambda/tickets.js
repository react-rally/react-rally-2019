const axios = require('axios');

exports.handler = function(event, context, callback) {
  axios
    .get('https://api.tito.io/v3/trace-events/react-rally-2019/releases', {
      headers: {
        Authorization: 'Token token=' + process.env.TITO_ACCESS_TOKEN,
      },
    })
    .then(res => {
      res.data.releases = res.data.releases
        ? res.data.releases.filter(r => !r.secret)
        : res.data.data
            .filter(r => !r.attributes.secret)
            .map(r => ({
              title: r.attributes.title,
              description: r.attributes.description,
              price: r.attributes.price,
              start_at: r.attributes['start-at'],
              sold_out: r.attributes['sold-out'],
            }));

      delete res.data.data;

      callback(null, {
        statusCode: res.status,
        headers: res.headers,
        body: JSON.stringify(res.data),
      });
    })
    .catch(err => {
      callback(err, {
        statusCode: 500,
        body: null,
      });
    });
};
