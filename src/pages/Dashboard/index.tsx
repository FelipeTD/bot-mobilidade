import React, { useState, FormEvent, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { FiChevronsRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import api from '../../services/api';

import logoImg from '../../assets/logo.png';

import { Title, Repositories, Header, Form, Menu } from './styles';

interface Repository {
    id: string;
    icon: string;
    name: string;
    description: string;
    url: string;
}

const Dashboard: React.FC = () => {
    const history = useHistory();

    const [repositories, setRepositories] = useState<Repository[]>(() => {
        const storageRepositories = localStorage.getItem('@BotMobilidade:repositories');

        if (storageRepositories) {
            return JSON.parse(storageRepositories);
        } else {
            return [];
        }
    });

    useEffect(() => {
        const storageToken = localStorage.getItem('@BotMobilidade:token');

        if (storageToken === "") {
            history.push('login');
        } else {
            history.push('/');
        }

        const storageRepositories = localStorage.getItem('@BotMobilidade:repositories');

        if (storageRepositories === '[]' || !storageRepositories) {
            api.get(`/dashboard`).then(response => {
                const data: Repository[] = response.data.dashboardList;
                setRepositories(data);
            });
        }

        localStorage.setItem('@BotMobilidade:repositories', JSON.stringify(repositories));
    }, [repositories, history]);

    async function handleLogout(event: FormEvent<HTMLFormElement>): Promise<void> {
        localStorage.setItem('@BotMobilidade:token', "");
    }

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

            <Repositories>
                {repositories.map(repository => (
                    <Link key={repository.id} to={repository.url}>
                        <img src={repository.icon} 
                            alt={repository.name}
                        />
                        <div>
                            <strong>{repository.name}</strong>
                            <p>{repository.description}</p>
                        </div>

                        <FiChevronsRight size={20} />
                    </Link>
                ))}
            </Repositories>
        </>
    );
};

export default Dashboard;