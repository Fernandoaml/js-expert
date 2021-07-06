// Tem como premissa, ser um assinatura para quem for implementar o componente de tabela, reutilizar este cara aqui.
// Todos devem seguir a mesma assinatura.
import NotImplementedException from "../notImplementedException.mjs";

export default class TableComponent {
  render(data) {
    throw new NotImplementedException(this.render.name);
  }
}
