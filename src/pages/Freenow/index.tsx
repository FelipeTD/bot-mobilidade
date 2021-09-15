import React, { useCallback, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';

import logoImg from '../../assets/freenow.jpg';
import { FiChevronLeft } from 'react-icons/fi';

import {
    Title,
    Header,
    DateForm,
    DateTitle,
} from './styles';

import '@natscale/react-calendar/dist/main.css';
import { Calendar } from '@natscale/react-calendar';
import Table from '../../components/Table';
import TextFilter from '../../components/TextFilter';
import { Styles } from '../../components/Table/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

const Freenow: React.FC = () => {
    const data = useMemo(() =>
        [
            {
                name: 'Kim Parrish',
                address: '4420 Valley Street, Garnerville, NY 10923',
                date: '07/11/2020',
                order: '87349585892118',
            },
            {
                name: 'Michele Castillo',
                address: '637 Kyle Street, Fullerton, NE 68638',
                date: '07/11/2020',
                order: '58418278790810',
            },
            {
                name: 'Eric Ferris',
                address: '906 Hart Country Lane, Toccoa, GA 30577',
                date: '07/10/2020',
                order: '81534454080477',
            },
            {
                name: 'Gloria Noble',
                address: '2403 Edgewood Avenue, Fresno, CA 93721',
                date: '07/09/2020',
                order: '20452221703743',
            },
            {
                name: 'Darren Daniels',
                address: '882 Hide A Way Road, Anaktuvuk Pass, AK 99721',
                date: '07/07/2020',
                order: '22906126785176',
            },
            {
                name: 'Ted McDonald',
                address: '796 Bryan Avenue, Minneapolis, MN 55406',
                date: '07/07/2020',
                order: '87574505851064',
            },
        ],
        []
    );

    const columns = useMemo(
        () => [
            {
                Header: 'User Info',
                columns: [
                    {
                        Header: 'Name',
                        accessor: 'name',
                        sortType: 'alphanumeric',
                    },
                    {
                        Header: 'Address',
                        accessor: 'address',
                        sortType: 'alphanumeric',
                    },
                ],
            },
            {
                Header: 'Order Info',
                columns: [
                    {
                        Header: 'Date',
                        accessor: 'date',
                        sortType: 'basic',
                    },
                    {
                        Header: 'Order #',
                        accessor: 'order',
                        sortType: 'basic',
                    },
                ],
            },
        ],
        []
    );

    const defaultColumn = React.useMemo(
        () => ({
            Filter: TextFilter,
        }),
        []
    );

    const [value, setValue] = useState();

    const onChange = useCallback(
        (value) => {
            console.log(value);
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
                <Table columns={columns} data={data} filter={defaultColumn} />
            </Styles>
        </>
    );
};

export default Freenow;