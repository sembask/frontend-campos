import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel,
} from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { findAll as findAllCampos } from "@/services/CampoService";
import { create } from "@/services/PreenchimentoService";

interface Campo {
  id: string;
  name: string;
  datatype: string;
  createdAt: Date;
}

interface PreenchimentoFormProps {
  onSuccess?: () => void;
}

export function PreenchimentoForm({ onSuccess }: PreenchimentoFormProps) {
  const [campos, setCampos] = useState<Campo[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedFieldId, setSelectedFieldId] = useState("");
  const [value, setValue] = useState("");
  const [boolValue, setBoolValue] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  useEffect(() => {
    findAllCampos()
      .then((data) => {
        setCampos(data);
        setLoading(false);
      })
      .catch((error) => {
        setMessage({
          type: "error",
          text: `Erro ao carregar campos: ${error.message}`,
        });
        setLoading(false);
      });
  }, []);

  const selectedField = campos.find((campo) => campo.id === selectedFieldId);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedFieldId) {
      setMessage({ type: "error", text: "Selecione um campo." });
      return;
    }

    let valueToSubmit: any;

    if (selectedField) {
      switch (selectedField.datatype) {
        case "string":
          valueToSubmit = value;
          break;
        case "number":
          valueToSubmit = Number(value);
          if (isNaN(valueToSubmit)) {
            setMessage({ type: "error", text: "Digite um número válido." });
            return;
          }
          break;
        case "boolean":
          valueToSubmit = boolValue === true ? "true" : "false";
          break;
        case "date":
          valueToSubmit = new Date(value).toISOString();
          break;
      }
    }

    try {
      await create({
        fieldId: selectedFieldId,
        value: valueToSubmit,
      });

      setMessage({
        type: "success",
        text: "Preenchimento adicionado com sucesso!",
      });
      setSelectedFieldId("");
      setValue("");
      setBoolValue(false);

      if (onSuccess) {
        onSuccess();
      }

      setTimeout(() => setMessage(null), 3000);
    } catch (error: any) {
      setMessage({
        type: "error",
        text:
          error.response?.data?.message || "Erro ao adicionar preenchimento.",
      });
    }
  };

  const renderValueInput = () => {
    if (!selectedField) return null;

    switch (selectedField.datatype) {
      case "string":
        return (
          <Input
            id="value"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Digite o valor"
          />
        );
      case "number":
        return (
          <Input
            id="value"
            type="number"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Digite o valor numérico"
          />
        );
      case "boolean":
        return (
          <div className="flex items-center space-x-2">
            <Checkbox
              id="value"
              checked={boolValue}
              onCheckedChange={(checked) => setBoolValue(!!checked)}
            />
            <label
              htmlFor="value"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {boolValue ? "Verdadeiro" : "Falso"}
            </label>
          </div>
        );
      case "date":
        return (
          <Input
            id="value"
            type="datetime-local"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        );
      default:
        return <Input id="value" disabled placeholder="Tipo não suportado" />;
    }
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

  if (loading) {
    return <div>Carregando campos...</div>;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {message && (
        <Alert
          className={
            message.type === "error"
              ? "bg-red-50 border-red-200 text-red-800"
              : "bg-green-50 border-green-200 text-green-800"
          }
        >
          <AlertDescription>{message.text}</AlertDescription>
        </Alert>
      )}

      <div className="space-y-2">
        <Label htmlFor="field">Campo</Label>
        <Select value={selectedFieldId} onValueChange={setSelectedFieldId}>
          <SelectTrigger className="w-full" id="field">
            <SelectValue placeholder="Selecione um campo" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Campos disponíveis</SelectLabel>
              {campos.length === 0 ? (
                <SelectItem value="none" disabled>
                  Nenhum campo disponível
                </SelectItem>
              ) : (
                campos.map((campo) => (
                  <SelectItem key={campo.id} value={campo.id}>
                    {campo.name} ({translateDataType(campo.datatype)})
                  </SelectItem>
                ))
              )}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {selectedField && (
        <div className="space-y-2">
          <Label htmlFor="value">
            Valor ({translateDataType(selectedField.datatype)})
          </Label>
          {renderValueInput()}
        </div>
      )}

      <Button type="submit" className="w-full" disabled={!selectedField}>
        Salvar Preenchimento
      </Button>
    </form>
  );
}
