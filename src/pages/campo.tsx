import { useState, useEffect } from "react";
import { CampoForm } from "@/components/campoForm";
import { findAll } from "@/services/CampoService";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Campo as CampoModel } from "@/types/models";

const formatDate = (date: Date) => {
  return new Date(date).toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const translateDataType = (datatype: string) => {
  switch (datatype) {
    case "string":
      return "Texto";
    case "number":
      return "Número";
    case "boolean":
      return "Booleano";
    case "date":
      return "Data";
    default:
      return datatype;
  }
};

export const Campo = () => {
  const [fields, setFields] = useState<CampoModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadFields = async () => {
    try {
      setLoading(true);
      const data = await findAll();
      setFields(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFields();
  }, []);

  if (loading && fields.length === 0) return <div>Carregando...</div>;

  return (
    <div className="container mx-auto px-4 space-y-8 py-6">
      <div>
        <h1 className="text-2xl font-bold mb-6">Gerenciamento de Campos</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Criar Novo Campo</h2>
            <CampoForm onSuccess={loadFields} />
          </div>
          <div className="p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Campos Existentes</h2>
            {error ? (
              <div className="text-red-600 mb-4">Erro: {error}</div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>Tipo de Dado</TableHead>
                    <TableHead>Data de Criação</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {fields.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={3}
                        className="text-center py-4 text-muted-foreground"
                      >
                        Nenhum campo cadastrado.
                      </TableCell>
                    </TableRow>
                  ) : (
                    fields.map((field) => (
                      <TableRow key={field.id}>
                        <TableCell className="font-medium">
                          {field.name}
                        </TableCell>
                        <TableCell>
                          {translateDataType(field.datatype)}
                        </TableCell>
                        <TableCell>{formatDate(field.createdAt)}</TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
