import { useState } from "react";
import type { FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { create } from "@/services/CampoService";

interface CampoFormProps {
  onSuccess?: () => void;
}

export function CampoForm({ onSuccess }: CampoFormProps) {
  const [fieldName, setFieldName] = useState<string>("");
  const [selectedDataType, setSelectedDataType] = useState<string>("");
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!fieldName) {
      setMessage({ type: "error", text: "Digite o nome do campo." });
      return;
    }

    if (!selectedDataType) {
      setMessage({ type: "error", text: "Selecione o tipo de dado." });
      return;
    }

    try {
      await create({ name: fieldName, datatype: selectedDataType });

      setMessage({ type: "success", text: "Campo adicionado com sucesso!" });

      setFieldName("");
      setSelectedDataType("");

      if (onSuccess) {
        onSuccess();
      }

      setTimeout(() => setMessage(null), 3000);
    } catch (err: any) {
      console.error("Erro completo:", err);
      setMessage({
        type: "error",
        text: err.response?.data?.message || "Erro ao adicionar campo.",
      });
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
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
        <Label htmlFor="name">Nome do Campo</Label>
        <Input
          id="name"
          name="name"
          placeholder="Digite o nome do campo"
          value={fieldName}
          onChange={(e) => setFieldName(e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="datatype">Tipo de dado</Label>
        <Select value={selectedDataType} onValueChange={setSelectedDataType}>
          <SelectTrigger className="w-full" id="datatype">
            <SelectValue placeholder="Selecione o tipo de dado" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Tipos de dados</SelectLabel>
              <SelectItem value="string">Texto</SelectItem>
              <SelectItem value="number">Número</SelectItem>
              <SelectItem value="date">Data</SelectItem>
              <SelectItem value="boolean">Booleano</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <Button
        className="w-full mt-4"
        type="submit"
        disabled={!fieldName || !selectedDataType}
      >
        Adicionar Campo
      </Button>
    </form>
  );
}
