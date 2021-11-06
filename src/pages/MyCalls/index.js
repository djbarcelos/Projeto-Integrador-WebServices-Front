import React, { useEffect, useState } from "react";
import { PageContainer } from "../../components/Main";
import { Table, Tag, Menu, Dropdown, Modal, notification } from 'antd';
import { PageTitle } from './styled';
import 'antd/dist/antd.css';
import dayjs from "dayjs";
import ScheduleService from '../ModalViews/ScheduleService';
import { ExclamationCircleOutlined } from '@ant-design/icons';

export default function Page(props) {

  const { confirm } = Modal;

  const [query, setQuery] = useState({});
  const [indexTable, setIndexTable] = useState();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [titleModal, setTitleModal] = useState();
  const [data, setData] = useState();

  useEffect(() => {
    apiRequest();
  }, [])

  async function apiRequest() {
    const request = await fetch("http://localhost:3030/mycalls", {
      method: "GET",
      headers: { 'Content-Type': 'application/json', 'authorization': `${sessionStorage.getItem('authorization')}` },
    }).then(response => response.json());

    if (request.code === 400 || request.code === 404)
      notification['error']({
        message: 'Error',
        description:
          request.message,
      });

    if (request.code === 200) {
      setData(request.data.map(e => { e.key = e._id; return e }));
    }
  }

  async function apiRequestMarkOff() {
    const request = await fetch("http://localhost:3030/mark_off", {
      method: "PUT",
      headers: { 'Content-Type': 'application/json', 'authorization': `${sessionStorage.getItem('authorization')}` },
      body: JSON.stringify({ queryId: query._id })
    }).then(response => response.json());

    if (request.code === 400 || request.code === 404)
      notification['error']({
        message: 'Error',
        description:
          request.message,
      });

    if (request.code === 200) {
      apiRequest();
    }
  }

  const columns = [
    {
      title: 'Especialidade',
      dataIndex: 'specialty',
      key: 'specialty',
      render: value => {

        if (value.length === 2)
          return <a>{`${value[0].toUpperCase()} ${value[1].toUpperCase()}`}</a>;

        return <a>{value[0].toUpperCase()}</a>;
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

  const menu = (
    <Menu>
      <Menu.Item key="1" onClick={() => showModal()}>Reagendar</Menu.Item>
      <Menu.Item key="2" onClick={() => showDeleteConfirm()}>Desmarcar</Menu.Item>
    </Menu>
  );

  const showModal = () => {
    if (query.states.state === "scheduled")
      setIsModalVisible(true);
    else
      countDown('Não é possivel reagendar atendimetos já realizados ou cancelados.')
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const setTitle = (title) => {
    setTitleModal(title);
  };

  const showDeleteConfirm = () => {
    if (query.states.state === "scheduled")
      confirm({
        title: 'Cancelar o agendamento da consulta?',
        icon: <ExclamationCircleOutlined />,
        content: `Em caso de cancelamento, um novo agendamento deve ser realizado. 
                Dia: ${dayjs(query.date).format('DD/MM/YYYY')}`,
        okText: 'Desmarcar',
        okType: 'danger',
        cancelText: 'Cancelar',
        onOk() {
          apiRequestMarkOff()
        },
        onCancel() {
        },
      });
    else
      countDown('Não é possivel desmarcar atendimetos já realizados ou cancelados.')
  }

  function countDown(message) {
    let secondsToGo = 5;
    const modal = Modal.info({
      title: 'Aviso',
      content: ` ${message} ${secondsToGo} s.`,
    });
    const timer = setInterval(() => {
      secondsToGo -= 1;
      modal.update({
        content: `${message} ${secondsToGo} s.`,
      });
    }, 1000);
    setTimeout(() => {
      clearInterval(timer);
      modal.destroy();
    }, secondsToGo * 1000);
  }

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