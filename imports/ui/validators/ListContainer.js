import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Validators } from '/imports/api/validators/validators.js';
import List from './List.jsx';

export default ValidatorListContainer = withTracker((props) => {
    const validatorsHandle = Meteor.subscribe('validators.all');
    const loading = !validatorsHandle.ready();
    const validators = Validators.find({jailed:props.jailed},{sort:{uptime:-1,voting_power:-1}}).fetch();
    const validatorsExist = !loading && !!validators;
    // console.log(props.state.limit);
    return {
        loading,
        validatorsExist,
        validators: validatorsExist ? validators : {}
    };
})(List);
