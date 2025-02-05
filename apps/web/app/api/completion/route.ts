import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";

export async function POST(req: Request) {
  const { prompt }: { prompt: { problema: string; solucao: string } } = await req.json();

  const { problema, solucao } = prompt;

  const jinaData = await jinaAIReader(solucao);

  const result = streamText({
    model: openai("gpt-4o-mini"),
    system: `Aja como um assistente de escrita especializado em comunicação empresarial, inspirado no livro Smart Brevity de Jim VandeHei, Mike Allen e Roy Schwartz. Você é perito em criar textos claros, concisos e impactantes, otimizados para captar a atenção em um mundo repleto de distrações. Sua tarefa é criar 'Páginas de Problemas' para a Winsig, uma empresa de consultoria líder em soluções integradas de gestão, utilizando um tom profissional, informativo e pragmático que ressoe com donos de empresas, gestores de TI e CFOs. Todo o conteúdo deve ser redigido exclusivamente em Português de Portugal.`,
    prompt: `
    És um assistente de escrita especializado em comunicação empresarial, inspirado no livro Smart Brevity de Jim VandeHei, Mike Allen e Roy Schwartz.
    
    Vais escrever um artigo sobre o seguinteproblema ${problema}
    
    A página do website que endereça a solução para este problema tem o seguinte conteudo:
    <solucao>${jinaData.data.content}</solucao>.


    A) A estrutura do artigo deve ser a seguinte:

    1. Título
        -Atrativo e Curto
        -Resuma o problema em até 6 palavras impactantes (ex.: "Etiquetagem no Armazém: Perda de Tempo").
    2. Problema
        - Comece com uma frase curta e direta que explica o problema principal. Ex.: "Processos manuais de etiquetagem estão atrasando suas entregas."
    3. Por Que Isso Importa
        - Destaque a relevância do problema em um parágrafo curto. Ex.: "Atrasos no envio geram custos extras e afetam a satisfação do cliente."
    4. Solução da Winsig
        - Apresente como a solução da Winsig pode resolver o problema, conectando-a às páginas relevantes do site da Winsig. Inclua links diretos para as soluções.
        - Se a base de conhecimento tiver funcionalidades descritas ou beneficios, deves fazer uso delas no teu texto.
    5. Próximos Passos
        - Inclua um call-to-action claro, como "Entre em contacto connosco para saber mais.

    Exemplo de resposta:
    <titulo>
    Problema: <problema>
    Por Que Isso Importa: <porque_importa>
    Solução da Winsig: <solucao>
    Próximos Passos: <proximos_passos>
    </titulo>
        
        
    B) Extensão e Estilo:
        - Limite estrito de 450-500 palavras
        - Sem linguagem de marketing
        - Foco técnico
        - Escrever em linguagem simples e clara
        - Usar parágrafos curtos (máximo de 2-3 frases)

    C)  Estilo de escrita:
        - Utilize linguagem acessível, mas demonstre autoridade técnica para reforçar a competência da Winsig.
        - Mantenha-se sempre em Português de Portugal.
        - Garanta que o texto tenha aproximadamente 500 palavras, mantendo clareza e objetividade.
        - Adote um estilo que respeite os princípios de Smart Brevity: "curto, mas não superficial."

    D) Base de Conhecimento:
        - Deves utilizar apenas a base de conhecimento do texto da solução que te foi fornecida.

    E) Quality Checks:
        - Deves garantir que o texto é claro, objetivo e informativo.
        - Deves garantir que o texto é conciso e não contém informação desnecessária.
        - Deves garantir que o texto é objetivo e não contém informação de marketing.
        - Deves garantir que o texto é claro e não contém informação técnica desnecessária.
        - O texto tem cerca de 500 palavras.
        - O texto é escrito em Português de Portugal.
        - Apenas usas a base de conhecimento fornecida, não inventas nada.
    `,
  });

  return result.toDataStreamResponse();
}

export async function jinaAIReader(url: string): Promise<any> {
  const apiKey = process.env.JINA_API_KEY;

  const readerUrl = `https://r.jina.ai/${url}`;

  const headers: Record<string, string> = {
    Authorization: `Bearer ${apiKey}`,
    "X-With-Links-Summary": "false",
    "X-With-Images-Summary": "false",
    Accept: "application/json",
  };

  const response = await fetch(readerUrl, {
    method: "GET",
    headers: headers,
  });

  if (!response.ok) {
    throw new Error(`Erro: ${response.status}`);
  }

  const data = await response.json();

  return data;
}
