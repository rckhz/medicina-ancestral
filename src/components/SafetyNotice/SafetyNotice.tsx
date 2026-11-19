import Icon from '../Icon/Icon'

export default function SafetyNotice() {
  return (
    <aside className="notice" aria-label="Aviso de segurança">
      <Icon name="alert" className="notice__icon" />
      <p>
        <strong>Conteúdo educativo.</strong> Não substitui consulta com profissional de saúde. Não interrompa
        nem altere tratamentos prescritos. Produtos naturais também podem causar efeitos adversos e interações.
      </p>
    </aside>
  )
}
