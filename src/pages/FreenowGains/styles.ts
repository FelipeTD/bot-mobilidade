import styled from 'styled-components';

export const Title = styled.h1`
    font-size: 48px;
    color: #3A3A3A;
    margin-top: 10px;
`;

export const Header = styled.header`
    display: flex;
    align-items: center;
    justify-content: space-between;

    a {
        display: flex;
        align-items: center;
        text-decoration: none;
        color: #93A9B8;
        transition: color 0.2s;
        padding-right: 75px;

        &:hover {
            color: #666;
        }

        svg {
            margin-right: 2px;
        }
    }
`;

export const ResultHeader = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: space-between;

    margin-top: 20px;
`;

export const TotalHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;

    div {
        margin-right: 200px;
        margin-bottom: 20px;

        & + div {
            margin-right: 0;
        }

        h2 {
            color: #637689;
            font-size: 16px;
            margin-bottom: 16px;
        }

        p {
            font-size: 56px;
        }
    }
`;

export const Select = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    

    div {
        select {
            width: 340px;
            height: 40px;
            box-sizing: border-box;
            border-radius: 5px;
            background: #FFF;
            color: #001E3E;
        }
    }
`;

export const DriverData = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;

    margin-top: 30px;
`;

export const DriverCard = styled.div`
    width: 220px;
    height: 480px;
    background: #FFF;
`;

export const DriverLine = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;

    padding: 15px 15px 1px 15px;

    p {
        font-size: 12px;
    }

`;

export const DriverLineHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: left;
    font-size: 12px;

    div#image {
        margin-top: 30px;
        margin-left: 15px;

        img {
            width: 50px;
            height: 50px;
            border-radius: 50%;
        }
    }

    div {
        margin: 5px 5px 0 5px;

        p {
            margin-top: 5px;
        }
    }


`;