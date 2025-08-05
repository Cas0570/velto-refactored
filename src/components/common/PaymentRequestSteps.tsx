// src/components/common/PaymentRequestSteps.tsx

import React from "react";
import { Euro, FileText, CreditCard, CheckCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { cn, validateAmount, formatCurrency } from "@/lib/utils";
import { PAYMENT_METHODS, VALIDATION } from "@/lib/constants";
import type { WizardStepProps, CreateRequestForm } from "@/lib/types";

/**
 * Step 1: Amount Input
 */
export function AmountStep({
  data,
  onChange,
}: WizardStepProps<CreateRequestForm>) {
  const [errors, setErrors] = React.useState<Record<string, string>>({});

  const handleAmountChange = (value: string) => {
    // Allow only numbers and decimal point
    const cleanValue = value.replace(/[^0-9.,]/g, "").replace(",", ".");
    onChange({ amount: cleanValue });

    // Clear error when user starts typing
    if (errors.amount) {
      setErrors((prev) => ({ ...prev, amount: "" }));
    }
  };

  const numericAmount = parseFloat(data.amount || "0");
  const isValidAmount = !isNaN(numericAmount) && numericAmount > 0;

  // Validate for wizard navigation
  React.useEffect(() => {
    const validation = validateAmount(data.amount || "");
    if (!validation.isValid && data.amount) {
      setErrors({ amount: validation.error || "Ongeldig bedrag" });
    } else {
      setErrors({});
    }
  }, [data.amount]);

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Euro className="w-8 h-8 text-primary" />
        </div>
        <h2 className="text-xl font-semibold mb-2">Bedrag</h2>
        <p className="text-muted-foreground">
          Hoeveel wil je vragen voor je dienst of product?
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="amount">Bedrag (€)</Label>
          <div className="relative">
            <Input
              id="amount"
              type="text"
              inputMode="decimal"
              value={data.amount || ""}
              onChange={(e) => handleAmountChange(e.target.value)}
              placeholder="0,00"
              className={cn(
                "text-2xl font-semibold text-center py-6",
                errors.amount && "border-destructive"
              )}
            />
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-2xl font-semibold text-muted-foreground">
              €
            </div>
          </div>
          {errors.amount && (
            <p className="text-sm text-destructive mt-1">{errors.amount}</p>
          )}
          <p className="text-xs text-muted-foreground mt-1">
            Minimum: €{VALIDATION.MIN_AMOUNT} - Maximum: €
            {VALIDATION.MAX_AMOUNT.toLocaleString("nl-NL")}
          </p>
        </div>

        {isValidAmount && (
          <Card className="p-4 bg-primary/5 border-primary/20">
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-1">Je vraagt</p>
              <p className="text-2xl font-bold text-primary">
                {formatCurrency(numericAmount)}
              </p>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}

/**
 * Step 2: Description
 */
export function DescriptionStep({
  data,
  onChange,
}: WizardStepProps<CreateRequestForm>) {
  const [errors, setErrors] = React.useState<Record<string, string>>({});

  const handleDescriptionChange = (value: string) => {
    onChange({ description: value });

    // Clear error when user starts typing
    if (errors.description) {
      setErrors((prev) => ({ ...prev, description: "" }));
    }
  };

  const characterCount = data.description?.length || 0;
  const isValidLength =
    characterCount >= VALIDATION.MIN_DESCRIPTION_LENGTH &&
    characterCount <= VALIDATION.MAX_DESCRIPTION_LENGTH;

  // Validate for wizard navigation
  React.useEffect(() => {
    const description = data.description?.trim() || "";
    const newErrors: Record<string, string> = {};

    if (description && description.length < VALIDATION.MIN_DESCRIPTION_LENGTH) {
      newErrors.description = `Omschrijving moet minimaal ${VALIDATION.MIN_DESCRIPTION_LENGTH} karakters bevatten`;
    } else if (description.length > VALIDATION.MAX_DESCRIPTION_LENGTH) {
      newErrors.description = `Omschrijving mag maximaal ${VALIDATION.MAX_DESCRIPTION_LENGTH} karakters bevatten`;
    }

    setErrors(newErrors);
  }, [data.description]);

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <FileText className="w-8 h-8 text-primary" />
        </div>
        <h2 className="text-xl font-semibold mb-2">Omschrijving</h2>
        <p className="text-muted-foreground">
          Beschrijf waar het betaalverzoek voor is
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="description">Omschrijving</Label>
          <Textarea
            id="description"
            value={data.description || ""}
            onChange={(e) => handleDescriptionChange(e.target.value)}
            placeholder="Bijvoorbeeld: Oppassen op 27 juli van 19:00 tot 23:00"
            rows={4}
            className={cn(errors.description && "border-destructive")}
          />
          <div className="flex justify-between items-center mt-1">
            {errors.description ? (
              <p className="text-sm text-destructive">{errors.description}</p>
            ) : (
              <p className="text-xs text-muted-foreground">
                Minimaal {VALIDATION.MIN_DESCRIPTION_LENGTH} karakters
              </p>
            )}
            <p
              className={cn(
                "text-xs",
                characterCount > VALIDATION.MAX_DESCRIPTION_LENGTH
                  ? "text-destructive"
                  : isValidLength
                  ? "text-green-600"
                  : "text-muted-foreground"
              )}
            >
              {characterCount}/{VALIDATION.MAX_DESCRIPTION_LENGTH}
            </p>
          </div>
        </div>

        {data.description && isValidLength && (
          <Card className="p-4 bg-muted/50">
            <h3 className="font-medium mb-2">Voorbeeld betaalpagina:</h3>
            <div className="text-sm space-y-1 break-words">
              <p className="font-medium">{data.description}</p>
              <p className="text-primary font-semibold">
                {data.amount
                  ? formatCurrency(parseFloat(data.amount))
                  : "€0,00"}
              </p>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}

/**
 * Step 3: Payment Methods Selection
 */
export function PaymentMethodSelectionStep({
  data,
  onChange,
}: WizardStepProps<CreateRequestForm>) {
  const [errors, setErrors] = React.useState<Record<string, string>>({});

  const handlePaymentMethodToggle = (methodId: string, checked: boolean) => {
    const currentMethods = data.paymentMethods || [];
    const updatedMethods = checked
      ? [...currentMethods, methodId]
      : currentMethods.filter((id) => id !== methodId);

    onChange({ paymentMethods: updatedMethods });

    // Clear error when user selects a method
    if (errors.paymentMethods) {
      setErrors((prev) => ({ ...prev, paymentMethods: "" }));
    }
  };

  // Validate for wizard navigation
  React.useEffect(() => {
    const newErrors: Record<string, string> = {};

    if (!data.paymentMethods || data.paymentMethods.length === 0) {
      // Don't show error initially, only after user interaction
      if (data.paymentMethods !== undefined) {
        newErrors.paymentMethods = "Selecteer minimaal één betaalmethode";
      }
    }

    setErrors(newErrors);
  }, [data.paymentMethods]);

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <CreditCard className="w-8 h-8 text-primary" />
        </div>
        <h2 className="text-xl font-semibold mb-2">Betaalmethodes</h2>
        <p className="text-muted-foreground">Hoe kunnen klanten betalen?</p>
      </div>

      <div className="space-y-3">
        {PAYMENT_METHODS.map((method) => (
          <Card
            key={method.id}
            className={cn(
              "p-4 cursor-pointer transition-colors hover:bg-muted/50",
              data.paymentMethods?.includes(method.id) &&
                "ring-2 ring-primary bg-primary/5"
            )}
            onClick={() =>
              handlePaymentMethodToggle(
                method.id,
                !data.paymentMethods?.includes(method.id)
              )
            }
          >
            <div className="flex items-center space-x-3">
              <Checkbox
                checked={data.paymentMethods?.includes(method.id) || false}
                onCheckedChange={(checked) =>
                  handlePaymentMethodToggle(method.id, !!checked)
                }
              />
              <div className="text-2xl">{method.icon}</div>
              <div className="flex-1">
                <h3 className="font-medium">{method.label}</h3>
                <p className="text-sm text-muted-foreground">
                  {method.description}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {errors.paymentMethods && (
        <p className="text-sm text-destructive">{errors.paymentMethods}</p>
      )}
    </div>
  );
}

/**
 * Step 4: Draft Preview - Almost Done
 */
export function DraftPreviewStep({ data }: WizardStepProps<CreateRequestForm>) {
  const selectedMethods = PAYMENT_METHODS.filter((method) =>
    data.paymentMethods?.includes(method.id)
  );

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <FileText className="w-8 h-8 text-orange-600" />
        </div>
        <h2 className="text-xl font-semibold mb-2">Bijna klaar!</h2>
        <p className="text-muted-foreground">
          Controleer je betaalverzoek voordat je het definitief maakt
        </p>
      </div>

      <Card className="p-6">
        <h3 className="font-semibold mb-4">Verzoek overzicht</h3>
        <div className="space-y-4">
          <div className="break-words">
            <p className="text-sm text-muted-foreground">Omschrijving</p>
            <p className="font-medium">{data.description}</p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Bedrag</p>
            <p className="text-2xl font-bold text-primary">
              {data.amount ? formatCurrency(parseFloat(data.amount)) : "€0,00"}
            </p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground mb-2">Betaalmethodes</p>
            <div className="flex flex-wrap gap-2">
              {selectedMethods.map((method) => (
                <div
                  key={method.id}
                  className="flex items-center space-x-2 bg-muted rounded-full px-3 py-1"
                >
                  <span className="text-sm">{method.icon}</span>
                  <span className="text-sm font-medium">{method.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>

      <div className="space-y-3">
        <Button variant="outline" className="w-full">
          Ga naar concept pagina
        </Button>
        <p className="text-xs text-center text-muted-foreground">
          Of klik op "Voltooien" om het verzoek definitief te maken
        </p>
      </div>
    </div>
  );
}

/**
 * Step 5: Final Confirmation - Request Created
 */
export function RequestCreatedStep({ data }: WizardStepProps<CreateRequestForm>) {
  const selectedMethods = PAYMENT_METHODS.filter((method) =>
    data.paymentMethods?.includes(method.id)
  );

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        <h2 className="text-xl font-semibold mb-2">Verzoek aangemaakt!</h2>
        <p className="text-muted-foreground">
          Je betaalverzoek is succesvol aangemaakt en kan nu gedeeld worden.
        </p>
      </div>

      <Card className="p-6">
        <h3 className="font-semibold mb-4">Verzoek overzicht</h3>
        <div className="space-y-4">
          <div className="break-words">
            <p className="text-sm text-muted-foreground">Omschrijving</p>
            <p className="font-medium">{data.description}</p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Bedrag</p>
            <p className="text-2xl font-bold text-primary">
              {data.amount ? formatCurrency(parseFloat(data.amount)) : "€0,00"}
            </p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground mb-2">Betaalmethodes</p>
            <div className="flex flex-wrap gap-2">
              {selectedMethods.map((method) => (
                <div
                  key={method.id}
                  className="flex items-center space-x-2 bg-muted rounded-full px-3 py-1"
                >
                  <span className="text-sm">{method.icon}</span>
                  <span className="text-sm font-medium">{method.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>

      <div className="space-y-3">
        <Button className="w-full">Verzoek delen</Button>
        <Button variant="outline" className="w-full">
          Nieuw verzoek maken
        </Button>
      </div>
    </div>
  );
}