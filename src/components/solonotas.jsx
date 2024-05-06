import React, { useState } from "react";
import { ChakraProvider, Input, Text, Button } from '@chakra-ui/react';
import { Alert, AlertIcon } from '@chakra-ui/react'

function OnlyGrades() {
    const [numberofgrades, setNumberofgrades] = useState('');
    const [grades, setGrades] = useState([]);
    const [res, setRes] = useState(null);

    const handleNumberChange = (e) => {
        const numGrades = parseInt(e.target.value);
        if (numGrades > 0) {
            setNumberofgrades(numGrades);
            setGrades(Array(numGrades).fill(''));
        } else {
            setNumberofgrades('');
            setGrades([]);
        }
    };

    const handleGradeChange = (index, e) => {
        const { value } = e.target;
        const updatedGrades = [...grades];
        updatedGrades[index] = value;
        setGrades(updatedGrades);
    };

    const calculateOnlyGrades = async () => {
        try {
            const response = await fetch('https://notescalculator.onrender.com/gradesonly', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ numberofgrades, grades }),
            });
            const data = await response.json();
            setRes(data.responseServer)
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <ChakraProvider>
            <br /><center><hr width="60%" /></center><br />
            <center><Text fontSize="xl" as="i">
                Numero de notas en el seguimiento:
            </Text><br /><br /></center>
            <center><Input htmlSize={5} width='30%' type="number" value={numberofgrades}
                onChange={handleNumberChange} /></center><br />
            <center><Text fontSize="xl" as="i">
                Notas en el seguimiento:
            </Text><br /><br /></center>
            {grades.map((grade, index) => (
                <center key={index}>
                    <Input htmlSize={5} width='30%' type="number" value={grade}
                        onChange={(e) => handleGradeChange(index, e)} />
                    <br /><br />
                </center>
            ))}
            <br />

            <center><Button colorScheme='teal' variant='outline' width='30%' onClick={calculateOnlyGrades}>
                Calcular
            </Button></center><br />

            {res !== null && (
                <center>
                    {res >= 3 && res <= 3.5 ? (
                        <Alert status='warning' width="30%">
                            <AlertIcon />
                            Llevas la materia en (<Text as='u'>{res}</Text>), puede mejorar
                        </Alert>
                    ) : (
                        res < 3 ? (
                            <Alert status='error' width="30%">
                                <AlertIcon />
                                Llevas la materia en (<Text as='u'>{res}</Text>), DEBE mejorar
                            </Alert>
                        ) : (
                            3.5 < res && res < 4 ? (
                                <Alert status='info' width="30%">
                                    <AlertIcon />
                                    Llevas la materia en (<Text as='u'>{res}</Text>), vas bien
                                </Alert>
                            ):(
                                res >= 4 ? (
                                    <Alert status='success' width="30%">
                                    <AlertIcon />
                                    Llevas la materia en (<Text as='u'>{res}</Text>), tremendo
                                </Alert>
                                ):(
                                    "No hay un valor"
                                )
                            )
                        )
                    )}
                </center>
            )}
        </ChakraProvider>
    )
}

export default OnlyGrades;
