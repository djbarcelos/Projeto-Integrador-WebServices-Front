import React from "react"
import { Form, Input, Button, notification } from 'antd';

export default function Page(props) {

    const [form] = Form.useForm();

    const onFinish = async (values) => {

        const request = await fetch("http://localhost:3030/register", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(values)
        }).then(response => response.json());

        if (request.code === 400)
            notification['error']({
                message: 'Error',
                description:
                    request.message,
            });

        if (request.token) {
            sessionStorage.setItem('authorization', `Bearer ${request.token}`);
            window.location.reload();
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const onChangeCPF = (event) => {

        let char = event.target.value;
        const charEnd = char.slice(-1);

        if (isNaN(charEnd)) {
            char = char.substring(0, char.length - 1);
            form.setFieldsValue({ cpf: char });
            return
        }

        if (char.length <= 14) {
            if (char.length === 3 || char.length === 7)
                form.setFieldsValue({ cpf: `${char}.` });
            else if (char.length === 11)
                form.setFieldsValue({ cpf: `${char}-` });
        }
    }

    const onChangeBirthDate = (event) => {

        let char = event.target.value;
        const charEnd = char.slice(-1);

        if (isNaN(charEnd)) {
            char = char.substring(0, char.length - 1);
            form.setFieldsValue({ birthDate: char });
            return
        }

        if (char.length <= 14) {
            if (char.length === 2 || char.length === 5)
                form.setFieldsValue({ birthDate: `${char}/` });
        }
    }

    return (
        <>
            <div style={{ textAlign: "center" }}>
                <h3>Cadastre-se e faça sua consulta online agora mesmo</h3>
                <p style={{}}>Preencha o formulário com os dados do paciente que fará a consulta</p>
            </div>
            <Form
                form={form}
                name="basic"
                layout="vertical"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                size="middle"
            >
                <Form.Item
                    label="Nome completo do paciente"
                    name="name"
                    rules={[{ required: true, message: 'Por favor informe o nome!' }]}
                >
                    <Input placeholder="Nome" />
                </Form.Item>
                <Form.Item
                    label="Data de Nascimento"
                    name="birthDate"
                    rules={[
                        { required: true, message: 'Por favor informe a data de nacimento!' }
                    ]}
                >
                    <Input placeholder="00/00/0000" maxLength={10} onChange={onChangeBirthDate} />
                </Form.Item>
                <Form.Item
                    label="CPF do paciente"
                    name="cpf"
                    rules={[
                        { required: true, message: 'Por favor informe um cpf!' }
                    ]}
                >
                    <Input
                        placeholder="000.000.000-00"
                        maxLength={14}
                        onChange={onChangeCPF}
                    />
                </Form.Item>
                <Form.Item
                    label="Email de contato"
                    name="email"
                    rules={[
                        {
                            type: 'email',
                            message: 'A entrada não é um e-mail válido!',
                        },
                        {
                            required: true,
                            message: 'Por favor informe um email!',
                        },
                    ]}
                >
                    <Input placeholder="medicpass@email.com" />
                </Form.Item>

                <Form.Item
                    label="Senha"
                    name="password"
                    rules={[{ required: true, message: 'Por favor informe a senha!' }]}
                    hasFeedback
                >
                    <Input.Password placeholder="Senha" />
                </Form.Item>

                <Form.Item
                    label="Repetir senha"
                    name="repeatPassword"
                    dependencies={['password']}
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: 'Por favor informe a senha!',
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('As duas senhas que você digitou não coincidem!'));
                            },
                        }),
                    ]}
                >
                    <Input.Password placeholder="Repetir senha" />
                </Form.Item>

                <Form.Item>
                    <Button style={{ width: '100%' }} type="primary" htmlType="submit">
                        Cadastrar
                    </Button>
                </Form.Item>
            </Form>
        </>
    )
}