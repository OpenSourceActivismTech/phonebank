import Call from '../models/calls';

export default {
  populateCall: (params) => {
    const { campaign_id, contact_id } = params;

    return new Call({ campaign_id, contact_id }).save();
  },

  assignCall: (params) => {
    const { user_id, campaign_id } = params;

    return new Call()
      .where({ campaign_id, status: 'AVAILABLE' })
      .fetch()
      .then((call) => {
        if (call) {
          return call.save({ user_id, status: 'ASSIGNED' }, { patch: true })
            .then(savedCall => savedCall)
            .catch(err => console.log('Error in call service when assigning to user: ', err));
        }

        return null;
      })
      .catch(err => console.log('Error in call service when finding call to assign:', err));
  },

  recordAttempt: (params) => {
    const { id, notes, outcome } = params;
    return new Call({ id })
      .save({ notes, outcome }, { patch: true })
      .then(call => call)
      .catch(err => console.log(err));
  },

  createNewAttempt: (params) => {
    const { attempt_num, campaign_id, contact_id } = params;
    return new Call({ attempt_num, campaign_id, contact_id }).save();
  },

  getCallById: (params) => {
    const { id } = params;
    return new Call({ id })
    .fetch()
    .then(call => call)
    .catch(err => console.log(err));
  }
};
