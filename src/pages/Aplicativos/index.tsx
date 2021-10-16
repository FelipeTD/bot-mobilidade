import React, { useState, useEffect, FormEvent } from 'react';
import { Link } from 'react-router-dom';

import logoImg from '../../assets/aplicativos.png';
import { FiChevronLeft, FiCheckCircle, FiXCircle } from 'react-icons/fi';

import api from '../../services/api';

import {
    Title,
    Header,
    Body,
    App,
    Menu,
    Error
} from './styles';

import '@natscale/react-calendar/dist/main.css';

interface Aplicativo {
    aplicativoId: number;
    nomeAplicativo: string;
    active: boolean;
}

const Aplicativos: React.FC = () => {
    const [aplicativos, setAplicativos] = useState<Aplicativo[]>(() => {
        const storageAplicativos = localStorage.getItem('@BotMobilidade:aplicativos');

        if (storageAplicativos) {
            return JSON.parse(storageAplicativos);
        } else {
            return [];
        }
    });
    const [inputError, setInputError] = useState('');
    const [newAplicativo, setNewAplicativo] = useState('');

    useEffect(() => {
        const storageAplicativos = localStorage.getItem('@BotMobilidade:aplicativos');

        if (storageAplicativos === '[]' || !storageAplicativos) {
            api.get(`/aplicativo/show`).then(response => {
                const data: Aplicativo[] = response.data.aplicativos;
                setAplicativos(data);
            });
        }

        localStorage.setItem('@BotMobilidade:aplicativos', JSON.stringify(aplicativos));
    }, [aplicativos]);

    async function handleAddAplicativo(
        e: FormEvent<HTMLFormElement>,
    ): Promise<void> {
        e.preventDefault();

        if (!newAplicativo) {
            setInputError('Digite o nome do aplicativo');
            return;
        }

        try {
            var request = {
                nomeAplicativo: newAplicativo,
                active: true
            };

            const response = await api.post<Aplicativo>('/aplicativo/salvar', request);
            const aplicativo = response.data;

            setAplicativos([...aplicativos, aplicativo]);
            setNewAplicativo('');
            setInputError('');
        } catch (err) {
            setInputError('Erro ao adicionar aplicativo');
        }
    }

    async function handleEditAplicativo(
        e: FormEvent<HTMLFormElement>,
    ): Promise<void> {
        e.preventDefault();

        try {
            const status = e.currentTarget[2].getAttribute("value") === 'true';

            var request = {
                aplicativoId: e.currentTarget[0].getAttribute("value"),
                nomeAplicativo: e.currentTarget[1].getAttribute("value"),
                active: !status
            };

            const response = await api.post('/aplicativo/status', request);
            const responseAplicativos = response.data.aplicativos;
            setAplicativos(responseAplicativos);

            const activeResponse = await api.get('/aplicativo/ativos');
            const responseAplicativosAtivos = activeResponse.data.aplicativos;

            localStorage.setItem('@BotMobilidade:aplicativos', JSON.stringify(responseAplicativos));
            localStorage.setItem('@BotMobilidade:aplicativosativos', JSON.stringify(responseAplicativosAtivos));
        } catch (err) {
            console.log('Erro ao adicionar aplicativo');
        }
    }

    return (
        <>
            <img src={logoImg} alt="Aplicativos" />
            <Header>
                <Title>Aplicativos</Title>
                <Link to="/">
                    <FiChevronLeft size={16} />
                    Voltar
                </Link>
            </Header>
            <Menu hasError={!!inputError} onSubmit={handleAddAplicativo}>
                <input
                    value={newAplicativo}
                    onChange={e => setNewAplicativo(e.target.value)}
                    placeholder="Digite o nome do aplicativo"
                />
                <button type="submit">
                    Adicionar Aplicativo
                </button>
            </Menu>

            {inputError && <Error>{inputError}</Error>}

            <Body>
                {aplicativos?.map(aplicativo => (
                    <App 
                        onSubmit={handleEditAplicativo}
                        active={aplicativo.active} 
                        key={aplicativo.aplicativoId}
                    >
                        <input
                            value={aplicativo.aplicativoId}
                            readOnly
                        />
                        <input
                            value={aplicativo.nomeAplicativo}
                            readOnly
                        />
                        <input 
                            type="hidden"
                            value={aplicativo.active.toString()}
                        />
                        <button type="submit">
                            {aplicativo.active ? <FiCheckCircle /> : <FiXCircle />}
                        </button>
                    </App>
                ))}
            </Body>
        </>
    );
};

export default Aplicativos;