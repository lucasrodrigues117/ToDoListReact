import { useState, useEffect } from "react";
import "./ListaTarefas.css";

function ListaTarefas() {
    const [tarefas, setTarefas] = useState([]);
    const [novaTarefa, setNovaTarefa] = useState("");
    const [ordem, setOrdem] = useState("data");

    // carregar tarefas
    useEffect(() => {
        const dados = JSON.parse(localStorage.getItem("tarefas"));
        if (dados) setTarefas(dados);
    }, []);

    // salvar tarefas
    useEffect(() => {
        localStorage.setItem("tarefas", JSON.stringify(tarefas));
    }, [tarefas]);

    const adicionarTarefa = () => {
        if (novaTarefa.trim() !== "") {
            const nova = {
                texto: novaTarefa,
                concluida: false,
                data: new Date().toISOString()
            };
            setTarefas([...tarefas, nova]);
            setNovaTarefa("");
        }
    };

    const removerTarefa = (index) => {
        setTarefas(tarefas.filter((_, i) => i !== index));
    };

    const toggleConcluida = (index) => {
        const novas = [...tarefas];
        novas[index].concluida = !novas[index].concluida;
        setTarefas(novas);
    };

    const ordenar = () => {
        let lista = [...tarefas];

        if (ordem === "alfabetica") {
            lista.sort((a, b) => a.texto.localeCompare(b.texto));
        } else {
            lista.sort((a, b) => new Date(a.data) - new Date(b.data));
        }

        return lista;
    };

    return (
        <div className="page">
            <h1 className="titulo">Gerenciador de Tarefas</h1>

            <div className="container">
                <h2>Lista de Tarefas</h2>

                <div className="input-area">
                    <input
                        type="text"
                        value={novaTarefa}
                        onChange={(e) => setNovaTarefa(e.target.value)}
                        placeholder="Digite uma tarefa..."
                    />
                    <button onClick={adicionarTarefa}>Adicionar</button>
                </div>

                <div className="filtros">
                    <span>Ordenar por:</span>
                    <select onChange={(e) => setOrdem(e.target.value)}>
                        <option value="data">Data</option>
                        <option value="alfabetica">Alfabética</option>
                    </select>
                </div>

                <ul>
                    {ordenar().map((tarefa, index) => (
                        <li key={index} className={tarefa.concluida ? "concluida" : ""}>
                            <span>{tarefa.texto}</span>

                            <div className="acoes">
                                <button onClick={() => toggleConcluida(index)}>
                                    {tarefa.concluida ? "↩" : "✔"}
                                </button>

                                <button onClick={() => removerTarefa(index)}>
                                    ✖
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default ListaTarefas;