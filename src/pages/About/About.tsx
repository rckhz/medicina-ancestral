import PageHead from '../../components/PageHead/PageHead'
import EvidenceBadge from '../../components/EvidenceBadge/EvidenceBadge'
import { evidenceLevels } from '../../data/categories'
import { useDocumentTitle } from '../../hooks/useDocumentTitle'
import type { EvidenceLevel } from '../../types/content'

export default function About() {
  useDocumentTitle('Sobre')
  return (
    <>
    <PageHead title="Sobre o projeto">
      <p className="lead">
        O Medicina Ancestral é um projeto de educação em saúde que reúne conhecimentos sobre plantas
        medicinais, preparações caseiras e práticas tradicionais de cuidado.
      </p>
    </PageHead>
    <div className="container page prose prose--page">
      <p>
        A proposta é aproximar o conhecimento tradicional da pesquisa científica: mostrar o que é transmitido
        entre gerações e, ao lado, o que os estudos já conseguiram investigar. O objetivo não é substituir a
        medicina convencional, mas ampliar o acesso à informação, mostrando benefícios possíveis, limitações e
        riscos.
      </p>

      <h2>Classificação das evidências</h2>
      <p>A classificação considera cada finalidade específica, não apenas o ingrediente ou a planta.</p>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th scope="col">Classificação</th>
              <th scope="col">Significado</th>
            </tr>
          </thead>
          <tbody>
            {(Object.keys(evidenceLevels) as EvidenceLevel[]).map((level) => (
              <tr key={level}>
                <td>
                  <EvidenceBadge level={level} />
                </td>
                <td>{evidenceLevels[level].meaning}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2>Compromissos de segurança</h2>
      <ul>
        <li>Não recomendamos a interrupção de medicamentos prescritos.</li>
        <li>Não prometemos cura.</li>
        <li>Conhecimento tradicional não é apresentado como comprovação científica.</li>
        <li>Informamos contraindicações e possíveis interações.</li>
        <li>Consideramos riscos para crianças, gestantes, lactantes e idosos.</li>
        <li>Natural não significa necessariamente seguro.</li>
        <li>Não publicamos doses ou instruções sem fonte confiável.</li>
      </ul>

      <h2>Fontes</h2>
      <p>
        Cada artigo traz as próprias referências. Priorizamos Ministério da Saúde, Anvisa, Organização Mundial da
        Saúde, diretrizes clínicas, revisões sistemáticas, artigos revisados por pares e instituições
        acadêmicas.
      </p>
    </div>
    </>
  )
}
