import React, { useState, useEffect, FormEvent } from 'react';
import { Link } from 'react-router-dom';

import logoImg from '../../assets/motorista.png';
import { FiChevronLeft, FiCheckCircle, FiXCircle } from 'react-icons/fi';

import api from '../../services/api';

import { 
    Title, 
    Header, 
    Menu, 
    Error, 
    Body,
    Driver,
} from './styles';

import '@natscale/react-calendar/dist/main.css';

interface Motorista {
    driverId: string;
    driverName: string;
    active: boolean;
}

const Motoristas: React.FC = () => {
    const [motoristas, setMotoristas] = useState<Motorista[]>(() => {
        const storageMotoristas = localStorage.getItem('@BotMobilidade:motoristas');

        if (storageMotoristas) {
            return JSON.parse(storageMotoristas);
        } else {
            return [];
        }
    });
    const [inputError, setInputError] = useState('');
    const [newMotorista, setNewMotorista] = useState('');
    const [newMotoristaId, setNewMotoristaId] = useState('');

    useEffect(() => {
        const storageMotoristas = localStorage.getItem('@BotMobilidade:motoristas');

        if (storageMotoristas === '[]' || !storageMotoristas) {
            api.get(`/motorista/show`).then(response => {
                const data: Motorista[] = response.data.motoristas;
                setMotoristas(data);
            });
        }

        localStorage.setItem('@BotMobilidade:motoristas', JSON.stringify(motoristas));
    }, [motoristas]);

    async function handleAddMotorista(
        e: FormEvent<HTMLFormElement>,
    ): Promise<void> {
        e.preventDefault();

        if (!newMotoristaId && !newMotorista) {
            setInputError('Digite o nome e o id do motorista');
            return;
        }

        if (!newMotorista) {
            setInputError('Digite o nome do motorista');
            return;
        }

        if (!newMotoristaId) {
            setInputError('Digite o id do motorista');
            return;
        }

        try {
            var request = {
                driverId: newMotoristaId,
                driverName: newMotorista,
                active: true
            };

            const response = await api.post<Motorista>('/motorista/salvar', request);
            const motorista = response.data;

            setMotoristas([...motoristas, motorista]);
            setNewMotorista('');
            setInputError('');
        } catch (err) {
            setInputError('Erro ao adicionar motorista');
        }
    }

    async function handleEditMotorista(
        e: FormEvent<HTMLFormElement>,
    ): Promise<void> {
        e.preventDefault();

        try {
            const status = e.currentTarget[2].getAttribute("value") === 'true';

            var request = {
                driverId: e.currentTarget[0].getAttribute("value"),
                driverName: e.currentTarget[1].getAttribute("value"),
                active: !status
            };

            const response = await api.post('/motorista/status', request);
            
            const responseMotoristas = response.data.motoristas;
            setMotoristas(responseMotoristas);
            localStorage.setItem('@BotMobilidade:motoristas', JSON.stringify(motoristas));
        } catch (err) {
            console.log('Erro ao editar status do motorista');
        }
    }

    return (
        <>
            <img src={logoImg} alt="Motorista" />
            <Header>
                <Title>Motoristas</Title>
                <Link to="/">
                    <FiChevronLeft size={16} />
                    Voltar
                </Link>
            </Header>
            <Menu hasError={!!inputError} onSubmit={handleAddMotorista}>
                <input
                    value={newMotoristaId}
                    onChange={e => setNewMotoristaId(e.target.value)}
                    placeholder="Digite o id do Motorista"
                />
                <input
                    value={newMotorista}
                    onChange={e => setNewMotorista(e.target.value)}
                    placeholder="Digite o nome do Motorista"
                />
                <button type="submit">
                    Adicionar Motorista
                </button>
            </Menu>

            {inputError && <Error>{inputError}</Error>}

            <Body>
                {motoristas?.map(motorista => (
                    <Driver 
                        onSubmit={handleEditMotorista}
                        active={motorista.active} 
                        key={motorista.driverId}
                    >
                        <input
                            value={motorista.driverId}
                            readOnly
                        />
                        <input
                            value={motorista.driverName}
                            readOnly
                        />
                        <input 
                            type="hidden"
                            value={motorista.active.toString()}
                        />
                        <button type="submit">
                            {motorista.active ? <FiCheckCircle /> : <FiXCircle />}
                        </button>
                    </Driver>
                ))}
            </Body>
        </>
    );
};

export default Motoristas;