export abstract class Entity {

  private static s_serial: number = 0;

  private m_serial: number;

  public get Serial(): number {
    return this.m_serial;
  };

  public Deleted: boolean = false;

  constructor() {
    this.m_serial = ++Entity.s_serial;
  }
}

export default Entity;
