import './App.css';
import FinalGrade from './components/finalgrade';
import OnlyGrades from './components/solonotas';
import NextGrade from './components/nextgrade';
import { Text } from '@chakra-ui/react'
import { ChakraProvider } from '@chakra-ui/react'
import { Select } from '@chakra-ui/react'
import { useState } from "react";

const App = () => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const renderBody = () => {
    switch (selectedOption) {
      case "onlygrades":
        return <OnlyGradesBody />;
      case "finalgrade":
        return <FinalGradeBody />;
      case "nextgrade":
        return <NextGradeBody />;
      default:
        return null;
    }
  };

  return (
    <ChakraProvider>
      <div className="App">
        <center>
          <Text fontSize="3xl" as="i">
            CALCULA TUS NOTAS
          </Text>
        </center><br/>

        <center>
          <Select placeholder="Selecciona una opción" onChange={handleOptionChange} size='md' width="40%">
            <option value="onlygrades">Seguimiento</option>
            <option value="finalgrade">Nota final del periodo</option>
            <option value="nextgrade">¿Cuanto necesito sacar en el segundo periodo?</option>
          </Select>
        </center>

        {renderBody()}
      </div>
    </ChakraProvider>
  );
};

const OnlyGradesBody = () => {
  // Componente para mostrar cuando se selecciona "Seguimiento"
  return <OnlyGrades/>
};

const FinalGradeBody = () => {
  // Componente para mostrar cuando se selecciona "Nota final del periodo"
  return <FinalGrade/>
};

const NextGradeBody = () => {
  // Componente para mostrar cuando se selecciona "¿Cuanto necesito sacar en el segundo periodo?"
  return <NextGrade/>
};

export default App;
