# PingZap - MVP de Monitoramento de Infraestrutura

## 📌 A Dor Escolhida
No gerenciamento diário de infraestrutura, especialmente lidando com servidores Windows, Active Directory e servidores web (como Nginx, Apache ou IIS), saber o momento exato em que um serviço essencial fica offline é crítico. Ferramentas de monitoramento consolidadas são extremamente robustas, mas exigem infraestrutura dedicada, configuração complexa e manutenção constante de dashboards. 

A dor latente para pequenos provedores e consultores independentes é a necessidade de um alerta leve, imediato e direto no WhatsApp, permitindo ação corretiva antes que o cliente final perceba a indisponibilidade, sem a necessidade de ficar olhando para telas de monitoramento.

## 📊 Tamanho do Mercado e Business Model Canvas

*   **TAM (Total Addressable Market):** Milhões de Pequenas e Médias Empresas (PMEs) no Brasil que operam soluções digitais, mas não possuem uma equipe de TI operando 24/7.
*   **SAM (Serviceable Available Market):** Provedores de Serviços Gerenciados (MSPs) e consultores de TI independentes que administram a infraestrutura de terceiros.
*   **SOM (Serviceable Obtainable Market):** Consultores da rede de contatos primária (LinkedIn) e negócios locais que podem ser alcançados por prospecção direta nos primeiros meses de operação.

**Business Model Canvas (Versão MVP):**
*   **Proposta de Valor:** Notificações críticas de queda de servidores, sites e links de internet entregues diretamente no WhatsApp, priorizando a simplicidade.
*   **Segmento de Clientes:** Consultores de infraestrutura de TI e donos de PMEs.
*   **Canais:** Landing Page oficial, WhatsApp e prospecção direta (LinkedIn).
*   **Relacionamento:** Automático na entrega de alertas; consultivo e direto no fechamento via WhatsApp.
*   **Fontes de Receita:** Assinatura mensal pré-paga baseada na quantidade de IPs/endpoints monitorados.
*   **Recursos Principais:** Front-end (React/Vite), scripts simples de verificação de status (ping/HTTP) e WhatsApp.
*   **Atividades Principais:** Captação de leads, configuração de endpoints e garantia de entrega dos alertas.
*   **Parcerias Chaves:** Nenhuma no MVP (validação direta).
*   **Estrutura de Custos:** Hospedagem front-end, ferramentas no-code e tempo de setup manual.

## 🧪 A Tese do MVP e o que ficou manual de propósito

A tese central deste MVP é validar se os profissionais de TI e donos de negócios estão dispostos a pagar pela conveniência de receber alertas rápidos no WhatsApp, abrindo mão de dashboards analíticos complexos.

**O que ficou manual:**
Para acelerar o lançamento e validar a tese sem custos excessivos de infraestrutura, o MVP automatiza a captação do lead e a organização no painel administrativo via `localStorage`. No entanto, o fluxo de faturamento (envio de link de pagamento do Mercado Pago/Stripe) e a inserção dos IPs fornecidos pelo cliente no motor de disparo (scripts em PowerShell/Bash ou webhook de monitoramento) são executados manualmente pelo fundador após o contato comercial pelo WhatsApp.

## 🤖 O Mega Prompt e Interações com IA

O projeto foi construído utilizando a plataforma Bolt.new (IA como co-founder) com o seguinte mega prompt estruturado:

> Crie uma aplicação web em React com Vite, Tailwind CSS e Lucide Icons para um MVP de SaaS chamado "PingZap". O sistema terá duas rotas usando React Router: a Landing Page (/) e o Painel Admin (/admin).
> 
> 1. LANDING PAGE (Visão do Cliente)
> - Tema: Dark mode, fundo cinza chumbo (#111827) com botões e destaques em verde WhatsApp (#25D366).
> - Navbar: Logo PingZap em texto e botão "Ver Planos" que desce para o formulário.
> - Hero Section: Título: "Saiba quando seu servidor cair, antes do seu cliente reclamar." Subtítulo: "Monitoramento simples de sites, links e servidores com alertas diretos no seu WhatsApp." Botão "Montar meu plano".
> - Como Funciona: 3 cards simples (1. Cadastre seus IPs, 2. Ativamos o monitoramento, 3. Receba alertas no WhatsApp).
> - Formulário: Campos: Nome, WhatsApp, Empresa, e Quantos IPs quer monitorar. 
> - Ação do Formulário: Ao dar submit, o sistema deve salvar os dados do lead no `localStorage` do navegador (em um array chamado 'pingzap_leads') e redirecionar o usuário para a API do WhatsApp (wa.me) com uma mensagem pré-preenchida dizendo "Olá, quero assinar o PingZap para X IPs...".
> 
> 2. PAINEL ADMIN (Visão do Fundador - Rota /admin)
> - Layout: Um dashboard simples e limpo.
> - Funcionalidade: Deve ler os dados salvos no `localStorage` ('pingzap_leads') e exibi-los em uma tabela.
> - Tabela: Colunas para Nome, WhatsApp, Empresa, Qtd de IPs, Data, e um botão "Contatar" que abre o WhatsApp da pessoa.

**Correções solicitadas:**
A IA compreendeu perfeitamente a lógica de roteamento e o uso de `localStorage` para simular o banco de dados temporário, entregando a interface funcional na primeira iteração, sem a necessidade de novos prompts de correção para o fluxo principal.

## 🚀 Aplicação Publicada

O MVP está no ar e pode ser testado no link abaixo:
🔗 https://pingzap-saas-mvp-o6l1.bolt.host
