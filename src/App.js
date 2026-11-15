import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [form, setForm] = useState({
    nome: '',
    cnpj: '',
    endereco: '',
    telefone: '',
    email: '',
    contatoPrincipal: ''
  });
  const [mensagem, setMensagem] = useState('');
  const [erro, setErro] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensagem('');
    setErro('');

    try {
      await axios.post('http://localhost:3000/fornecedores', form);
      setMensagem('Fornecedor cadastrado com sucesso!');
      setForm({
        nome: '',
        cnpj: '',
        endereco: '',
        telefone: '',
        email: '',
        contatoPrincipal: ''
      });
    } catch (err) {
      setErro('Erro ao cadastrar fornecedor. Verifique se o servidor está rodando.');
    }
  };

  return (
    <div className="container">
      <div className="header">
        <h1>Cadastro de Fornecedor</h1>
        <p>Sistema de Controle de Estoque e Prazos</p>
      </div>

      {mensagem && <div className="alert alert-success">{mensagem}</div>}
      {erro && <div className="alert alert-error">{erro}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nome da Empresa *</label>
          <input
            type="text"
            name="nome"
            placeholder="Ex: Distribuidora Norte Ltda"
            value={form.nome}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>CNPJ *</label>
            <input
              type="text"
              name="cnpj"
              placeholder="00.000.000/0000-00"
              value={form.cnpj}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Telefone *</label>
            <input
              type="text"
              name="telefone"
              placeholder="(00) 00000-0000"
              value={form.telefone}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label>Endereço Completo *</label>
          <textarea
            name="endereco"
            rows="2"
            placeholder="Rua, número, bairro, cidade - UF"
            value={form.endereco}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>E-mail *</label>
            <input
              type="email"
              name="email"
              placeholder="contato@fornecedor.com"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Contato Principal *</label>
            <input
              type="text"
              name="contatoPrincipal"
              placeholder="Nome do responsável"
              value={form.contatoPrincipal}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <button type="submit" className="btn-submit">
          Cadastrar Fornecedor
        </button>
      </form>
    </div>
  );
}

export default App;