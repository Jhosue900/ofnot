import React from "react";
import { Center, ChakraProvider } from '@chakra-ui/react'
import { Input } from '@chakra-ui/react'
import { Text } from '@chakra-ui/react'
import { Button, ButtonGroup } from '@chakra-ui/react'
import { useState } from "react";

function NextGrade() {

    const [firstterm, setFirstterm] = useState('');
    const [res, setRes] = useState(null);

    const calculateNextGrade = async () => {
        try {
            const response = await fetch('https://notescalculator.onrender.com/fortheyearoneterm', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ firstterm }),
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
                Nota del primer periodo:
            </Text><br /><br /></center>
            <center><Input htmlSize={5} width='30%' type="number" value={firstterm}
                onChange={(e) => setFirstterm(e.target.value)} /></center><br />
            <center><Button colorScheme='teal' variant='outline' width='30%' onClick={calculateNextGrade}>
                Calcular
            </Button></center><br/>

            <center><Text>En el siguiente periodo debes sacar: <Text as='u'>{res}</Text> </Text></center>
        </ChakraProvider>
    )
}


export default NextGrade