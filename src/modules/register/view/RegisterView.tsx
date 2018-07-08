import * as React from 'react';

import { Form, Icon, Button, Alert } from 'antd';
const FormItem = Form.Item;

import {
  withFormik,
  FormikErrors,
  FormikProps,
  Field,
  Form as FormikForm
} from 'formik';

import * as yup from 'yup';
import { Link } from 'react-router-dom';

import { InputField } from '../../shared/FormikField/InputField';
import { LoggedOutContainer } from '../../shared/LoggedOutContainer';

import './RegisterView.css';

interface FormValues {
  email: string;
  password: string;
}

interface Props {
  submit: (values: FormValues) => Promise<FormikErrors<FormValues> | null>;
}

class RegisterView extends React.PureComponent<FormikProps<FormValues> & Props> {
  render() {
    const { isSubmitting, status } = this.props;
    let confirmationBox = null;

    if (status && status.hasRegistered) {
      confirmationBox =
        <Alert
          message="Registered succesfully"
          description="Please check your email to confirm email address."
          type="success"
          showIcon={true}
        />;
    }

    return (
      <LoggedOutContainer>
        <FormikForm id="register-form">
          {confirmationBox}
          <Field
            name="email"
            prefix={ <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} /> as any }
            placeholder="Email"
            component={InputField}
            disabled={isSubmitting}
          />

          <Field
            name="password"
            type="password"
            prefix={ <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} /> as any }
            placeholder="Password"
            component={InputField}
            disabled={isSubmitting}
          />

          <FormItem>
            <Link className="form-forgot" to="/forgotPassword">
              Forgot password
            </Link>
            <Button
              type="primary"
              htmlType="submit"
              className="form-button"
              loading={isSubmitting}>
              Register
            </Button>
            Or <Link to="/login">login now!</Link>
          </FormItem>
        </FormikForm>
      </ LoggedOutContainer>
    );
  }
}

const emailNotLongEnough = 'email must be at least 3 characters long';
const emailNotValid = 'email must be a valid email';
const passwordTooShort = 'password must be at least 3 characters';

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .min(3, emailNotLongEnough)
    .max(255)
    .email(emailNotValid)
    .required(),
  password: yup
    .string()
    .min(3, passwordTooShort)
    .max(255)
    .required()
});

export default withFormik<Props, FormValues>({
  validationSchema,
  mapPropsToValues: () => ({ email: '', password: ''}),
  handleSubmit: async (values, { props, setErrors, setSubmitting, setStatus }) => {
    await props.submit(values).then(
      _ => {
        setSubmitting(false);
        setStatus({
          hasRegistered: true,
        })
      },
      errors => {
        setSubmitting(false);
        const parsedErrors = {};
        errors.map((err: any) => parsedErrors[err.path] = err.message);

        setErrors(parsedErrors);
      }
    )
  }
})(RegisterView)
