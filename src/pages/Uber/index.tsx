import React, { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';

import logoImg from '../../assets/uber.png';
import { FiChevronLeft } from 'react-icons/fi';

import { Title, Header, DateForm, DateTitle } from './styles';

import '@natscale/react-calendar/dist/main.css';
import { Calendar } from '@natscale/react-calendar';

const Uber: React.FC = () => {
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
            <img src={logoImg} alt="Uber" />
            <Header>
                <Title>Uber</Title>
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
        </>
    );
};

export default Uber;