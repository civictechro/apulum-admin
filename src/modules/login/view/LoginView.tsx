import * as React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { Form, Icon, Button, Checkbox } from 'antd';
const FormItem = Form.Item;

import { withFormik, FormikErrors, FormikProps, Field, Form as FormikForm } from 'formik';
import * as yup from 'yup';
import { Link } from 'react-router-dom';

import { InputField } from '../../shared/InputField';
import './LoginView.css';
import { LoggedOutContainer } from '../../shared/LoggedOutContainer';

interface FormValues {
  email: string;
  password: string;
}

interface Props {
  submit: (values: FormValues) => Promise<FormikErrors<FormValues> | null>;
}

interface RouteProps {
  match: any;
  location: any;
  history: any;
}

class LoginView extends React.PureComponent<
  FormikProps<FormValues>
  & RouteComponentProps<RouteProps>
  & Props
> {
  render() {
    return (
      <LoggedOutContainer>
        <FormikForm id="login-form">
          <Field
            name="email"
            prefix={ <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} /> as any }
            placeholder="Email"
            component={InputField}
          />

          <Field
            name="password"
            type="password"
            prefix={ <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} /> as any }
            placeholder="Password"
            component={InputField}
          />

          <FormItem>
            <Checkbox disabled={true} checked={true}>Keep me logged in</Checkbox>
            <Link className="form-forgot" to="/forgotPassword">
              Forgot password
            </Link>
            <Button type="primary" htmlType="submit" className="form-button">
              Login
            </Button>
            Or <Link to="/register">register now!</Link>
          </FormItem>
        </FormikForm>
      </LoggedOutContainer>
    );
  }
}

const emailNotLongEnough = 'email must be at least 3 characters long';
const emailNotValid = 'email must be a valid email';

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .min(3, emailNotLongEnough)
    .max(255)
    .email(emailNotValid)
    .required()
});

const LoginViewWithFormik = withFormik<Props & RouteComponentProps<RouteProps>, FormValues>({
  validationSchema,
  mapPropsToValues: () => ({ email: '', password: ''}),
  handleSubmit: async (values, { props, setErrors, setSubmitting, ...others }) => {
    await props.submit(values).then(
      _ => {
        setSubmitting(false);

        props.history.push('/dashboard');
      },
      errors => {
        setSubmitting(false);

        const parsedErrors = {};
        errors.map((err: any) => parsedErrors[err.path] = err.message);

        console.warn(parsedErrors);
        setErrors(parsedErrors);
      }
    )
  }
})(LoginView)

export default withRouter(LoginViewWithFormik);
