import React, { useState } from 'react';

function ProcessList({ processes, addProcess, removeProcess }) {
    const [arrivalTime, setArrivalTime] = useState('');
    const [burstTime, setBurstTime] = useState('');
    const [deadline, setDeadline] = useState('');

    const handleAddProcess = () => {
        // Verifica se os valores são válidos antes de adicionar o processo
        if (arrivalTime >= 0 && burstTime > 0 && deadline >= 0) {
            addProcess({ arrivalTime: Number(arrivalTime), burstTime: Number(burstTime), deadline: Number(deadline) });
            // Limpa os campos dos inputs após adicionar o processo
            setArrivalTime('');
            setBurstTime('');
            setDeadline('');
        } else {
            alert("Valores inválidos para o processo");
        }
    };

    return (
        <div>
            <h2>Lista de Processos</h2>
            {processes.map((process) => (
                <div key={process.id}>
                    <span>Processo {process.id}: </span>
                    <span>Chegada: {process.arrivalTime}, </span>
                    <span>Execução: {process.burstTime}, </span>
                    <span>Deadline: {process.deadline} </span>
                    <button onClick={() => removeProcess(process.id)}>Remover</button>
                </div>
            ))}
            <div>
                <label>Chegada:</label>
                <input
                    type="number"
                    value={arrivalTime}
                    onChange={(e) => setArrivalTime(e.target.value)}
                    placeholder="Insira o tempo de chegada"
                />
                <label>Execução:</label>
                <input
                    type="number"
                    value={burstTime}
                    onChange={(e) => setBurstTime(e.target.value)}
                    placeholder="Insira o tempo de execução"
                />
                <label>Deadline:</label>
                <input
                    type="number"
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                    placeholder="Insira o prazo limite"
                />
                <button onClick={handleAddProcess}>Adicionar Processo</button>
            </div>
        </div>
    );
}

export default ProcessList;
