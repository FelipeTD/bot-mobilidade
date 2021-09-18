import React, { useCallback, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';

import logoImg from '../../assets/freenow.jpg';
import { FiChevronLeft } from 'react-icons/fi';

import api from '../../services/api';

import {
    Title,
    Header,
    DateForm,
    DateTitle,
} from './styles';

import '@natscale/react-calendar/dist/main.css';
import { Calendar } from '@natscale/react-calendar';
import Table from '../../components/Table';
import { Styles } from '../../components/Table/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

interface Reservation {
    driverId: string;
    driverName: string;
    routes: string;
    hour: string;
    travel: string;
    value: string;
    extra: string;
    service: string;
    paymentMethods: string;
}

const Freenow: React.FC = () => {
    const columns = useMemo(
        () => [
            {
                Header: 'Histórico de reservas',
                columns: [
                    {
                        Header: 'ID do motorista',
                        accessor: 'driverId',
                        sortType: 'alphanumeric',
                    },
                    {
                        Header: 'Motorista',
                        accessor: 'driverName',
                        sortType: 'alphanumeric',
                    },
                    {
                        Header: 'Rota',
                        accessor: 'routes',
                        sortType: 'alphanumeric',
                    },
                    {
                        Header: 'Hora de recolha/largada',
                        accessor: 'hour',
                        sortType: 'basic',
                    },
                    {
                        Header: 'Viagem',
                        accessor: 'travel',
                        sortType: 'alphanumeric',
                    },
                    {
                        Header: 'Valor',
                        accessor: 'value',
                        sortType: 'alphanumeric',
                    },
                    {
                        Header: 'Extra',
                        accessor: 'extra',
                        sortType: 'alphanumeric',
                    },
                    {
                        Header: 'Serviço',
                        accessor: 'service',
                        sortType: 'alphanumeric',
                    },
                    {
                        Header: 'Métodos de pagamento',
                        accessor: 'paymentMethods',
                        sortType: 'alphanumeric',
                    },
                ],
            }
        ],
        []
    );
    const [value, setValue] = useState<Date>();
    const [reservations, setReservations] = useState<Reservation[]>([
        {
            driverId: '',
            driverName: '',
            routes: '',
            hour: '',
            travel: '',
            value: '',
            extra: '',
            service: '',
            paymentMethods: ''
        }
    ]);

    const onChange = useCallback(
        (value) => {
            api.get(`/freenow/reservas`, {
                params: {
                    dataInicio: value[0],
                    dataFim: value[1]
                }
            }).then(response => {
                const data: Reservation[] = response.data.reservationHistoryData;
                setReservations(data);
                console.log(value);
            });            

            setValue(value);
        },
        [setValue],
    );

    return (
        <>
            <img src={logoImg} alt="Free now" />
            <Header>
                <Title>Free Now</Title>
                <Link to="/">
                    <FiChevronLeft size={16} />
                    Voltar
                </Link>
            </Header>
            <DateTitle>Selecione a data inicial e final</DateTitle>
            <DateForm>
                <Calendar
                    isRangeSelector={true}
                    startOfWeek={0}
                    value={value}
                    onChange={onChange}
                />
            </DateForm>
            <CssBaseline />
            <Styles>
                <Table columns={columns} data={reservations} />
            </Styles>
        </>
    );
};

export default Freenow;