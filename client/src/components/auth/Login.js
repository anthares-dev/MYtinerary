import React, { Component } from "react";
import { connect } from "react-redux"
import PropTypes from "prop-types"
import { login } from "../../store/actions/authActions"
import { clearErrors } from "../../store/actions/errorActions"


class Login extends Component {

    state = {
        email: "",
        password: "",
        msg: null
    }

    static propTypes = {
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        login: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
      };

      componentDidUpdate(prevProps, isAuthenticated) {
        const { error } = this.props;
        if (error !== prevProps.error) {
          //* Check for register error
          if (error.id === "REGISTER_FAIL") {
            this.setState({ msg: error.msg.msg });
          } else {
            this.setState({ msg: null });
          }
        }

}