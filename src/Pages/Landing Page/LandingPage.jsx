import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { LandingPageContainer, CenterSquare, FieldsDiv, Field, Image } from './LandingPage.styles';
import assuntos from '../../Components/JSON/AssuntosJSON/Assuntos.json';

function validarCPF(cpf) {
    cpf = cpf.replace(/[^\d]+/g, '');
    if (cpf.length !== 11) return false;
    let soma = 0;
    let resto;
    for (let i = 1; i <= 9; i++) soma += parseInt(cpf.substring(i-1, i)) * (11 - i);
    resto = (soma * 10) % 11;
    if ((resto === 10) || (resto === 11)) resto = 0;
    if (resto !== parseInt(cpf.substring(9, 10))) return false;
    soma = 0;
    for (let i = 1; i <= 10; i++) soma += parseInt(cpf.substring(i-1, i)) * (12 - i);
    resto = (soma * 10) % 11;
    if ((resto === 10) || (resto === 11)) resto = 0;
    if (resto !== parseInt(cpf.substring(10, 11))) return false;
    return true;
}

function validarCNPJ(cnpj) {
    cnpj = cnpj.replace(/[^\d]+/g, '');
    if (cnpj.length !== 14) return false;
    let tamanho = cnpj.length - 2;
    let numeros = cnpj.substring(0, tamanho);
    let digitos = cnpj.substring(tamanho);
    let soma = 0;
    let pos = tamanho - 7;
    for (let i = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--;
        if (pos < 2) pos = 9;
    }
    let resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado !== parseInt(digitos.charAt(0))) return false;
    tamanho += 1;
    numeros = cnpj.substring(0, tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (let i = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--;
        if (pos < 2) pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado !== parseInt(digitos.charAt(1))) return false;
    return true;
}

export default function LandingPage() {
    const [assuntosOptions, setAssuntosOptions] = useState([]);
    const [logo, setLogo] = useState(null);
    const [tipoDocumento, setTipoDocumento] = useState('CPF');
    const [documento, setDocumento] = useState('');
    const [erroDocumento, setErroDocumento] = useState('');
    const [nome, setNome] = useState('');
    const [assunto, setAssunto] = useState('');
    const [partner, setPartner] = useState(null);

    const location = useLocation();

    useEffect(() => {
        setAssuntosOptions(assuntos);
    }, []);

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const partnerParam = queryParams.get('partner');
        setPartner(partnerParam);

        const loadDefaultImage = async () => {
            const defaultImage = await import('../../Components/Images/cardif_logo.png');
            setLogo(defaultImage.default);
        };

        if (partnerParam) {
            const supportedExtensions = ['PNG', 'png', 'JPG', 'jpg', 'JPEG', 'jpeg'];

            const loadImage = async () => {
                let logoFound = false;
                for (const extension of supportedExtensions) {
                    try {
                        const image = await import(`../../Components/Images/${partnerParam}.${extension}`);
                        setLogo(image.default);
                        logoFound = true;
                        break;
                    } catch (error) {
                        //console.error(`Failed to load image with extension ${extension} for partner ${partner}:`, error);
                    }
                }
                if (!logoFound) {
                    loadDefaultImage();
                }
            };

            loadImage();
        } else {
            loadDefaultImage();
        }
    }, [location.search, location]);

    const handleDocumentoChange = (e) => {
        const value = e.target.value.replace(/\D/g, ''); // Remove non-numeric characters
        setDocumento(value);
        if (tipoDocumento === 'CPF' && !validarCPF(value)) {
            setErroDocumento('CPF inválido.');
        } else if (tipoDocumento === 'CNPJ' && !validarCNPJ(value)) {
            setErroDocumento('CNPJ inválido.');
        } else {
            setErroDocumento('');
        }
    };

    const handleTipoDocumentoChange = (e) => {
        setTipoDocumento(e.target.value);
        setDocumento('');
        setErroDocumento('');
    };

    const handleNomeChange = (e) => {
        setNome(e.target.value);
    };

    const handleAssuntoChange = (e) => {
        setAssunto(e.target.value);
    };

    const handleSubmit = async () => {
        if (erroDocumento) {
            alert('Por favor, corrija os erros antes de enviar.');
            return;
        }

        const data = {
            Nome: nome,
            CpfCnpj: documento,
            Assunto: assunto,
            Partner: partner
        };

        try {
            const response = await fetch('https://br425k19web01.lat.sitel-world.net/cardif_chat/api/SalvarLog', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Basic Y2FyZGlmQ2hhdDpRSHdxNGFpV2RoaUxlZ0VEemhLYVJXRE5P'
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error('Erro ao salvar os dados');
            }

            alert('Dados salvos com sucesso!');
        } catch (error) {
            console.error('Erro:', error);
            alert('Erro ao salvar os dados');
        }
    };

    return (
        <>
            <LandingPageContainer>
                <CenterSquare>
                    <Image>
                        {logo ? <img src={logo} alt="logo" /> : <p>Loading logo...</p>}
                    </Image>
                    <FieldsDiv>
                        <Field>
                            <span>Nome:</span>
                            <input type="text" maxLength={100} value={nome} onChange={handleNomeChange} />
                        </Field>
                        <Field>
                            <span>CPF ou CNPJ?</span>
                            <select name="tipoDocumento" id="tipoDocumento" onChange={handleTipoDocumentoChange}>
                                <option value="CPF">CPF</option>
                                <option value="CNPJ">CNPJ</option>
                            </select>
                        </Field>
                        <Field>
                            <span>{tipoDocumento}:</span>
                            <input 
                                type="text" 
                                value={documento} 
                                onChange={handleDocumentoChange} 
                                maxLength={tipoDocumento === 'CPF' ? 11 : 14} 
                            />
                            {erroDocumento && <p style={{color: 'red'}}>{erroDocumento}</p>}
                        </Field>
                        <Field>
                            <span>Assunto:</span>
                            <select name="assunto" id="assunto" value={assunto} onChange={handleAssuntoChange}>
                                <option value=""></option>
                                {assuntosOptions.map((assunto) => (
                                    <option key={assunto.id} value={assunto.id}>
                                        {assunto.assunto}
                                    </option>
                                ))}
                            </select>
                        </Field>
                        <Field>
                            <button onClick={handleSubmit}>Iniciar atendimento</button>
                        </Field>
                        <span>Horário de atendimento de segunda a sábado, das 9:00 às 21:00.</span>
                    </FieldsDiv>
                </CenterSquare>
            </LandingPageContainer>
        </>
    );
}
