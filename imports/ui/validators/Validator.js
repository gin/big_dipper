import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Validators } from '/imports/api/validators/validators.js';
import { ValidatorRecords } from '/imports/api/records/records.js';
import Validator from './Validator.jsx';

export default ValidatorDetailsContainer = withTracker((props) => {
    const validatorsHandle = Meteor.subscribe('validators.all');
    const validatorRecordsHandle = Meteor.subscribe('validator_records.uptime', props.address, 50);
    const loading = !validatorsHandle.ready() && !validatorRecordsHandle.ready();
    const validator = Validators.findOne({address:props.address});
    const validatorRecords = ValidatorRecords.find({address:props.address}, {sort:{height:1}}).fetch();
    const validatorExist = !loading && !!validator && !!validatorRecords;
    // console.log(props.state.limit);
    return {
        loading,
        validatorExist,
        validator: validatorExist ? validator : {},
        records: validatorExist ? validatorRecords : {}
    };
})(Validator);
