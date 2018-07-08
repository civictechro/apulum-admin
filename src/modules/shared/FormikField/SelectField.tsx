import * as React from 'react';
import { FieldProps } from "formik";

import { Select } from 'antd';

interface Props {
  isHidden: boolean;
  value: string;
  style: React.CSSProperties;
}

export class SelectField extends React.PureComponent<FieldProps<any> & Props> {
  componentDidMount() {
    this.props.form.setFieldValue(
      this.props.field.name,
      this.props.value
    );
  }

  render() {
    const { field, form, value, style, children } = this.props;
    const { touched, errors, setFieldValue } = form;
    const { name } = field;

    const handleChange = (newValue: string) => setFieldValue(name, newValue);
    return (
      <div>
        <Select
          defaultValue={value}
          onChange={handleChange}
          style={style}>
          {children}
        </Select>

        {touched[name]
          && errors[name]
          && <div style={{ color: '#f00' }}>{errors[name]}</div>}
      </div>
    );
  };
}
