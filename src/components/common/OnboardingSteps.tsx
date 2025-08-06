// src/components/common/OnboardingSteps.tsx

import React from "react";
import { User, CreditCard, CheckCircle, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  cn,
  isValidEmail,
  isValidPhoneNumber,
  formatPhoneNumber,
} from "@/lib/utils";
import { PAYMENT_METHODS, VALIDATION } from "@/lib/constants";
import type { WizardStepProps, OnboardingForm } from "@/lib/types";

/**
 * Step 1: Personal Information
 */
export function PersonalInfoStep({
  data,
  onChange,
}: WizardStepProps<OnboardingForm>) {
  const [errors, setErrors] = React.useState<Record<string, string>>({});

  const handleInputChange = (field: keyof OnboardingForm, value: string) => {
    onChange({ [field]: value });
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  // Validate for wizard navigation
  React.useEffect(() => {
    const newErrors: Record<string, string> = {};

    if (data.firstName && data.firstName.length < VALIDATION.MIN_NAME_LENGTH) {
      newErrors.firstName = `Voornaam moet minimaal ${VALIDATION.MIN_NAME_LENGTH} karakters bevatten`;
    }

    if (data.lastName && data.lastName.length < VALIDATION.MIN_NAME_LENGTH) {
      newErrors.lastName = `Achternaam moet minimaal ${VALIDATION.MIN_NAME_LENGTH} karakters bevatten`;
    }

    if (data.email && !isValidEmail(data.email)) {
      newErrors.email = "Voer een geldig e-mailadres in";
    }

    if (data.phone && !isValidPhoneNumber(data.phone)) {
      newErrors.phone = "Voer een geldig Nederlands telefoonnummer in";
    }

    setErrors(newErrors);
  }, [data.firstName, data.lastName, data.email, data.phone]);

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <User className="w-8 h-8 text-primary" />
        </div>
        <h2 className="text-xl font-semibold mb-2">Persoonlijke gegevens</h2>
        <p className="text-muted-foreground">
          Vertel ons iets over jezelf om je account in te stellen
        </p>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="firstName">Voornaam *</Label>
            <Input
              id="firstName"
              value={data.firstName || ""}
              onChange={(e) => handleInputChange("firstName", e.target.value)}
              placeholder="Jan"
              className={cn(errors.firstName && "border-destructive")}
            />
            {errors.firstName && (
              <p className="text-sm text-destructive mt-1">
                {errors.firstName}
              </p>
            )}
          </div>
          <div>
            <Label htmlFor="lastName">Achternaam *</Label>
            <Input
              id="lastName"
              value={data.lastName || ""}
              onChange={(e) => handleInputChange("lastName", e.target.value)}
              placeholder="Jansen"
              className={cn(errors.lastName && "border-destructive")}
            />
            {errors.lastName && (
              <p className="text-sm text-destructive mt-1">{errors.lastName}</p>
            )}
          </div>
        </div>

        <div>
          <Label htmlFor="email">E-mailadres *</Label>
          <Input
            id="email"
            type="email"
            value={data.email || ""}
            onChange={(e) => handleInputChange("email", e.target.value)}
            placeholder="jan@voorbeeld.nl"
            className={cn(errors.email && "border-destructive")}
          />
          {errors.email && (
            <p className="text-sm text-destructive mt-1">{errors.email}</p>
          )}
        </div>

        <div>
          <Label htmlFor="phone">Telefoonnummer (optioneel)</Label>
          <Input
            id="phone"
            type="tel"
            value={data.phone || ""}
            onChange={(e) => handleInputChange("phone", e.target.value)}
            placeholder="+31 6 12345678"
            className={cn(errors.phone && "border-destructive")}
          />
          {errors.phone && (
            <p className="text-sm text-destructive mt-1">{errors.phone}</p>
          )}
          {data.phone && isValidPhoneNumber(data.phone) && (
            <p className="text-sm text-green-600 mt-1">
              Geformatteerd: {formatPhoneNumber(data.phone)}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="company">Bedrijf (optioneel)</Label>
          <Input
            id="company"
            value={data.company || ""}
            onChange={(e) => handleInputChange("company", e.target.value)}
            placeholder="Mijn Bedrijf BV"
          />
          <p className="text-xs text-muted-foreground mt-1">
            Handig voor freelancers en zzp'ers
          </p>
        </div>
      </div>
    </div>
  );
}

/**
 * Step 2: Payment Methods Setup
 */
export function PaymentMethodsSetupStep({
  data,
  onChange,
}: WizardStepProps<OnboardingForm>) {
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
        <p className="text-muted-foreground">
          Kies welke betaalmethodes je wilt aanbieden aan je klanten
        </p>
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

      <Card className="p-4 bg-blue-50 border-blue-200">
        <div className="flex items-start space-x-3">
          <div className="text-blue-600 mt-0.5">💡</div>
          <div>
            <h4 className="font-medium text-blue-900 mb-1">Tip</h4>
            <p className="text-sm text-blue-800">
              Je kunt later altijd meer betaalmethodes toevoegen of account
              informatie bijwerken in je profiel.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}

/**
 * Step 3: Profile Customization
 */
export function ProfileCustomizationStep({
  data,
}: WizardStepProps<OnboardingForm>) {
  const [profilePreview, setProfilePreview] = React.useState({
    displayName: "",
    bio: "",
    avatar: "",
  });

  React.useEffect(() => {
    const displayName =
      data.company || `${data.firstName || ""} ${data.lastName || ""}`.trim();
    setProfilePreview({
      displayName,
      bio: data.company ? `${data.firstName} ${data.lastName}` : "",
      avatar: `${data.firstName?.[0] || ""}${data.lastName?.[0] || ""}`,
    });
  }, [data.firstName, data.lastName, data.company]);

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Sparkles className="w-8 h-8 text-primary" />
        </div>
        <h2 className="text-xl font-semibold mb-2">Profiel voorbeeld</h2>
        <p className="text-muted-foreground">
          Zo zien klanten jouw betaalverzoeken
        </p>
      </div>

      {/* Profile Preview */}
      <Card className="p-6 bg-gradient-to-br from-primary/5 to-primary/10">
        <h3 className="font-semibold mb-4 text-center">
          Voorbeeld betaalpagina
        </h3>
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto text-white font-semibold text-lg">
            {profilePreview.avatar}
          </div>
          <div>
            <h4 className="font-semibold text-lg">
              {profilePreview.displayName}
            </h4>
            {profilePreview.bio && (
              <p className="text-sm text-muted-foreground">
                {profilePreview.bio}
              </p>
            )}
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <p className="font-medium mb-2 dark:text-background">
              Oppassen op 27 juli
            </p>
            <p className="text-2xl font-bold text-primary">€22,50</p>
            <div className="flex gap-2 mt-3 justify-center">
              <div className="bg-primary/20 px-3 py-1 rounded-full text-xs dark:text-background">
                🏦 Tikkie
              </div>
              <div className="bg-primary/20 px-3 py-1 rounded-full text-xs dark:text-background">
                💳 PayPal
              </div>
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-4 bg-green-50 border-green-200">
        <div className="flex items-start space-x-3">
          <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
          <div>
            <h4 className="font-medium text-green-900 mb-1">Perfect!</h4>
            <p className="text-sm text-green-800">
              Je profiel ziet er goed uit. Klanten zien jouw naam en kunnen
              gemakkelijk betalen. Je kunt dit later altijd aanpassen bij
              branding.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}

/**
 * Step 4: Welcome & Tutorial
 */
export function WelcomeTutorialStep({ data }: WizardStepProps<OnboardingForm>) {
  const [currentTip, setCurrentTip] = React.useState(0);

  const tips = [
    {
      icon: "⚡",
      title: "Snel verzoeken maken",
      description: "Maak in 30 seconden een betaalverzoek met onze wizard",
    },
    {
      icon: "📱",
      title: "Deel gemakkelijk",
      description: "Deel via WhatsApp, e-mail of kopieer de link",
    },
    {
      icon: "💰",
      title: "Meerdere betaalmethodes",
      description: "Klanten kunnen kiezen hoe ze willen betalen",
    },
    {
      icon: "📊",
      title: "Overzicht behouden",
      description: "Zie al je verzoeken en betalingen in één dashboard",
    },
  ];

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTip((prev) => (prev + 1) % tips.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [tips.length]);

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        <h2 className="text-xl font-semibold mb-2">Welkom bij Velto!</h2>
        <p className="text-muted-foreground">
          Je account is klaar, {data.firstName}! Hier zijn een paar tips om te
          beginnen.
        </p>
      </div>

      {/* Account Summary */}
      <Card className="p-6">
        <h3 className="font-semibold mb-4">Account overzicht</h3>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Naam:</span>
            <span className="font-medium">
              {data.firstName} {data.lastName}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">E-mail:</span>
            <span className="font-medium">{data.email}</span>
          </div>
          {data.phone && (
            <div className="flex justify-between">
              <span className="text-muted-foreground">Telefoon:</span>
              <span className="font-medium">
                {formatPhoneNumber(data.phone)}
              </span>
            </div>
          )}
          {data.company && (
            <div className="flex justify-between">
              <span className="text-muted-foreground">Bedrijf:</span>
              <span className="font-medium">{data.company}</span>
            </div>
          )}
          <div className="flex justify-between">
            <span className="text-muted-foreground">Betaalmethodes:</span>
            <span className="font-medium">
              {data.paymentMethods?.length || 0} geselecteerd
            </span>
          </div>
        </div>
      </Card>

      {/* Tips Carousel */}
      <Card className="p-6">
        <h3 className="font-semibold mb-4">Tips voor succes</h3>
        <div className="text-center space-y-4">
          <div className="text-4xl">{tips[currentTip].icon}</div>
          <div>
            <h4 className="font-semibold text-lg mb-2">
              {tips[currentTip].title}
            </h4>
            <p className="text-muted-foreground">
              {tips[currentTip].description}
            </p>
          </div>
          <div className="flex justify-center space-x-2">
            {tips.map((_, index) => (
              <div
                key={index}
                className={cn(
                  "w-2 h-2 rounded-full transition-colors",
                  index === currentTip ? "bg-primary" : "bg-muted"
                )}
              />
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}
