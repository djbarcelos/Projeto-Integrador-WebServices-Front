import React, { useState } from "react"
import { PageContainer, Card, TituloCard, SubTituloCard, ImgCard, FooterCard, ButtonCard } from "../../components/Main"
import { CalendarOutlined, SendOutlined } from '@ant-design/icons';
import { Container, PageTitle } from "./styled";
import { Modal, Button } from 'antd';
import ScheduleService from '../ModalViews/ScheduleService'; 

export default function Page(props) {


    const [isModalVisible, setIsModalVisible] = useState(false);
    const [titleModal, setTitleModal] = useState();

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
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
                <PageTitle>Olá, Diogo <p>Como podemos te ajudar?</p></PageTitle>
                <Container>
                    <Card >
                        <TituloCard>Médico(a)</TituloCard>
                        <SubTituloCard>DIVERSAS ESPECIALIDADES DISPONÍVEIS</SubTituloCard>
                        <ImgCard width="300px" src="./imgDoctor.png"></ImgCard>
                        <FooterCard>
                            <ButtonCard> <SendOutlined style={{ marginRight: '10px', fontSize: '18px' }} /> Atendimento imediato</ButtonCard>
                            <ButtonCard> <CalendarOutlined style={{ marginRight: '10px', fontSize: '18px' }} /> Agendar atendimento</ButtonCard>
                        </FooterCard>
                    </Card>
                    <Card >
                        <TituloCard>Psicólogo(a)</TituloCard>
                        <ImgCard width="300px" src="./imgPsicologa.png"></ImgCard>
                        <FooterCard>
                            {/* <ButtonCard> <SendOutlined style={{marginRight: '10px', fontSize: '18px'}} /> Atendimento imediato</ButtonCard> */}
                            <ButtonCard> <CalendarOutlined style={{ marginRight: '10px', fontSize: '18px' }} /> Agendar atendimento</ButtonCard>
                        </FooterCard>
                    </Card>
                    <Card >
                        <TituloCard>Nutricionista</TituloCard>
                        <ImgCard width="300px" src="./imgNutricionista.jpg"></ImgCard>
                        <FooterCard>
                            {/* <ButtonCard> <SendOutlined style={{marginRight: '10px', fontSize: '18px'}} /> Atendimento imediato</ButtonCard> */}
                            <ButtonCard onClick={() => showModal()}> <CalendarOutlined style={{ marginRight: '10px', fontSize: '18px' }} /> Agendar atendimento</ButtonCard>
                        </FooterCard>
                    </Card>
                </Container>
            </PageContainer>

            <Modal title={titleModal} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <ScheduleService  titleModal={setTitle}></ScheduleService>
            </Modal>
        </>
    )
}