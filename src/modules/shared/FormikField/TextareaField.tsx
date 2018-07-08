import * as React from 'react';
import { FieldProps } from "formik";

import { Form, Input } from 'antd';
const FormItem = Form.Item;

export const TextareaField: React.SFC<
  FieldProps<any>
> = ({
  field,
  form: { touched, errors},
  ...props
}) => {
  const errorMsg = touched[field.name] && errors[field.name];

  return (
    <FormItem
      help={errorMsg}
      validateStatus={errorMsg ? "error" : undefined}>
      <Input.TextArea {...field} {...props} />
    </FormItem>
  );
}
