import React from 'react';
import { Link } from 'react-router-dom';

import logoImg from '../../assets/cadastros.png';
import { FiChevronLeft } from 'react-icons/fi';

import { Title, Header } from './styles';

import '@natscale/react-calendar/dist/main.css';

const Cadastros: React.FC = () => {
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
        </>
    );
};

export default Cadastros;