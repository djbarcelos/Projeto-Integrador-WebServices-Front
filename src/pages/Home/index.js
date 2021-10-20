import React, { useState, componentDidMount } from "react"
import { PageContainer, Card, TituloCard, SubTituloCard, ImgCard, FooterCard, ButtonCard } from "../../components/Main"
import { CalendarOutlined, SendOutlined } from '@ant-design/icons';
import { Container, PageTitle } from "./styled";
import { Modal } from 'antd';
import ScheduleService from '../ModalViews/ScheduleService';
import ScheduleMedicalService from '../ModalViews/ScheduleMedicalService';

export default function Page(props) {


    const [isModalVisible, setIsModalVisible] = useState(false);
    const [specialty, setSpecialty] = useState();
    const [titleModal, setTitleModal] = useState();
    const [user, setUser] = useState();

    const callApi = async () => {

        const response = await fetch('/api/mensagem');
        const body = await response.json();
        
        if (response.status !== 200) console.error(body.message);

        setUser(body.express)
    }; callApi();

    const showModal = (specialty) => {
        setIsModalVisible(true);
        setSpecialty(specialty);
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
                <PageTitle>Olá, {user} <p>Como podemos te ajudar?</p></PageTitle>
                <Container>
                    <Card >
                        <TituloCard>Médico(a)</TituloCard>
                        <SubTituloCard>DIVERSAS ESPECIALIDADES DISPONÍVEIS</SubTituloCard>
                        <ImgCard width="300px" src="./imgDoctor.png"></ImgCard>
                        <FooterCard>
                            {/* <ButtonCard onClick={() => showModal()} > <SendOutlined style={{ marginRight: '10px', fontSize: '18px' }} /> Atendimento imediato</ButtonCard> */}
                            <ButtonCard style={{ marginTop: '55px' }} onClick={() => showModal("Medico")} > <CalendarOutlined style={{ marginRight: '10px', fontSize: '18px' }} /> Agendar atendimento</ButtonCard>
                        </FooterCard>
                    </Card>
                    <Card >
                        <TituloCard>Psicólogo(a)</TituloCard>
                        <ImgCard width="300px" src="./imgPsicologa.png"></ImgCard>
                        <FooterCard>
                            <ButtonCard onClick={() => showModal("Psicologo")} > <CalendarOutlined style={{ marginRight: '10px', fontSize: '18px' }} /> Agendar atendimento</ButtonCard>
                        </FooterCard>
                    </Card>
                    <Card >
                        <TituloCard>Nutricionista</TituloCard>
                        <ImgCard width="300px" src="./imgNutricionista.jpg"></ImgCard>
                        <FooterCard>
                            <ButtonCard onClick={() => showModal("Nutricionista")}> <CalendarOutlined style={{ marginRight: '10px', fontSize: '18px' }} /> Agendar atendimento</ButtonCard>
                        </FooterCard>
                    </Card>
                </Container>
            </PageContainer>

            <Modal title={titleModal} visible={isModalVisible} footer={null} onCancel={handleCancel} width={600} okText="Agendar">
                {specialty === "medico" ? <ScheduleMedicalService></ScheduleMedicalService> : <ScheduleService titleModal={setTitle} specialty={specialty} ></ScheduleService>}
            </Modal>
        </>
    )
}