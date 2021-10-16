import React, { useState, useEffect,  useCallback, FormEvent } from 'react';
import { Link } from 'react-router-dom';

import logoImg from '../../assets/registros.png';
import { FiChevronLeft } from 'react-icons/fi';

import api from '../../services/api';

import { 
    Title, 
    Header,
    Body,
    Line,
    Dados,
    Menu,
    Error,
    DateForm,
} from './styles';

import { Calendar } from '@natscale/react-calendar';
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

interface Cadastro {
    cadastroId: number;
    numeroAplicativo: string;
    aplicativo: Aplicativo;
    driver: Driver;
}

interface Registro {
    registroData: string;
    registroId: number;
    valor: number;
    cadastro: Cadastro;
}

interface CadastroResponse {
    cadastroId: number;
    numeroAplicativo: string;
    aplicativo: Aplicativo;
    driver: Driver;
}

interface RegistroRequest {
    cadastroId: number | undefined;
    valor: number;
    registroData: string;
}

const Registros: React.FC = () => {
    const [registros, setRegistros] = useState<Registro[]>(() => {
        const storageRegistros = localStorage.getItem('@BotMobilidade:registros');

        if (storageRegistros) {
            return JSON.parse(storageRegistros);
        } else {
            return [];
        }
    });
    const [cadastros, setCadastros] = useState<CadastroResponse[]>(() => {
        const storageCadastros = localStorage.getItem('@BotMobilidade:cadastros');

        if (storageCadastros) {
            return JSON.parse(storageCadastros);
        } else {
            return [];
        }
    });
    const [cadastro, setCadastro] = useState<Cadastro>(cadastros[0]);

    const [inputError, setInputError] = useState('');
    const [registroData, setRegistroData] = useState<Date>();
    const [valor, setValor] = useState<string>('');

    useEffect(() => {
        const storageRegistros = localStorage.getItem('@BotMobilidade:registros');

        if (storageRegistros === '[]' || !storageRegistros) {
            api.get(`/registro`).then(response => {
                const data: Registro[] = response.data.registros;

                setRegistros(data);
            });
        }

        localStorage.setItem('@BotMobilidade:registros', JSON.stringify(registros));

        const storageCadastros = localStorage.getItem('@BotMobilidade:cadastros');

        if (storageCadastros === '[]' || !storageCadastros) {
            api.get(`/cadastro/show`).then(response => {
                const data: CadastroResponse[] = response.data.cadastros;

                setCadastros(data);
            });
        }

        localStorage.setItem('@BotMobilidade:cadastros', JSON.stringify(cadastros));

    }, [registros, cadastros]);

    const onChangeCadastro = useCallback(
        (event) => {
            cadastros.forEach(cadastro => {
                if (+cadastro.cadastroId === +event.target.value) {
                    setCadastro(cadastro);
                }
            });
        },
        [cadastros],
    );

    const onChange = useCallback(
        (value) => {          
            setRegistroData(value);
        },
        [setRegistroData],
    );

    async function handleAddRegistro(
        e: FormEvent<HTMLFormElement>,
    ): Promise<void> {
        e.preventDefault();

        if (!valor) {
            setInputError('Digite o valor a ser registrado');
            return;
        }

        try {
            let dataValue = '';
            if (registroData) {                
                dataValue = registroData.toLocaleString();
            }

            var request: RegistroRequest = {
                cadastroId: cadastro.cadastroId,
                valor: +valor,
                registroData: dataValue
            }

            const response = await api.post<Registro>('/registro', request);
            const registro = response.data;

            setRegistros([...registros, registro]);
            setValor('');
            setInputError('');
        } catch (err) {
            setInputError('Erro ao salvar registro');
        }
    }

    return (
        <>
            <img src={logoImg} alt="Registros" />
            <Header>
                <Title>Registros</Title>
                <Link to="/">
                    <FiChevronLeft size={16} />
                    Voltar
                </Link>
            </Header>

            <DateForm>
                <Calendar
                    isRangeSelector={false}
                    startOfWeek={0}
                    value={registroData}
                    onChange={onChange}
                />
            </DateForm>

            <Menu hasError={!!inputError} onSubmit={handleAddRegistro}>
                <select
                    name="selectCadastro" 
                    id="selectCadastroId" 
                    onChange={ onChangeCadastro }
                    value={ cadastro?.cadastroId }
                >
                    {cadastros?.map(cadastro => (
                        <option 
                            key={cadastro.cadastroId} 
                            value={cadastro.cadastroId}>
                                {cadastro.aplicativo.nomeAplicativo} - {cadastro.driver.driverName}
                        </option>
                    ))}
                </select>
                <input
                    value={valor}
                    onChange={e => setValor(e.target.value)}
                    placeholder="Valor do registro"
                />
                <button type="submit">
                    Registrar
                </button>
            </Menu>

            {inputError && <Error>{inputError}</Error>}

            <Body>
                {registros?.map(registro => (
                    <Dados key={registro.registroId}>
                        <Line>
                            {registro.cadastro.driver.driverName}
                        </Line>
                        <Line>
                            {registro.cadastro.aplicativo.nomeAplicativo}
                        </Line>
                        <Line>
                            {registro.registroData.substring(0,10)}
                        </Line>
                        <Line>
                            {registro.valor}
                        </Line>
                    </Dados>
                ))}
            </Body>
        </>
    );
};

export default Registros;