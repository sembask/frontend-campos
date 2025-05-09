export interface Campo {
    id: string;
    name: string;
    datatype: string;
    createdAt: Date;
  }
  
  export interface Preenchimento {
    id: string;
    fieldId: string;
    value: any;
    createdAt: Date;
    campo?: {
      id: string;
      name: string;
      datatype: string;
    };
  }
  
  export interface PreenchimentoCampo {
    id: string;
    fieldId: string;
    value: any;
    createdAt: Date;
    campoNome?: string;
  }