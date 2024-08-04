class Processo {
    constructor(id, chegada, execucao, deadline) {
        this._id = id; // Identificador único do processo
        this._arrivalTime = chegada; // Tempo de chegada do processo
        this._burstTime = execucao; // Tempo de execução necessário
        this._deadline = deadline; // Prazo limite para conclusão
        console.log(this._id, this._arrivalTime, this._burstTime, this._deadline); // Corrigido para usar os nomes corretos
    }

    // Getters
    get id() {
        return this._id;
    }

    get arrivalTime() {
        return this._arrivalTime;
    }

    get burstTime() {
        return this._burstTime;
    }

    get deadline() {
        return this._deadline;
    }

    // Setters
    set id(value) {
        this._id = value;
    }

    set arrivalTime(value) {
        this._arrivalTime = value;
    }

    set burstTime(value) {
        this._burstTime = value;
    }

    set deadline(value) {
        this._deadline = value;
    }
}

export default Processo;