import * as React from 'react';

import { Icon, Card, Select, Button } from 'antd';
const Option = Select.Option;

import { IncidentTypeExpand } from '../IncidentCard/constants';
import { IncidentPosition } from '../IncidentMapComposer';
import { IncidentReportInput } from '../../../types/graphql-shared-types';

import {
  withFormik,
  FormikErrors,
  FormikProps,
  Field,
  Form as FormikForm
} from 'formik';

import * as yup from 'yup';

import { InputField } from '../FormikField/InputField';
import { TextareaField } from '../FormikField/TextareaField';
import { SelectField } from '../FormikField/SelectField';

interface FormValues {
  title: string;
  description: string;
  userId: string;
  latitude: number;
  longitude: number;
}

interface Props {
  position: IncidentPosition;
  userId: string;
  onClose: ((event: any) => void);
  onSave: (data: IncidentReportInput) => Promise<FormikErrors<FormValues> | null>;
  onDone: () => void;
}

class IncidentComposer extends React.PureComponent<FormikProps<FormValues> & Props, {}> {
  render() {
    const { onClose } = this.props;
    const { isSubmitting } = this.props;

    const saveButton = (
      <Button
        type="primary"
        htmlType="submit"
        className="form-button"
        loading={isSubmitting}
        disabled={isSubmitting}>
        Register
      </Button>
    );

    const cancelButton = (
      <Button
        type="ghost"
        onClick={onClose}
        className="form-button">
        Anulează
      </Button>
    );

    return(
      <FormikForm id="new-incident-form">
        <Card
          style={{ width: 250, float: "right", marginTop: 24, marginRight: 24, marginBottom: 24 }}
          title="Adauga incident"
          bordered={false}
          actions={[
            saveButton,
            cancelButton
          ]}>

          <Field
            name="title"
            prefix={ <Icon type="form" style={{ color: 'rgba(0,0,0,.25)' }} /> as any }
            placeholder="Titlu incident"
            component={InputField}
            disabled={isSubmitting}
          />

          <Field
            name="description"
            placeholder="Descriere incident"
            rows={4}
            component={TextareaField}
            disabled={isSubmitting}
          />

          <Field
            name="type"
            value="OTHER"
            style={{ width: "100%" }}
            component={SelectField}>
            {Object.keys(IncidentTypeExpand).map((key: string) => {
              return (
                <Option
                  title={IncidentTypeExpand[key].text}
                  value={key}
                  key={key}>
                  {IncidentTypeExpand[key].text}
                </Option>
              );
            })}
          </Field>

        </Card>
      </FormikForm>
    );
  }
}

const titleNotLongEnough = 'title too short';
const descriptionTooShort = 'description too short';

const validationSchema = yup.object().shape({
  title: yup
    .string()
    .min(3, titleNotLongEnough)
    .max(255)
    .required(),
  description: yup
    .string()
    .min(3, descriptionTooShort)
    .max(255)
    .required()
});

export default withFormik<Props, FormValues>({
  validationSchema,
  mapPropsToValues: props => ({
    title: '',
    description: '',
    userId: props.userId,
    latitude: props.position.latitude,
    longitude: props.position.longitude,
  }),
  handleSubmit: async (values, { props, setErrors, setSubmitting }) => {
    await props.onSave(values).then(
      _ => {
        setSubmitting(false);
        props.onDone();
      },
      errors => {
        setSubmitting(false);
        const parsedErrors = {};
        errors.map((err: any) => parsedErrors[err.path] = err.message);

        setErrors(parsedErrors);
      }
    )
  }
})(IncidentComposer)
