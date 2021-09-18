import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';

import logoImg from '../../assets/freenow.jpg';
import { FiChevronLeft } from 'react-icons/fi';

import { 
    Title, 
    Header, 
    ResultHeader, 
    TotalHeader, 
    Select,
    DriverData,
    DriverCard,
    DriverLine,
    DriverLineHeader,
} from './styles';

interface WeekDate {
    weekCode: string;
    description: string;
}

interface Totals {
    totalTours: number;
    totalQuests: number;
}

interface DriverTotals {
    gross: number;
    grossWithoutCommission: number;
    commission: number;
    totalTours: number;
}

interface Gross {
    gross: number;
}

interface Tours {
    grossApp: number;
    grossCash: number;
    gross: number;
    countPaidByApp: number;
    countPaidByCash: number;
}

interface DriverEarnings {
    totals: DriverTotals;
    tours: Tours;
    tips: Gross;
    currency: string;
    quests: Gross;
    tolls: Gross;
    others: Gross;
    cancellationFees: Gross;
    driverProfilePictureUrl: string;
    driverPublicName: string;
    hailingType: string;
}

interface GainsData {
    index: string;
    driverEarnings: DriverEarnings[];
}

interface Gains {
    totals: Totals;
    currency: string;
    gainsData: GainsData[];
}

const FreenowGains: React.FC = () => {
    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const [value, setValue] = useState<string>(() => {
        const storageDates = localStorage.getItem('@BotMobilidade:weekDatesFreenow');

        if (storageDates) {
            return JSON.parse(storageDates)[0].weekCode;
        } else {
            return "51015468";
        }
    });
    const [requestDate, setRequestDate] = useState<string>();
    const [gains, setGains] = useState<Gains>();

    const [dates, setDates] = useState<WeekDate[]>(() => {
        const storageDates = localStorage.getItem('@BotMobilidade:weekDatesFreenow');

        if (storageDates) {
            return JSON.parse(storageDates);
        } else {
            return [];
        }
    });

    const onChange = useCallback(
        (event) => {
            api.get(`/freenow/ganhos`, {
                params: {
                    weekCode: event.target.value
                }
            }).then(response => {
                setGains(response.data);
            });

            setValue(event.target.description);
        },
        [setValue],
    );

    useEffect(() => {
        const storageDates = localStorage.getItem('@BotMobilidade:weekDatesFreenow');
        const storageTime = localStorage.getItem('@BotMobilidade:weekRefreshTime');

        if (!isLoaded) {
            api.get(`/freenow/ganhos`, {
                params: {
                    weekCode: value
                }
            }).then(response => {
                setGains(response.data);
            });
            setIsLoaded(true);
        }

        if ((storageDates === '[]' || !storageDates)
            || storageTime !== new Date().getDate().toString()) {

            api.get(`/freenow/datas`).then(response => {
                setDates(response.data.responseRanges);
                setRequestDate(response.data.requestDate);
            });

            localStorage.setItem(
                '@BotMobilidade:weekDatesFreenow', 
                JSON.stringify(dates)
            );

            localStorage.setItem(
                '@BotMobilidade:weekRefreshTime', 
                requestDate ? requestDate : ""
            );
        }
    }, [dates, requestDate, value, isLoaded]);

    return (
        <>
            <img src={logoImg} alt="Free now" />
            <Header>
                <Title>Freenow - Ganhos</Title>
                <Link to="/">
                    <FiChevronLeft size={16} />
                    Voltar
                </Link>
            </Header>
            <ResultHeader>
                <TotalHeader>
                    <div>
                        <h2>TOTAL DE VIAGENS</h2>
                        <p>{gains?.totals.totalTours}</p>
                    </div>
                    <div>
                        <h2>BÔNUS COMPLETADOS</h2>
                        <p>{gains?.totals.totalQuests}</p>
                    </div>
                </TotalHeader>
                <Select>
                    <div>
                        <select 
                            name="weekName" 
                            id="weekId" 
                            onChange={ onChange }
                            value={ value }
                        >
                            {dates?.map(({ weekCode, description}) => (
                                <option key={weekCode} value={weekCode}>
                                    {description}
                                </option>
                            ))}
                        </select>
                    </div>
                </Select>
            </ResultHeader>
            <div>Resumo por motorista</div>
            {gains?.gainsData.map(({ index, driverEarnings }) => (
                <DriverData>
                    {driverEarnings.map(({ 
                        driverProfilePictureUrl, 
                        driverPublicName,
                        hailingType,
                        totals: {
                            totalTours,
                            grossWithoutCommission,
                            commission,
                            gross,
                        },
                        tours,
                        cancellationFees,
                        tips,
                        quests,
                        tolls,
                        others,
                    }) => (
                        <DriverCard>
                            <DriverLineHeader>
                                <div id="image">
                                    <img alt={driverPublicName} src={driverProfilePictureUrl} />
                                </div>
                                <div>
                                    <p>{driverPublicName}</p>
                                    <p>{hailingType}</p>
                                </div>
                            </DriverLineHeader>
                            <DriverLine>
                                <p>Viagens({totalTours})</p>
                                <p>€ {tours.gross}</p>
                            </DriverLine>
                            <DriverLine>
                                <p>Pago via app ({tours.countPaidByApp})</p>
                                <p>€ {tours.grossApp}</p>
                            </DriverLine>
                            <DriverLine>
                                <p>Pagamentos fora da app ({tours.countPaidByCash})</p>
                                <p>€ {tours.grossCash}</p>
                            </DriverLine>
                            <DriverLine>
                                <p>Cancelamentos</p>
                                <p>€ {cancellationFees.gross}</p>
                            </DriverLine>
                            <DriverLine>
                                <p>Valor total</p>
                                <p>€ {grossWithoutCommission}</p>
                            </DriverLine>
                            <DriverLine>
                                <p>Comissão</p>
                                <p>-€ {commission}</p>
                            </DriverLine>
                            <DriverLine>
                                <p>Gorjetas</p>
                                <p>€ {tips.gross}</p>
                            </DriverLine>
                            <DriverLine>
                                <p>Incentivos</p>
                                <p>€ {quests.gross}</p>
                            </DriverLine>
                            <DriverLine>
                                <p>Portagens</p>
                                <p>€ {tolls.gross}</p>
                            </DriverLine>
                            <DriverLine>
                                <p>Outros</p>
                                <p>€ {others.gross}</p>
                            </DriverLine>
                            <DriverLine>
                                <p>Total devido</p>
                                <p>€ {gross}</p>
                            </DriverLine>
                            <DriverLine>
                                <p>IVA Incluído</p>
                            </DriverLine>
                        </DriverCard>
                    ))}
                </DriverData>
            ))}
        </>
    );
};

export default FreenowGains;