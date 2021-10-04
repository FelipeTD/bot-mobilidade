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