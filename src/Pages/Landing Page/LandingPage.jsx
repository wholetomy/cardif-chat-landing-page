import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { LandingPageContainer, CenterSquare, FieldsDiv, Field, Image } from './LandingPage.styles';
import assuntos from '../../Components/JSON/AssuntosJSON/Assuntos.json';

export default function LandingPage() {
    const [assuntosOptions, setAssuntosOptions] = useState([]);
    const [logo, setLogo] = useState(null);

    const location = useLocation();

    useEffect(() => {
        setAssuntosOptions(assuntos);
    }, []);

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const partner = queryParams.get('partner');

        const loadDefaultImage = async () => {
            const defaultImage = await import('../../Components/Images/cardif_logo.png');
            setLogo(defaultImage.default);
        };

        if (partner) {
            const supportedExtensions = ['PNG', 'png', 'JPG', 'jpg', 'JPEG', 'jpeg'];

            const loadImage = async () => {
                let logoFound = false;
                for (const extension of supportedExtensions) {
                    try {
                        const image = await import(`../../Components/Images/${partner}.${extension}`);
                        setLogo(image.default);
                        logoFound = true;
                        break;
                    } catch (error) {
                        console.error(`Failed to load image with extension ${extension} for partner ${partner}:`, error);
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
                            <input type="text" maxLength={100} />
                        </Field>
                        <Field>
                            <span>CPF:</span>
                            <input type="text" />
                        </Field>
                        <Field>
                            <span>Assunto:</span>
                            <select name="assunto" id="assunto">
                                <option value=""></option>
                                {assuntosOptions.map((assunto) => (
                                    <option key={assunto.id} value={assunto.id}>
                                        {assunto.assunto}
                                    </option>
                                ))}
                            </select>
                        </Field>
                        <Field>
                            <button>OK</button>
                        </Field>
                        <span>Horário de atendimento de segunda a sábado, das 9:00 às 21:00.</span>
                    </FieldsDiv>
                </CenterSquare>
            </LandingPageContainer>
        </>
    );
}
