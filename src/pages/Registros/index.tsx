import React from 'react';
import { Link } from 'react-router-dom';

import logoImg from '../../assets/registros.png';
import { FiChevronLeft } from 'react-icons/fi';

import { Title, Header } from './styles';

import '@natscale/react-calendar/dist/main.css';

const Registros: React.FC = () => {
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
        </>
    );
};

export default Registros;