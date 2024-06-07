import styled from "styled-components";

export const LandingPageContainer = styled.div`
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #c7c7cf;
`;

export const CenterSquare = styled.div`
    background-color: #ffffff;
    width: 400px;
    display: flex;
    align-items: center;
    flex-direction: column;
    padding: 25px;
    border-radius: 10px;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
`;

export const FieldsDiv = styled.div`
`;

export const Image = styled.div`
    height: 150px;
    width: 100%;
    overflow: hidden;
    display: flex;
    justify-content: center;

    img {
        object-fit: contain;
        width: 100%;
    }
`;

export const Field = styled.div`
    display: flex;
    flex-direction: column;
    margin: 10px 0px;

    input, select {
        height: 34px;
        padding: 6px 8px;
        border-radius: 4px;
        border: 1px solid #090909;
    }

    input:focus, select:focus {
        border: 2px solid #00965E;
        outline: none;
    }

    button {
        background-color: #00965E;
        color: #ffffff;
        width: 25%;
        text-decoration: none;
        outline: none;
        border: none;
        padding: 8px;
        border-radius: 4px;
        cursor: pointer;
    }

    button:hover {
        background-color: #00784B;
        transition: .1s all ease-in-out;
    }
`;