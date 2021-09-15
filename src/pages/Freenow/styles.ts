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

export const DateForm = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
    margin-bottom: 20px;
    
    section {
        .arc_view-days-of-month .arc_view_cell .arc_view_cell_value {
            border-radius: 50%;
        }
    }
    
`;

export const DateTitle = styled.h3`
    font-size: 20px;
    color: #3A3A3A;
    margin-top: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
`;