/**
 * Created by 姚应龙 on 2018/8/28
 */
import React from 'react';
import {Form, Icon, Input, Button, Select} from 'antd';

const FormItem = Form.Item;
const { TextArea } = Input;
const Option = Select.Option;

function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}

const models = [
    {modelName:"damage inspection model",CUSTOM_MODEL_ID:"TK7ADBUQJPEYGIM752USX56SUY"},
    {modelName:"car model inspection model", CUSTOM_MODEL_ID:"KQPBBWI4WFZGK35JN2PSECJEXY"},
]

class ModelParamsForm extends React.Component{
    componentDidMount() {
        // To disabled submit button at the beginning.
        //this.props.form.validateFields();
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (err) {
                console.error(err);
                this.props.onSelModel(true);
                return;
            }
            this.props.onSelModel(false, values);
        });
    };
    render() {
        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 16,
                    offset: 8,
                },
            },
        };

        return (
            <Form layout="grid" onSubmit={this.handleSubmit}>
                <FormItem
                    {...formItemLayout}
                    label="MODEL"
                >
                    {getFieldDecorator('CUSTOM_MODEL_ID', {
                        rules: [{ required: true, message: 'Please select MODEL!' }],
                    })(
                        <Select>
                            {
                                models.map(m=>(<Option value={m}>{m.modelName}</Option>))
                            }
                        </Select>
                    )}
                </FormItem>
                {/* <FormItem
                    {...formItemLayout}
                    label="CUSTOM_MODEL_ID"
                >
                    {getFieldDecorator('CUSTOM_MODEL_ID', {
                        rules: [{ required: true, message: 'Please input CUSTOM_MODEL_ID!' }],
                    })(
                        <Input placeholder="CUSTOM_MODEL_ID" />
                    )}
                </FormItem> */}
                
                <FormItem {...tailFormItemLayout}>
                    <Button
                        type="primary"
                        htmlType="submit"
                        disabled={hasErrors(getFieldsError())}
                    >
                        Submit
                    </Button>
                </FormItem>
            </Form>
        );
    }
}

const WrappedModelParamsForm = Form.create()(ModelParamsForm);

export default  WrappedModelParamsForm;
