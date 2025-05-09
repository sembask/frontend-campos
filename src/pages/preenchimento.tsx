import { useState, useEffect } from "react";
import { PreenchimentoForm } from "@/components/preenchimentoForm";
import { findAll } from "@/services/PreenchimentoService";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { PreenchimentoCampo } from "@/types/models";

export const Preenchimento = () => {
  const [preenchimentos, setPreenchimentos] = useState<PreenchimentoCampo[]>(
    []
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadPreenchimentos();
  }, []);

  const loadPreenchimentos = async () => {
    try {
      const data = await findAll();
      setPreenchimentos(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 space-y-8 py-6">
      <div>
        <h1 className="text-2xl font-bold mb-6">
          Gerenciamento de Preenchimentos
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">
              Adicionar Preenchimento
            </h2>
            <PreenchimentoForm onSuccess={loadPreenchimentos} />
          </div>
          <div className="p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">
              Preenchimentos Existentes
            </h2>
            {loading ? (
              <p>Carregando...</p>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Campo</TableHead>
                    <TableHead>Valor</TableHead>
                    <TableHead>Data</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {preenchimentos.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={3}
                        className="text-center text-muted-foreground "
                      >
                        Nenhum preenchimento encontrado
                      </TableCell>
                    </TableRow>
                  ) : (
                    preenchimentos.map((p) => (
                      <TableRow key={p.id}>
                        <TableCell>{p.campoNome || p.fieldId}</TableCell>
                        <TableCell>
                          {formatValue(
                            p.value,
                            p.campoNome ? "string" : undefined
                          )}
                        </TableCell>
                        <TableCell>
                          {new Date(p.createdAt).toLocaleString()}
                        </TableCell>
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

function formatValue(value: any, type?: string): string {
  if (value === null || value === undefined) return "-";

  switch (type) {
    case "boolean":
      return value === "true" || value === true ? "Verdadeiro" : "Falso";
    case "date":
      try {
        return new Date(value).toLocaleString("pt-BR", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        });
      } catch {
        return value;
      }
    default:
      if (
        typeof value === "string" &&
        /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/.test(value)
      ) {
        try {
          return new Date(value).toLocaleString("pt-BR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          });
        } catch {
          return String(value);
        }
      }
      return String(value);
  }
}
