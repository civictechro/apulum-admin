import * as React from 'react';
import { FieldProps } from "formik";

import { Form, Input } from 'antd';
const FormItem = Form.Item;

export const InputField: React.SFC<
  FieldProps<any> & { prefix: React.ReactNode } & { isHidden: boolean}
> = ({
  field,
  form: { touched, errors},
  isHidden,
  ...props
}) => {
  const errorMsg = touched[field.name] && errors[field.name];

  return (
    <FormItem
      style={isHidden ? { display: 'none'} : {}}
      help={errorMsg}
      validateStatus={errorMsg ? "error" : undefined}>
      <Input {...field} {...props} />
    </FormItem>
  );
}
