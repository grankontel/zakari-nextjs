import React from "react";
import PropTypes from "prop-types";
import { Button, Notification, Form as BForm } from "react-bulma-components";

const Form = ({ errorMessage, onSubmit }) => (
  <form onSubmit={onSubmit}>
    <BForm.Field>
      <BForm.Label>Type your GitHub username</BForm.Label>
      <BForm.Control>
        <BForm.Input type="text" name="username" required />
      </BForm.Control>
    </BForm.Field>
    <Button.Group align="right">
    <Button color="primary"  type="submit">
      Login
    </Button>

    </Button.Group>

    {errorMessage && <Notification className="error" mt={2}  light color="danger">{errorMessage}</Notification>
    }


  </form>
);

export default Form;

Form.propTypes = {
  errorMessage: PropTypes.string,
  onSubmit: PropTypes.func,
};
