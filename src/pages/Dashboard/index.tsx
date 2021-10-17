import React, { useState, useCallback, FormEvent, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { Link } from 'react-router-dom';

import logoImg from '../../assets/logo.png';
import api from '../../services/api';

import { 
    Title, 
    Header, 
    Form, 
    Menu,
    Divisor,
    DateForm,
    SubTitle,
    Body,
    Line,
    Column,
} from './styles';

import { Calendar } from '@natscale/react-calendar';

interface Valor {
    descricao: string;
    valor: number;
    posicao: string;
}

const Dashboard: React.FC = () => {
    const history = useHistory();

    const [registroData, setRegistroData] = useState<Date>(new Date());
    const [ganhos, setGanhos] = useState<Valor[]>();
    const [despesas, setDespesas] = useState<Valor[]>();
    const [saldo, setSaldo] = useState<Valor[]>();

    useEffect(() => {
        const storageToken = localStorage.getItem('@BotMobilidade:token');

        if (storageToken === "") {
            history.push('login');
        } else {
            history.push('/');
        }
    }, [history]);

    async function handleLogout(event: FormEvent<HTMLFormElement>): Promise<void> {
        localStorage.setItem('@BotMobilidade:token', "");
    }

    const onChange = useCallback(
        (value) => {

            let data = value.toLocaleDateString();

            const splitedData = data.split('/');
            const formattedDate = splitedData[2] 
                + '-' + splitedData[1] + '-' + splitedData[0];
            
            api.get(`/registro/resultados?data=${formattedDate}`).then(response => {
                setGanhos(response.data.ganhos);
                setDespesas(response.data.despesas);
                setSaldo(response.data.saldo);
            });

            setRegistroData(value);
        },
        [setRegistroData],
    );

    return (
        <>
            <img src={logoImg} alt="Bot Mobilidade" />
            <Header>
                <Title>Bot Mobilidade</Title>
                <Form onClick={handleLogout}>
                    <button>Logout</button>
                </Form>
            </Header>

            <Menu>
                <Link key="motoristas" to="motoristas">
                    Motoristas
                </Link>
                <Link key="aplicativos" to="aplicativos">
                    Aplicativos
                </Link>
                <Link key="cadastros" to="cadastros">
                    Cadastros
                </Link>
                <Link key="registros" to="registros">
                    Registros
                </Link>
            </Menu>

            <Divisor />

            <DateForm>
                <Calendar
                    isRangeSelector={false}
                    startOfWeek={0}
                    value={registroData}
                    onChange={onChange}
                />
            </DateForm>

            <SubTitle>Ganhos</SubTitle>
            <Body>
                {ganhos?.map(ganho => (
                    <Column>
                        <Line posicao={ganho.posicao}>{ganho.descricao}</Line>
                        <Line posicao={ganho.posicao}>{ganho.valor} €</Line>
                    </Column>
                ))}
            </Body>

            <SubTitle>Despesas</SubTitle>
            <Body>
                {despesas?.map(despesa => (
                    despesa.descricao !== "Despesas" && 
                    <Column>
                        <Line posicao={despesa.posicao}>{despesa.descricao}</Line>
                        <Line posicao={despesa.posicao}>{despesa.valor} €</Line>
                    </Column>
                ))}
            </Body>
            <Body>
                {despesas?.map(despesa => (
                    despesa.descricao === "Despesas" && 
                    <Column>
                        <Line posicao={despesa.posicao}>{despesa.descricao}</Line>
                        <Line posicao={despesa.posicao}>{despesa.valor} €</Line>
                    </Column>
                ))}
            </Body>

            <SubTitle>Saldo</SubTitle>
            <Body>
                {saldo?.map(sld => (
                    <Column>
                        <Line posicao={sld.posicao}>{sld.descricao}</Line>
                        <Line posicao={sld.posicao}>{sld.valor} €</Line>
                    </Column>
                ))}
            </Body>
        </>
    );
};

export default Dashboard;