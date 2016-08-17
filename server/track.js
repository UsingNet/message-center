const Track = require('../models').track;

module.exports = function* () {
  const trackId = this.query.track_id;
  const pageId = this.query.page_id;
  const title = this.query.title;
  const referrer = this.query.referrer;
  const userInfo = this.query.user_info;
  const teamToken = this.query.team_token;

  if (trackId && pageId) {
    const track = yield Track.findOne({track_id: trackId, page_id: pageId});
    if (track) {
      track.updated_at = Date.now();
      yield track.save();
    } else {
      const trackModel = new Track({
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
