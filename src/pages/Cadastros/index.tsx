import React, { useState, useEffect, useCallback, FormEvent } from 'react';
import { Link } from 'react-router-dom';

import logoImg from '../../assets/cadastros.png';
import { FiChevronLeft } from 'react-icons/fi';

import api from '../../services/api';

import { 
    Title, 
    Header,
    Body,
    Dados,
    Line,
    Menu,
    Error,
} from './styles';

import '@natscale/react-calendar/dist/main.css';

interface Aplicativo {
    aplicativoId: number;
    nomeAplicativo: string;
    active: boolean;
}

interface Driver {
    driverId: string;
    driverName: string;
    active: boolean;
}

interface CadastroResponse {
    cadastroId: number;
    numeroAplicativo: string;
    aplicativo: Aplicativo;
    driver: Driver;
}

interface Motorista {
    driverId: string;
    driverName: string;
    active: boolean;
}

const Cadastros: React.FC = () => {
    const [cadastros, setCadastros] = useState<CadastroResponse[]>(() => {
        const storageCadastros = localStorage.getItem('@BotMobilidade:cadastros');

        if (storageCadastros) {
            return JSON.parse(storageCadastros);
        } else {
            return [];
        }
    });
    const [motoristas, setMotoristas] = useState<Motorista[]>(() => {
        const storageMotoristas = localStorage.getItem('@BotMobilidade:motoristasativos');

        if (storageMotoristas) {
            return JSON.parse(storageMotoristas);
        } else {
            return [];
        }
    });
    const [aplicativos, setAplicativos] = useState<Aplicativo[]>(() => {
        const storageAplicativos = localStorage.getItem('@BotMobilidade:aplicativosativos');

        if (storageAplicativos) {
            return JSON.parse(storageAplicativos);
        } else {
            return [];
        }
    });
    const [inputError, setInputError] = useState('');
    const [newNumeroAplicativo, setNewNumeroAplicativo] = useState('');
    const [motorista, setMotorista] = useState<Motorista>(motoristas[0]);
    const [aplicativo, setAplicativo] = useState<Aplicativo>(aplicativos[0]);

    useEffect(() => {
        const storageCadastros = localStorage.getItem('@BotMobilidade:cadastros');

        if (storageCadastros === '[]' || !storageCadastros) {
            api.get(`/cadastro/show`).then(response => {
                const data: CadastroResponse[] = response.data.cadastros;

                setCadastros(data);
            });
        }

        localStorage.setItem('@BotMobilidade:cadastros', JSON.stringify(cadastros));

        const storageMotoristas = localStorage.getItem('@BotMobilidade:motoristasativos');

        if (storageMotoristas === '[]' || !storageMotoristas) {
            api.get(`/motorista/ativos`).then(response => {
                const data: Motorista[] = response.data.motoristas;
                setMotoristas(data);
            });
        }

        localStorage.setItem('@BotMobilidade:motoristasativos', JSON.stringify(motoristas));

        const storageAplicativos = localStorage.getItem('@BotMobilidade:aplicativosativos');

        if (storageAplicativos === '[]' || !storageAplicativos) {
            api.get(`/aplicativo/ativos`).then(response => {
                const data: Aplicativo[] = response.data.aplicativos;
                setAplicativos(data);
            });
        }

        localStorage.setItem('@BotMobilidade:aplicativosativos', JSON.stringify(aplicativos));
    }, [cadastros, motoristas, aplicativos]);

    const onChangeMotorista = useCallback(
        (event) => {
            motoristas.forEach(motorista => {
                if (motorista.driverId === event.target.value) {
                    const motoristaValue = {
                        driverId: event.target.value,
                        driverName: motorista.driverName,
                        active: motorista.active
                    }
                    setMotorista(motoristaValue);
                }
            });
        },
        [motoristas],
    );

    const onChangeAplicativo = useCallback(
        (event) => {
            aplicativos.forEach(aplicativo => {
                if (aplicativo.aplicativoId === +event.target.value) {
                    const aplicativoValue = {
                        aplicativoId: +event.target.value,
                        nomeAplicativo: aplicativo.nomeAplicativo,
                        active: aplicativo.active
                    }
                    setAplicativo(aplicativoValue);
                }
            });
        },
        [aplicativos],
    );

    async function handleAddCadastro(
        e: FormEvent<HTMLFormElement>,
    ): Promise<void> {
        e.preventDefault();

        if (!newNumeroAplicativo) {
            setInputError('Digite o id do motorista no aplicativo');
            return;
        }

        try {

            var request = {
                numeroAplicativo: newNumeroAplicativo,
                aplicativo: aplicativo,
                driver: motorista
            };

            const response = await api.post<CadastroResponse>('/cadastro/salvar', request);
            const cadastro = response.data;

            setCadastros([...cadastros, cadastro]);
            setNewNumeroAplicativo('');
            setInputError('');
        } catch (err) {
            setInputError('Erro ao cadastrar motorista no aplicativo');
        }
    }

    return (
        <>
            <img src={logoImg} alt="Cadastros" />
            <Header>
                <Title>Cadastros</Title>
                <Link to="/">
                    <FiChevronLeft size={16} />
                    Voltar
                </Link>
            </Header>

            <Menu hasError={!!inputError} onSubmit={handleAddCadastro}>
                <input
                    value={newNumeroAplicativo}
                    onChange={e => setNewNumeroAplicativo(e.target.value)}
                    placeholder="Id do motorista no aplicativo"
                />
                <select
                    name="selectMotorista" 
                    id="selectMotoristaId" 
                    onChange={ onChangeMotorista }
                    value={ motorista?.driverId }
                >
                    {motoristas?.map(motorista => (
                        <option 
                            key={motorista.driverId} 
                            value={motorista.driverId}>
                                {motorista.driverName}
                        </option>
                    ))}
                </select>
                <select
                    name="selectAplicativo" 
                    id="selectAplicativoId" 
                    onChange={ onChangeAplicativo }
                    value={ aplicativo?.aplicativoId }
                >
                    {aplicativos?.map(aplicativo => (
                        <option 
                            key={aplicativo.aplicativoId} 
                            value={aplicativo.aplicativoId}>
                                {aplicativo.nomeAplicativo}
                        </option>
                    ))}
                </select>
                <button type="submit">
                    Cadastrar motorista
                </button>
            </Menu>

            {inputError && <Error>{inputError}</Error>}

            <Body>
                {cadastros?.map(cadastro => (
                    <Dados key={cadastro.cadastroId}>
                        <Line>
                            {cadastro.numeroAplicativo}
                        </Line>
                        <Line>
                            {cadastro.driver.driverName}
                        </Line>
                        <Line>
                            {cadastro.aplicativo.nomeAplicativo}
                        </Line>
                    </Dados>
                ))}
            </Body>
        </>
    );
};

export default Cadastros;