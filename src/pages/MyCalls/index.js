import React, { useState } from "react";
import { PageContainer } from "../../components/Main";
import { Space, Table, Tag, Menu, Dropdown, Modal } from 'antd';
import { PageTitle } from './styled';
import 'antd/dist/antd.css';
import dayjs from "dayjs";
import ScheduleService from '../ModalViews/ScheduleService';

export default function Page(props) {

  const [query, setQuery] = useState({});
  const [indexTable, setIndexTable] = useState();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [titleModal, setTitleModal] = useState();

  const columns = [
    {
      title: 'Especialidade',
      dataIndex: 'specialty',
      key: 'specialty',
      render: value => {
        if (value.length === 2)
          return <a>{`${value[0]} ${value[1]}`}</a>;

        return <a>{value}</a>;
      },
    },
    {
      title: 'Data do Agendamento',
      dataIndex: 'date',
      key: 'date',
      render: (value) => {
        return dayjs(value).format('DD/MM/YYYY')
      },
      sorter: (a, b) => a.date - b.date,
    },
    {
      title: 'Horário',
      dataIndex: 'schedule',
      key: 'schedule',
    },
    {
      title: 'Status',
      key: 'status',
      dataIndex: 'status',
      render: (value, object) => {
        let text = 'realizado';
        let color = 'geekblue';

        if (object.states.state.toLowerCase() === 'scheduled') {
          text = 'agendado';
          color = 'green';
        }
        else if (object.states.state.toLowerCase() === 'calledoff') {
          text = 'cancelado';
          color = 'red';
        }
        return <Tag color={color} key={object.states.state}>{text.toUpperCase()}</Tag>;
      },
      filters: [
        {
          text: 'Agendado',
          value: 'scheduled',
        },
        {
          text: 'Cancelado',
          value: 'calledoff',
        },
        {
          text: 'Realizado',
          value: 'accomplished',
        },
      ],
      onFilter: (value, record) => record.states.state.indexOf(value) === 0,
    },
  ];

  const data = [
    {
      specialty: ['Psicólogo'],
      date: new Date(),
      schedule: '10:00',
      states: {
        state: 'scheduled',
        updateLog: {},
        lastUpdateLog: {}
      }
    },
    {
      specialty: ['Médico', 'Cardiologia'],
      date: new Date(),
      schedule: '15:00',
      states: {
        state: 'calledoff',
        updateLog: {},
        lastUpdateLog: {}
      }
    },
    {
      specialty: ['Médico', 'Ortopedia'],
      date: new Date('2021-08-23'),
      schedule: '10:00',
      states: {
        state: 'accomplished',
        updateLog: {},
        lastUpdateLog: {}
      }
    },
    {
      specialty: ['Nutricionista'],
      date: new Date(),
      schedule: '10:00',
      states: {
        state: 'accomplished',
        updateLog: {},
        lastUpdateLog: {}
      }
    },
  ];

  const menu = (
    <Menu>
      <Menu.Item key="1" onClick={() => { console.log(query); showModal(); }}>Reagendar</Menu.Item>
      <Menu.Item key="2">Desmarcar</Menu.Item>
    </Menu>
  );

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const setTitle = (title) => {
    setTitleModal(title);
  };

  return (
    <>
      <PageContainer>
        <PageTitle>Meus Atendimentos</PageTitle>
        <Dropdown overlay={menu} trigger={['contextMenu']}>
          <div>
            <Table columns={columns} dataSource={data}
              onRow={(record, rowIndex) => {
                return {
                  onContextMenu: event => { setQuery(record); setIndexTable(rowIndex); },
                };
              }}
            />
          </div>
        </Dropdown>
      </PageContainer>
      <Modal title={titleModal} visible={isModalVisible} footer={null} onCancel={handleCancel} width={600} okText="Agendar">
        <ScheduleService titleModal={setTitle} specialty={query.specialty} editable={true} schedule={query.schedule} date={query.date} ></ScheduleService>
      </Modal>
    </>
  )
}