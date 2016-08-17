var Track = require('../models').track;

module.exports = function* () {
  var trackId = this.query.track_id;
  var pageId = this.query.page_id;
  var title = this.query.title;
  var referrer = this.query.referrer;
  var userInfo = this.query.user_info;
  var teamToken = this.query.team_token;

  if (trackId && pageId) {
    var track = yield Track.findOne({track_id: trackId, page_id: pageId});
    if (track) {
      track.updated_at = Date.now();
      yield track.save();
    } else {
      var trackModel = new Track({
        track_id: trackId,
        page_id: pageId,
        title: title,
        referrer: referrer,
        userInfo: userInfo,
        teamToken: teamToken
      });
      yield trackModel.save();
    }
  }

  this.body = 'ok';
};
