// pages-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const pages = new Schema(
    {
      title: { type: String, required: true },
      parent: [Schema.Types.Mixed],
      emoji: { type: String, default: ':page_facing_up:' },
      imgCover: {
        type: String,
        default: 'https://images.metmuseum.org/CRDImages/ep/web-large/DP346474.jpg',
      },
      blocks: { type: Array, default: [] },
    },
    {
      timestamps: true,
    });

  return mongooseClient.model('pages', pages);
};
