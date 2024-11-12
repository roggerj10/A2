import React, { useState } from 'react';
import Header from '../../components/Header'; // Ajuste o caminho conforme a estrutura do seu projeto

// Seção de Dúvidas
const FAQSection = () => (
  <div className="faq-section py-10 px-5 bg-gray-200 text-center">
    <h2 className="text-3xl font-bold mb-5">Dúvidas sobre Produtos e Serviços</h2>
    <p className="text-xl">
      A nossa equipe está disponível para responder todas as suas perguntas sobre nossos produtos e serviços. 
      Se você tiver alguma dúvida sobre nossos jogos, consoles ou gift cards, não hesite em nos enviar uma mensagem através do formulário abaixo.
      Responderemos o mais rápido possível!
    </p>
  </div>
);

// Componente de formulário CRUD para Dúvidas com Upload de Imagem
const DudasForm = () => {
  const [questions, setQuestions] = useState([]); // Lista de perguntas
  const [newQuestion, setNewQuestion] = useState(''); // Texto da nova pergunta
  const [answer, setAnswer] = useState(''); // Resposta da empresa
  const [editId, setEditId] = useState(null); // ID da pergunta em edição
  const [image, setImage] = useState(null); // Imagem do usuário

  // Função para adicionar uma nova pergunta
  const handleAddQuestion = () => {
    if (newQuestion.trim()) {
      const newQuestionObj = {
        id: Date.now(),
        question: newQuestion,
        answer: '',
        isAnswered: false,
        image: image, // Inclui a imagem na pergunta
      };
      setQuestions([...questions, newQuestionObj]);
      setNewQuestion('');
      setImage(null); // Limpa a imagem após adicionar
    }
  };

  // Função para editar uma pergunta existente
  const handleEditQuestion = (id) => {
    const questionToEdit = questions.find(q => q.id === id);
    setNewQuestion(questionToEdit.question); // Preenche o campo com a pergunta atual
    setImage(questionToEdit.image); // Preenche o campo de imagem com a imagem existente
    setEditId(id); // Marca o id da pergunta que está sendo editada
  };

  // Função para atualizar a pergunta após edição
  const handleUpdateQuestion = () => {
    setQuestions(questions.map(q =>
      q.id === editId ? { ...q, question: newQuestion, image: image } : q
    ));
    setNewQuestion(''); // Limpa o campo após a edição
    setImage(null); // Limpa o campo de imagem
    setEditId(null); // Limpa o estado de edição
  };

  // Função para excluir uma pergunta
  const handleDeleteQuestion = (id) => {
    setQuestions(questions.filter(q => q.id !== id));
  };

  // Função para responder uma pergunta
  const handleAnswerQuestion = (id) => {
    setQuestions(questions.map(q =>
      q.id === id ? { ...q, answer, isAnswered: true } : q
    ));
    setAnswer(''); // Limpa o campo de resposta após enviar
  };

  // Função para tratar o upload da imagem
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Criar uma URL temporária para a imagem para exibição
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl); // Armazena o URL temporário da imagem no estado
    }
  };

  return (
    <div className="faq-form-section py-10 bg-white">
      <h2 className="text-3xl font-bold text-center mb-5">Envie sua Dúvida</h2>
      
      {/* Formulário de envio de pergunta */}
      <div className="form-container mb-5 text-center">
        <textarea
          value={newQuestion}
          onChange={(e) => setNewQuestion(e.target.value)}
          className="w-3/4 p-2 border rounded mb-4"
          placeholder="Digite sua dúvida"
        />
        
        {/* Campo de upload de imagem */}
        <div className="mb-4">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-3/4 p-2 border rounded"
          />
        </div>

        {/* Exibe a imagem carregada como pré-visualização */}
        {image && (
          <div className="mb-4">
            <p className="text-lg">Pré-visualização da Imagem:</p>
            <img src={image} alt="Preview" className="w-32 h-32 object-cover rounded" />
          </div>
        )}

        <div className="flex justify-center space-x-4">
          <button
            onClick={editId ? handleUpdateQuestion : handleAddQuestion}
            className="mt-3 px-4 py-2 bg-blue-500 text-white rounded"
          >
            {editId ? "Atualizar Dúvida" : "Adicionar Dúvida"}
          </button>
        </div>
      </div>

      {/* Listagem de perguntas com possibilidade de editar, excluir e responder */}
      <div className="questions-list">
        {questions.length === 0 ? (
          <p className="text-center text-lg text-gray-500">Nenhuma dúvida ainda.</p>
        ) : (
          questions.map((q) => (
            <div key={q.id} className="question-item mb-4 p-4 border border-gray-200 rounded">
              <p className="font-semibold">{q.question}</p>
              {q.image && (
                <div className="image-preview mt-2">
                  <p className="text-lg">Imagem:</p>
                  <img src={q.image} alt="Question Image" className="w-32 h-32 object-cover rounded" />
                </div>
              )}
              {q.isAnswered ? (
                <div className="answer mt-2">
                  <p className="text-green-500">Resposta: {q.answer}</p>
                </div>
              ) : (
                <div>
                  <textarea
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    className="w-3/4 p-2 border rounded mb-2"
                    placeholder="Digite sua resposta"
                  />
                  <button
                    onClick={() => handleAnswerQuestion(q.id)}
                    className="mt-2 px-4 py-2 bg-green-500 text-white rounded"
                  >
                    Responder
                  </button>
                </div>
              )}
              <div className="actions mt-2 flex justify-between">
                <button onClick={() => handleEditQuestion(q.id)} className="text-blue-500">
                  Editar
                </button>
                <button onClick={() => handleDeleteQuestion(q.id)} className="text-red-500">
                  Excluir
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

const FAQPage = () => (
  <div>
    <Header
      home="../"
      consoles="../consoles"
      games="../games"
      gift="../giftCard"
      logo="/GGS_logo.png"
      path="duvidas"
      totalList={0}
    />
    <FAQSection />
    <DudasForm />
  </div>
);

export default FAQPage;
