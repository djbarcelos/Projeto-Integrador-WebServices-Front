import React, { useState } from "react"
import { PageContainerLogin, CardLogin,TitleCardLogin } from "./styled"
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

export default function Page(props) {

    const [form] = Form.useForm();

    const onFinish = (values) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    const onChangeCPF = (event) => {

        let char = event.target.value;
        const charEnd = char.slice(-1);

        if (isNaN(charEnd)) {
            char = char.substring(0, char.length - 1)
            form.resetFields()
            form.setFieldsValue({ cpf: char })
            return
        }

        if (char.length > 14) {
            char = char.substring(0, char.length - 1)
            form.resetFields()
            form.setFieldsValue({ cpf: char })
            return;
        }

        if (char.length <= 14) {
            if (char.length === 3 || char.length === 7)
                form.setFieldsValue({ cpf: `${char}.` })
            else if (char.length === 11)
                form.setFieldsValue({ cpf: `${char}-` })
        }
    }


    return (
        <PageContainerLogin>
            <CardLogin>
                <TitleCardLogin>MedicPass</TitleCardLogin>
                <Form
                    form={form}
                    name="basic"
                    layout="vertical"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    size="large"
                    style={{ marginTop: '40px'}}
                >
                    <Form.Item
                        name="cpf"
                        rules={[{ required: true, message: 'Por favor informe um cpf!' }]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon"  style={{color: '#a4a4a4'}} />}
                            placeholder="CPF"
                            maxLength={14}
                            onChange={onChangeCPF}
                        />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: 'Por favor informe a senha!' }]}
                    >
                        <Input.Password prefix={<LockOutlined className="site-form-item-icon" style={{color: '#a4a4a4'}}/>} placeholder="Password" />
                    </Form.Item>

                    <Form.Item>
                        <a href="">Esqueci minha senha</a>
                    </Form.Item>

                    <Form.Item>
                        <Button style={{ width: '100%' }} type="primary" htmlType="submit">
                            Entrar
                        </Button>
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 7 }}>
                        Não tem uma conta? <a href="">Cadastre-se</a>
                    </Form.Item>
                </Form>

            </CardLogin>
        </PageContainerLogin>
    )
}