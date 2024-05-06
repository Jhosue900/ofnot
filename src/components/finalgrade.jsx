import React, { useState } from "react";
import { ChakraProvider, Input, Text, Button } from '@chakra-ui/react';

function FinalGrade() {
    const [numberofgrades, setNumberofgrades] = useState('');
    const [grades, setGrades] = useState([]);
    const [testGrade, setTestGrade] = useState('');
    const [autoevaluation, setAutoevaluation] = useState('');
    const [res, setRes] = useState('');

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

    const handleTestGradeChange = (e) => {
        setTestGrade(e.target.value);
    };

    const handleAutoevaluationChange = (e) => {
        setAutoevaluation(e.target.value);
    };

    const calculateFinalGrade = async () => {
        try {
            const response = await fetch('https://notescalculator.onrender.com/finalgrade', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ numberofgrades, grades, testGrade, autoevaluation }),
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
            <center><Text>Nota del examen:</Text></center>
            <center><Input htmlSize={5} width='30%' type="number" value={testGrade}
                onChange={handleTestGradeChange} /></center><br /><br />

            <center><Text>Nota de la autoevaluación:</Text></center>
            <center><Input htmlSize={5} width='30%' type="number" value={autoevaluation}
                onChange={handleAutoevaluationChange} /></center><br /><br />

            <center><Button colorScheme='teal' variant='outline' width='30%' onClick={calculateFinalGrade}>
                Calcular
            </Button></center><br />

            <center><Text>La nota final del periodo es: <Text as='u'>{res}</Text> </Text></center><br/>
        </ChakraProvider>
    )
}

export default FinalGrade;
