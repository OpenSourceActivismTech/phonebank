import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { Button, ButtonToolbar, PageHeader } from 'react-bootstrap';

import { updateUser } from '../../actions/users';

class EditAccountInfo extends Component {
  constructor(props) {
    super(props);
    this.renderField = this.renderField.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onSubmit(values) {
    const { history } = this.props;
    const { is_admin } = this.props.account_info;
    const { id } = this.props.auth;
    this.props.updateUser(id, values, is_admin, history);
  }

  renderField(field) {
    const className = `form-group ${field.meta.touched && field.meta.error ? 'has-danger' : ''}`;
    const { account_info } = this.props;
    const mapToLabelNames = {
      'First Name': 'first_name',
      'Last Name': 'last_name',
      Email: 'email',
      'Phone Number': 'phone_number'
    };

    return (
      <div className={className}>
        <label htmlFor={field.label}>{field.label}
          <input
            type={'text'}
            className="form-control"
            placeholder={account_info[mapToLabelNames[field.label]]}
            {...field.input}
          />
        </label>
      </div>
    );
  }

  render() {
    const { handleSubmit } = this.props;
    const { id } = this.props.auth;
    const { is_admin } = this.props.account_info;
    return (
      <div className="admin-form">
        <PageHeader>Edit your Account</PageHeader>
        <form onSubmit={handleSubmit(this.onSubmit)}>
          <Field
            name="first_name"
            label="First Name"
            component={this.renderField}
          />
          <Field
            name="last_name"
            label="Last Name"
            component={this.renderField}
          />
          <Field
            name="email"
            label="Email"
            component={this.renderField}
          />
          <Field
            name="phone_number"
            label="Phone Number"
            component={this.renderField}
          />
          <ButtonToolbar>
            <Button bsStyle="primary" type="submit">Update</Button>
            <Link className="btn btn-default" to={is_admin ? `/admin/account/${id}` : `/volunteers/account/${id}`}>
              Cancel
            </Link>
          </ButtonToolbar>
        </form>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};
  const { password, password_confirm } = values;
  if (!!password && !!password_confirm && password !== password_confirm) {
    errors.password_confirm = 'The passwords must match.';
  }
  return errors;
}

function mapStateToProps(state) {
  return { account_info: state.account_info, auth: state.auth };
}

export default withRouter(
  reduxForm({
    validate,
    form: 'EditedAccountInfo'
  })(
    connect(mapStateToProps, { updateUser })(EditAccountInfo)
  )
);
