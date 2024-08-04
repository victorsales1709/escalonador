import React from 'react';
import './styles/scheduleMatrix.css';

function SchedulerConfig({ setAlgorithm, setQuantum, setOverhead }) {
    return (
        <div>
            <h2>Configuração do Escalonador</h2>
            <div>
                <label>Algoritmo:</label>
                <select onChange={(e) => setAlgorithm(e.target.value)}>
                    <option value="FIFO">FIFO</option>
                    <option value="SJF">SJF</option>
                    <option value="EDF">EDF</option>
                    <option value="RoundRobin">Round Robin</option>
                </select>
            </div>
            <div>
                <label>Quantum:</label>
                <input type="number" onChange={(e) => setQuantum(Number(e.target.value))} />
            </div>
            <div>
                <label>Overhead:</label>
                <input type="number" onChange={(e) => setOverhead(Number(e.target.value))} />
            </div>
        </div>
    );
}

export default SchedulerConfig;
