import React, { useState } from "react"
import { PageContainerLogin, CardLogin, TitleCardLogin } from "./styled"
import { Form, Input, Button, Modal, notification } from 'antd';
import { UserOutlined, LockOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import UserRegistration from '../ModalViews/UserRegistration';

export default function Page(props) {

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();

    const onFinish = async (values) => {

        const request = await fetch("http://localhost:3030/authenticate", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(values)
        }).then(response => response.json());

        if (request.code === 400 || request.code === 404)
            notification['error']({
                message: 'Error',
                description:
                    request.message,
            });

        if (request.code === 200) {
            sessionStorage.setItem('authorization', `Bearer ${request.token}`);
            localStorage.removeItem('user');
            window.location.href = '/';
        }
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

    const handleCancel = () => {
        setIsModalVisible(false);
    };


    return (
        <>
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
                        style={{ marginTop: '40px' }}
                    >
                        <Form.Item
                            name="cpf"
                            rules={[{ required: true, message: 'Por favor informe um cpf!' }]}
                        >
                            <Input prefix={<UserOutlined className="site-form-item-icon" style={{ color: '#a4a4a4' }} />}
                                placeholder="CPF"
                                maxLength={14}
                                onChange={onChangeCPF}
                            />
                        </Form.Item>

                        <Form.Item
                            name="password"
                            rules={[{ required: true, message: 'Por favor informe a senha!' }]}
                        >
                            <Input.Password prefix={<LockOutlined className="site-form-item-icon" style={{ color: '#a4a4a4' }} />} placeholder="Senha" />
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
                            Não tem uma conta? <a onClick={() => setIsModalVisible(true)} >Cadastre-se</a>
                        </Form.Item>
                    </Form>

                </CardLogin>
            </PageContainerLogin>

            <Modal visible={isModalVisible} onCancel={handleCancel} footer={null} width={500} okText="Agendar" centered closeIcon={<ArrowLeftOutlined />} maskClosable={false}>
                <UserRegistration></UserRegistration>
            </Modal>
        </>
    )
}