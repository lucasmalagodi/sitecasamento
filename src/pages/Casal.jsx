import AnimatedOnScroll from "../components/AnimatedOnScroll";

const Casal = () => {
  return (
    <div className="w-full mx-auto transition-opacity duration-500 bg-white pb-32">
      {/* Título da seção */}
      <div className="max-w-5xl mx-auto pt-12 pb-6 px-6 text-black text-center content-section">
        <div className="space-y-4 text-lg font-[var(--font-chillax-Extralight)] text-with-shadow text-gray-500">
          <p>Aqui vocês vão conhecer um pouquinho da história de como esses players se juntaram. Então, acomode-se e embarque nessa jornada inesperada, digna de um conto da Terra-média. 🏰✨</p>
        </div>
      </div>

      {/* História do Casal */}
      <div className="max-w-5xl mx-auto py-8 px-6 content-section">
        <div className="space-y-6 text-base md:text-lg font-[var(--font-chillax-Extralight)] text-with-shadow leading-relaxed text-gray-500">
          <p>Tudo começou em uma galáxia não tão distante..., também conhecida como Tinder – aquele aplicativo onde os dedos deslizam e a providência age. E agiu direitinho, pois, em um belo dia, <strong>Lucas e Paula deram match!</strong> 💘</p>
          
          <p>O primeiro encontro foi marcado no lendário Estação Barão, famoso em Campinas por suas <strong>coxinhas</strong> (sim, coxinhas fazem parte dessa história e poderiam facilmente ser um artefato lendário digno de ser protegido pelos anões de Erebor). Como já era esperado, Paula chegou <del>atrasada</del>, nem atrasada, nem adiantada, mas exatamente quando pretendia chegar (<i>Gandalf, mago, 3001 TE</i>). Lucas, por outro lado, já estava lá, aguardando. E como mestre na arte de quebrar o gelo, sua primeira grande fala foi: "<strong>O zíper da minha jaqueta quebrou.</strong>" 🧥 Um começo promissor para qualquer fanfic!</p>

          <AnimatedOnScroll animation="fade-in" delay={0.1}>
            <div className="w-full flex justify-center my-8">
              <div className="w-full max-w-3xl h-[600px] md:h-[600px] rounded-lg overflow-hidden shadow-xl transition-transform duration-500 hover:scale-[1.02]" style={{ backgroundImage: "url('/assets/casal/primeiro-encontro.png')", backgroundSize: "cover", backgroundPosition: "center", filter: "brightness(0.9) contrast(1.1)" }}>
              </div>
            </div>
          </AnimatedOnScroll>

          <p>A conversa fluiu, a sintonia foi instantânea e o <strong>tempo passou tão rápido</strong> que só perceberam quando foram gentilmente expulsos do bar – como se Vecna estivesse manipulando a realidade. Entre coxinhas e risadas, descobriram coincidências impressionantes que pareciam obra do destino (ou do roteirista da Marvel): nasceram na mesma maternidade em São Bernardo do Campo e a mãe de Lucas fazia aniversário no mesmo dia que Paula. Além disso, <strong>compartilhavam paixões que solidificaram a conexão</strong>: filmes e séries geek, maratonas de episódios, cinema e, claro, um amor profundo por café ☕ (o verdadeiro elixir da vida moderna, digno de ser servido em Valfenda).</p>

          <p>A partir desse dia, Paula já sabia que, para ela,<strong> uma nova fase do jogo havia sido desbloqueada</strong>. Se fosse Star Wars, aquele teria sido o momento em que a Força despertou entre eles; se fosse Harry Potter, foi quando escolheram suas varinhas e elas os escolheram de volta. Entre sessões de cinema, cafés (com canela) intermináveis e noites de filmes e séries em casa, a história foi se desenrolando. 🎬</p>

          <AnimatedOnScroll animation="fade-in" delay={0.2}>
            <div className="w-full flex justify-center my-8">
              <div className="w-full max-w-3xl h-[600px] md:h-[600px] rounded-lg overflow-hidden shadow-xl transition-transform duration-500 hover:scale-[1.02]" style={{ backgroundImage: "url('/assets/casal/momentos-juntos.png')", backgroundSize: "cover", backgroundPosition: "center" }}>
              </div>
            </div>
          </AnimatedOnScroll>

          <p>Os primeiros encontros aconteciam nos finais de semana, mas a conversa fluía diariamente pelo WhatsApp – como se estivessem as transmitindo via Palantír. Algumas semanas depois, descobriram que <strong>Roo Panes</strong>, um cantor praticamente desconhecido, faria um show no Brasil. Paula queria muito ir, mas nenhuma amiga foi convencida a acompanhá-la. Mesmo com a relação ainda no início, ela decidiu arriscar e convidou Lucas para irem juntos... <strong>quatro meses à frente!</strong> 😱 Ele, sem saber se era cedo demais para um compromisso tão, tão, tão distante, aceitou. Assim, em setembro, os dois embarcaram em sua <strong>primeira viagem juntos</strong>, dando um verdadeiro "salto de fé" no estilo Assassin's Creed. 🎶✈️</p>

          <p>Mas nenhuma história épica acontece sem desafios. No meio do caminho, Paula precisou deixar Campinas e voltar para a casa dos pais em Piracicaba. Lucas, que interpretou a mudança como um indício de afastamento, ficou abalado – como um Stark perdido no Norte 🥶 ou quando Ash abandonou o Charizard. No entanto, ajudou na mudança e, <strong>naquele momento, percebeu que queria ficar com ela</strong> (lerdo como o Naruto percebendo que a Hinata gostava dele 🙄). Mesmo com a distância, o relacionamento não apenas resistiu, mas se fortaleceu. Afinal, como diria Samwise Gamgee, "<strong>há alguma coisa boa neste mundo, e vale a pena lutar por ela</strong>"  ❤️.</p>

          <AnimatedOnScroll animation="fade-in" delay={0.3}>
            <div className="w-full flex justify-center my-8">
              <div className="w-full max-w-3xl h-[800px] md:h-[800px] rounded-lg overflow-hidden shadow-xl transition-transform duration-500 hover:scale-[1.02]" style={{ backgroundImage: "url('/assets/casal/desafios.png')", backgroundSize: "cover", backgroundPosition: "center" }}>
              </div>
            </div>
          </AnimatedOnScroll>

          <p>Em 2020, um novo capítulo começou: Paula mudou de emprego e foi morar em Valinhos. Pouco tempo depois, veio a pandemia 🦠, e Lucas começou a passar mais e mais tempo no apartamento alugado, <strong>até que a convivência se tornou oficial</strong>. Juntos, começaram a construir uma vida a dois: cozinhando (nem sempre bem 👀), limpando (nem sempre rápido 🧹), dividindo tarefas (sempre equilibrando as quests diárias 🎮), criando hobbies e estabelecendo rotinas. <strong>Desde então, nunca mais ficaram separados</strong>. Passaram por diferentes fases: moraram 15 dias em Vinhedo, na casa dos pais de Lucas; e 15 dias em Piracicaba, na casa dos pais de Paula; até finalmente pegarem a chave do primeiro apartamento em Campinas. 🏡✨</p>

          <p>A construção desse lar digno de um reino de Westeros 🏰 não foi fácil, mas foi incrível. Houve reformas, decisões importantes e, por fim, <strong>a chegada de um novo membro para a guilda: Momozilla</strong> 🐶🔥, a doguinha que trouxe um mix de amor, caos e desafios, transformando a casa em um verdadeiro campo de batalha ⚔️ entre meias roubadas, loucuras e amor se expandido.</p>

          <AnimatedOnScroll animation="fade-in" delay={0.4}>
            <div className="w-full flex justify-center my-8">
              <div className="w-full max-w-3xl h-[600px] md:h-[600px] rounded-lg overflow-hidden shadow-xl transition-transform duration-500 hover:scale-[1.02]" style={{ backgroundImage: "url('/assets/casal/momozilla.png')", backgroundSize: "cover", backgroundPosition: "center" }}>
              </div>
            </div>
          </AnimatedOnScroll>

          <p>Mesmo com altos e baixos, dias de luta e dias de glória, <strong>o que sempre prevaleceu foi a harmonia e o respeito entre eles</strong>. Tornaram-se melhores amigos, confidentes, abrigo um para o outro, sempre prontos para apertar "continue" ▶️ nessa história que já dura seis anos. Seis anos de aventuras dignas de uma saga épica – <strong>e esse é apenas o começo da próxima fase</strong>. 🎮📖✨</p>

          <AnimatedOnScroll animation="fade-in" delay={0.5}>
            <div className="w-full flex justify-center my-8">
              <div className="w-full max-w-3xl h-[600px] md:h-[600px] rounded-lg overflow-hidden shadow-xl transition-transform duration-500 hover:scale-[1.02]" style={{ backgroundImage: "url('/assets/casal/casal-atual.png')", backgroundSize: "cover", backgroundPositionX: "57%" }}>
              </div>
            </div>
          </AnimatedOnScroll>

          <p className="text-center font-semibold text-xl text-[var(--green)]">E como toda boa aventura, todos estão convidados a fazer parte dela! 🎊 A festa será digna de um crossover épico, com emoção, risadas e, quem sabe, até alguns easter eggs para os mais atentos. Nos vemos lá, e lembrem-se: "O casamento está chegando!" 🥶</p>
        </div>
      </div>
    </div>
  );
};

export default Casal; 