import React, { useEffect } from "react"
import {
    Form,
    Select,
    DatePicker,
    Button,
    Cascader,
    notification
} from 'antd';
import moment from 'moment';

export default function Page(props) {

    const { specialty, date, schedule } = props;

    const [form] = Form.useForm();

    useEffect(() => {
        props.titleModal('Agendar Atendimento');
    }, [])

    async function init() {

        if (props.editable) {
            form.setFieldsValue({ schedule });
            form.setFieldsValue({ specialty: [specialty[0], specialty[1]] })
        }

    }; init();

    const onFinish = (values) => {

        if (values.specialty[0] === 'Medico' && values.specialty.length === 1) {
            openNotification();
            return;
        }

        console.info('Success:', values);
    };
    const { Option } = Select;

    const onDateChange = (object, value) => {
        form.setFieldsValue({ date: object });
    }
    const onScheduleChange = (value, object) => {
        form.setFieldsValue({ schedule: value });
    }
    const onSpecialtyChange = (value, object) => {
        form.setFieldsValue({ specialty: value });
    }

    const options = [
        {
            value: 'Psicologo',
            label: 'Psicólogo',
        },
        {
            value: 'Nutricionista',
            label: 'Nutricionista',
        },
        {
            value: 'Medico',
            label: 'Médico',
            children: [
                {
                    value: 'Cardiologia',
                    label: 'Cardiologia',
                },
                {
                    value: 'Clinico_Geral',
                    label: 'Clínica Médica',
                },
                {
                    value: 'Dermatologia',
                    label: 'Dermatologia',
                },
                {
                    value: 'Ortopedia',
                    label: 'Ortopedia',
                },
                {
                    value: 'Pediatria',
                    label: 'Pediatria',
                },
            ],
        },
    ];

    const openNotification = () => {
        notification['info']({
            message: 'Aviso',
            description:
                'Por favor, selecione a especialidade do médico!',
        });
    };

    function disabledDate(current) {
        // Can not select days before today and today
        return current && current < moment().endOf('day');
    }

    return (
        <>
            <Form
                labelCol={{ span: 5 }}
                wrapperCol={{ span: 24 }}
                form={form}
                layout="horizontal"
                onFinish={onFinish}
                size={"large"}
            >
                <Form.Item label="Data" name="date" extra="Selecione um dia útil " rules={[{ required: true, message: 'Por favor, selecione uma data!' }]}>
                    <DatePicker style={{ width: 180 }} placeholder="Selecione o dia" format="DD/MM/YYYY" onChange={onDateChange} disabledDate={disabledDate} />
                </Form.Item>
                <Form.Item label="Horário" name="schedule" extra="Horário de Brasília" rules={[{ required: true, message: 'Por favor, selecione o horário!' }]}>
                    <Select style={{ width: 180 }} placeholder="Selecione o horário" onChange={onScheduleChange}>
                        <Option value="09:00">09:00</Option>
                        <Option value="10:00">10:00</Option>
                        <Option value="11:00">11:00</Option>
                        <Option value="13:00">13:00</Option>
                        <Option value="14:00">14:00</Option>
                        <Option value="15:00">15:00</Option>
                        <Option value="16:00">16:00</Option>
                        <Option value="17:00">17:00</Option>
                        <Option value="18:00">18:00</Option>
                    </Select>
                </Form.Item>
                <Form.Item label="Especialidade" name="specialty" rules={[{ required: true, message: 'Por favor, selecione a especialidade!' }]}>
                    <Cascader options={options} onChange={onSpecialtyChange} changeOnSelect disabled={props.editable ? true : false} />
                </Form.Item>
                <Form.Item label=" " colon={false}>
                    <Button type="primary" htmlType="submit">
                        {props.editable ? 'Reagendar' : 'Agendar'}
                    </Button>
                </Form.Item>
            </Form>
        </>
    )
}