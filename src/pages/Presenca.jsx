import { useState } from 'react';
import '../global.css';
import AnimatedOnScroll from "../components/AnimatedOnScroll";
import ModalConfirmacao from "../components/ModalConfirmacao";

export function Presenca() {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    celular: '',
    confirmacao: 'sim',
    acompanhantes: '0',
    nomesAcompanhantes: Array(5).fill(''),
    mensagem: ''
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const formatarCelular = (valor) => {
    // Remove tudo que não é número
    const numeros = valor.replace(/\D/g, '');
    
    // Aplica a máscara
    if (numeros.length <= 11) {
      return numeros.replace(/(\d{2})(\d{1})?(\d{4})?(\d{4})?/, (_, ddd, nono, primeira, segunda) => {
        let resultado = `(${ddd}`;
        if (nono) resultado += `)${nono}`;
        if (primeira) resultado += ` ${primeira}`;
        if (segunda) resultado += `-${segunda}`;
        return resultado;
      });
    }
    return valor;
  };

  const formatarData = () => {
    const data = new Date();
    return data.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const salvarArquivo = (conteudo) => {
    // Cria um blob com o conteúdo
    const blob = new Blob([conteudo], { type: 'text/plain;charset=utf-8' });
    
    // Cria um link para download
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    
    // Define o nome do arquivo com a data atual
    const dataAtual = new Date().toISOString().split('T')[0];
    link.download = `confirmacao_presenca_${dataAtual}.txt`;
    
    // Adiciona o link ao documento, clica nele e remove
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Libera o objeto URL
    URL.revokeObjectURL(link.href);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Formata os dados para a API
    const dataConfirmacao = formatarData();
    const acompanhantes = parseInt(formData.acompanhantes);
    const nomesAcompanhantes = formData.nomesAcompanhantes
      .slice(0, acompanhantes)
      .filter(nome => nome.trim() !== '');

    const dadosParaAPI = {
      nome: formData.nome,
      email: formData.email,
      celular: formData.celular,
      confirmacao: formData.confirmacao,
      acompanhantes: acompanhantes,
      nomesAcompanhantes: nomesAcompanhantes,
      mensagem: formData.mensagem,
      dataConfirmacao: new Date()
    };

    try {
      // Envia os dados para a API
      const response = await fetch(process.env.VITE_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dadosParaAPI)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Erro ao enviar confirmação');
      }

      // Salva o arquivo localmente também
      const conteudo = `
              Data da Confirmação: ${dataConfirmacao}
              Nome: ${formData.nome}
              Email: ${formData.email}
              Celular: ${formData.celular}
              Confirmação: ${formData.confirmacao === 'sim' ? 'Sim' : 'Não'}
              ${acompanhantes > 0 ? `Quantidade de Acompanhantes: ${acompanhantes}
              Nomes dos Acompanhantes: ${nomesAcompanhantes.join(', ')}` : ''}
              ${formData.mensagem ? `Mensagem: ${formData.mensagem}` : ''}
              --------------------------------------------------
              `;
      // salvarArquivo(conteudo);
      
      // Limpa o formulário após o envio
      setFormData({
        nome: '',
        email: '',
        celular: '',
        confirmacao: 'sim',
        acompanhantes: '0',
        nomesAcompanhantes: Array(5).fill(''),
        mensagem: ''
      });

      // Mostra o modal de confirmação
      setIsModalOpen(true);
    } catch (error) {
      console.error('Erro ao salvar a confirmação:', error);
      alert('Ops! Algo deu errado ao salvar sua confirmação. Por favor, tente novamente.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'celular') {
      setFormData(prev => ({
        ...prev,
        [name]: formatarCelular(value)
      }));
    } else if (name === 'acompanhantes') {
      setFormData(prev => ({
        ...prev,
        [name]: value,
        // Limpa os nomes dos acompanhantes quando a quantidade muda
        nomesAcompanhantes: Array(5).fill('')
      }));
    } else if (name.startsWith('acompanhante-')) {
      const index = parseInt(name.split('-')[1]);
      const novosNomes = [...formData.nomesAcompanhantes];
      novosNomes[index] = value;
      setFormData(prev => ({
        ...prev,
        nomesAcompanhantes: novosNomes
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  return (
    <div className="w-full mx-auto transition-opacity duration-500 bg-white pb-32">
      {/* Modal de Confirmação */}
      <ModalConfirmacao 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />

      {/* Título da seção */}
      <AnimatedOnScroll animation="fade-in" delay={0.2}>
        <div className="max-w-5xl mx-auto pt-12 pb-6 px-6 text-black text-center content-section">
          <h2 className="text-3xl font-bold font-[var(--font-bitter-rose)] text-[var(--purple)] mb-4 shine">
            Atenção, aventureiro(a)! 🧙‍♂️
          </h2>
          <div className="space-y-4 text-lg font-[var(--font-chillax-Extralight)] text-with-shadow text-gray-500">
            <p> Toda grande jornada exige comprometimento, e essa não é diferente. 
            Sua missão é simples, mas crucial: confirmar presença até o dia 30 de julho!</p>
          </div>
          <div className="section-divider"></div>
        </div>
      </AnimatedOnScroll>

      {/* Seção de Importância */}
      <AnimatedOnScroll animation="slide-in-right" delay={0.5}>
        <div className="max-w-5xl mx-auto py-8 px-6 content-section">
          <div className="mb-12 text-center">
            <h2 className="text-2xl font-bold font-[var(--font-bitter-rose)] text-[var(--purple)] mb-6 character-title">
              Por que sua resposta é importante?🤨
            </h2>
          </div>
          <div className="space-y-4 text-base md:text-lg font-[var(--font-chillax-Extralight)] text-with-shadow leading-relaxed text-gray-500">
            <p>Se o Conselho Branco precisou da resposta de Frodo para destruir o Um Anel, 
            se o Ministério da Magia aguardou a aceitação de Harry para Hogwarts, 
            e se Katniss Everdeen teve que gritar "Eu me voluntario como tributo!" – 
            então, você também precisa se manifestar!</p>
          </div>
        </div>
      </AnimatedOnScroll>

      {/* Seção de Atenção */}
      <AnimatedOnScroll animation="slide-in-left" delay={0.7}>
        <div className="max-w-5xl mx-auto py-8 px-6 content-section">
          <div className="mb-12 text-center">
            <h2 className="text-2xl font-bold font-[var(--font-bitter-rose)] text-[var(--purple)] mb-6 character-title">
              Importante! ‼️
            </h2>
          </div>
          <div className="space-y-4 text-base md:text-lg font-[var(--font-chillax-Extralight)] text-with-shadow leading-relaxed text-gray-500">
            <p>Caso não confirme, consideraremos que você caiu em um portal para outra dimensão, 
            foi beijado por um Dementador, mudou para o lado negro da Força, ou simplesmente 
            decidiu nos abandonar – e nunca mais nos recuperaremos desse trauma que nos causará 
            danos emocionais irreparáveis. Dramático? Sim. Necessário? Também. 😆</p>
          </div>
        </div>
      </AnimatedOnScroll>

      {/* Formulário */}
      <AnimatedOnScroll animation="fade-in" delay={0.9}>
        <div className="max-w-5xl mx-auto py-8 px-6 content-section">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold font-[var(--font-bitter-rose)] text-[var(--purple)] mb-6 text-center">
              Confirme aqui sua presença!
            </h2>
            {/* <iframe src="https://docs.google.com/forms/d/e/1FAIpQLScoHirdQzFBA7OU-wF294gqrF9Eh8A4Uoy4Pc1ZbZ9HnIz2zg/viewform?embedded=true" width="100%" height="1500" frameborder="0" marginheight="0" marginwidth="0">Carregando…</iframe> */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="nome" className="block text-sm font-medium text-[var(--green)] mb-2">
                  Nome do Aventureiro
                </label>
                <input
                  type="text"
                  name="nome"
                  id="nome"
                  required
                  value={formData.nome}
                  onChange={handleChange}
                  className="mt-1 block w-full h-10 px-4 rounded-md border-[var(--green-100)] shadow-sm focus:border-[var(--purple)] focus:ring-[var(--purple)] text-base"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-[var(--green)] mb-2">
                  Email (para receber o mapa do tesouro)
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 block w-full h-10 px-4 rounded-md border-[var(--green-100)] shadow-sm focus:border-[var(--purple)] focus:ring-[var(--purple)] text-base"
                />
              </div>

              <div>
                <label htmlFor="celular" className="block text-sm font-medium text-[var(--green)] mb-2">
                  Celular (para receber lembretes da missão)
                </label>
                <input
                  type="tel"
                  name="celular"
                  id="celular"
                  required
                  placeholder="(99)9 9999-9999"
                  value={formData.celular}
                  onChange={handleChange}
                  maxLength={15}
                  className="mt-1 block w-full h-10 px-4 rounded-md border-[var(--green-100)] shadow-sm focus:border-[var(--purple)] focus:ring-[var(--purple)] text-base"
                />
              </div>

              <div>
                <label htmlFor="confirmacao" className="block text-sm font-medium text-[var(--green)] mb-2">
                  Você aceita a missão?
                </label>
                <select
                  name="confirmacao"
                  id="confirmacao"
                  required
                  value={formData.confirmacao}
                  onChange={handleChange}
                  className="mt-1 block w-full h-10 px-4 rounded-md border-[var(--green-100)] shadow-sm focus:border-[var(--purple)] focus:ring-[var(--purple)] text-base"
                >
                  <option value="sim">Sim, aceito a missão! 🦉</option>
                  <option value="nao">Infelizmente não poderei comparecer 😢</option>
                </select>
              </div>

              {formData.confirmacao === 'sim' && (
                <>
                  <div>
                    <label htmlFor="acompanhantes" className="block text-sm font-medium text-[var(--green)] mb-2">
                      Quantos companheiros de aventura você trará? 🧙‍♂️
                    </label>
                    <input
                      type="number"
                      name="acompanhantes"
                      id="acompanhantes"
                      min="0"
                      max="5"
                      required
                      value={formData.acompanhantes}
                      onChange={handleChange}
                      className="mt-1 block w-full h-10 px-4 rounded-md border-[var(--green-100)] shadow-sm focus:border-[var(--purple)] focus:ring-[var(--purple)] text-base"
                    />
                    <p className="mt-1 text-sm text-gray-500">Máximo de 5 companheiros por aventureiro</p>
                  </div>

                  {parseInt(formData.acompanhantes) > 0 && (
                    <div className="mt-6 space-y-4">
                      <h3 className="text-lg font-medium text-[var(--purple)]">Nomes dos Companheiros de Aventura</h3>
                      {Array.from({ length: parseInt(formData.acompanhantes) }, (_, index) => (
                        <div key={index}>
                          <label htmlFor={`acompanhante-${index}`} className="block text-sm font-medium text-[var(--green)] mb-2">
                            Nome do Companheiro {index + 1} 🧙‍♂️
                          </label>
                          <input
                            type="text"
                            name={`acompanhante-${index}`}
                            id={`acompanhante-${index}`}
                            required
                            value={formData.nomesAcompanhantes[index]}
                            onChange={handleChange}
                            className="mt-1 block w-full h-10 px-4 rounded-md border-[var(--green-100)] shadow-sm focus:border-[var(--purple)] focus:ring-[var(--purple)] text-base"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}

              <div>
                <label htmlFor="mensagem" className="block text-sm font-medium text-[var(--green)] mb-2">
                  Mensagem para os noivos (opcional)
                </label>
                <textarea
                  name="mensagem"
                  id="mensagem"
                  rows="4"
                  value={formData.mensagem}
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-3 rounded-md border-[var(--green-100)] shadow-sm focus:border-[var(--purple)] focus:ring-[var(--purple)] text-base resize-none"
                />
              </div>

              <div className="flex justify-center">
                <button
                  type="submit"
                  className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-medium rounded-md text-white bg-[var(--purple)] hover:bg-[var(--purple)]/80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--purple)] transition-all duration-300 hover-effect"
                >
                  Enviar uma coruja 🦉
                </button>
              </div>
            </form>
          </div>
        </div>
      </AnimatedOnScroll>

      {/* Conclusão */}
      <AnimatedOnScroll animation="fade-in" delay={1.1}>
        <div className="max-w-5xl mx-auto py-10 px-6 text-center">
          <div className="space-y-4 text-lg font-[var(--font-chillax-Extralight)] text-with-shadow text-gray-500 max-w-3xl mx-auto">
            <p>Obrigado por fazer parte dessa jornada conosco!</p>
            <p className="italic mt-8 text-[var(--green)] font-semibold bounce">Que a Força esteja com você! 🦉✨</p>
          </div>
        </div>
      </AnimatedOnScroll>
    </div>
  );
} 