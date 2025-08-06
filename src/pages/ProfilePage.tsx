// src/pages/ProfilePage.tsx

import React from "react";
import { useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  CreditCard,
  Palette,
  Settings,
  ChevronRight,
  Edit3,
  Save,
  X,
} from "lucide-react";

import { MobileLayout } from "@/components/layout/MobileLayout";
import { Header } from "@/components/common/Header";
import { Section } from "@/components/layout/Section";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ThemeToggle } from "@/components/common/ThemeToggle";
import { MOCK_DATA, PAYMENT_METHODS, ROUTES } from "@/lib/constants";
import {
  getInitials,
  cn,
  isValidEmail,
  isValidPhoneNumber,
  formatPhoneNumber,
} from "@/lib/utils";

export function ProfilePage() {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = React.useState(false);
  const [formData, setFormData] = React.useState({
    ...MOCK_DATA.USER,
    company: "Freelancer", // Add company field
  });
  const [errors, setErrors] = React.useState<Record<string, string>>({});

  const userInitials = getInitials(formData.firstName, formData.lastName);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "Voornaam is verplicht";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Achternaam is verplicht";
    }

    if (!formData.email.trim()) {
      newErrors.email = "E-mailadres is verplicht";
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = "Voer een geldig e-mailadres in";
    }

    if (formData.phone && !isValidPhoneNumber(formData.phone)) {
      newErrors.phone = "Voer een geldig Nederlands telefoonnummer in";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validateForm()) {
      // TODO: Save to API
      console.log("Saving profile:", formData);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      ...MOCK_DATA.USER,
      company: "Freelancer",
    });
    setErrors({});
    setIsEditing(false);
  };

  // Mock connected payment methods
  const connectedMethods = PAYMENT_METHODS.filter((method) =>
    ["tikkie", "paypal"].includes(method.id)
  );

  return (
    <MobileLayout>
      <div className="space-y-6">
        {/* Header */}
        <Header
          title="Profiel"
          subtitle="Beheer je account en instellingen"
          variant="centered"
          showAvatar
          avatarFallback={userInitials}
        />

        {/* Profile Information */}
        <Section title="Persoonlijke gegevens" spacing="md">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold">Account informatie</h3>
              {!isEditing ? (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsEditing(true)}
                >
                  <Edit3 className="w-4 h-4 mr-2" />
                  Bewerken
                </Button>
              ) : (
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" onClick={handleCancel}>
                    <X className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    className="hover:bg-primary/90"
                    onClick={handleSave}
                  >
                    <Save className="w-4 h-4" />
                  </Button>
                </div>
              )}
            </div>

            <div className="space-y-4">
              {/* Avatar */}
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white font-semibold text-xl">
                  {userInitials}
                </div>
                <div>
                  <p className="font-medium">
                    {formData.firstName} {formData.lastName}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {formData.email}
                  </p>
                </div>
              </div>

              {/* Form Fields */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName" className="font-bold">
                    Voornaam
                  </Label>
                  {isEditing ? (
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) =>
                        handleInputChange("firstName", e.target.value)
                      }
                      className={cn(errors.firstName && "border-destructive")}
                    />
                  ) : (
                    <p className="mt-1 text-sm">{formData.firstName}</p>
                  )}
                  {errors.firstName && (
                    <p className="text-sm text-destructive mt-1">
                      {errors.firstName}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="lastName" className="font-bold">
                    Achternaam
                  </Label>
                  {isEditing ? (
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) =>
                        handleInputChange("lastName", e.target.value)
                      }
                      className={cn(errors.lastName && "border-destructive")}
                    />
                  ) : (
                    <p className="mt-1 text-sm">{formData.lastName}</p>
                  )}
                  {errors.lastName && (
                    <p className="text-sm text-destructive mt-1">
                      {errors.lastName}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <Label htmlFor="email" className="font-bold">
                  E-mailadres
                </Label>
                {isEditing ? (
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className={cn(errors.email && "border-destructive")}
                  />
                ) : (
                  <p className="mt-1 text-sm">{formData.email}</p>
                )}
                {errors.email && (
                  <p className="text-sm text-destructive mt-1">
                    {errors.email}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="phone" className="font-bold">
                  Telefoonnummer
                </Label>
                {isEditing ? (
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone || ""}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    placeholder="+31 6 12345678"
                    className={cn(errors.phone && "border-destructive")}
                  />
                ) : (
                  <p className="mt-1 text-sm">
                    {formData.phone
                      ? formatPhoneNumber(formData.phone)
                      : "Niet ingesteld"}
                  </p>
                )}
                {errors.phone && (
                  <p className="text-sm text-destructive mt-1">
                    {errors.phone}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="company" className="font-bold">
                  Bedrijf
                </Label>
                {isEditing ? (
                  <Input
                    id="company"
                    value={formData.company || ""}
                    onChange={(e) =>
                      handleInputChange("company", e.target.value)
                    }
                    placeholder="Mijn Bedrijf BV"
                  />
                ) : (
                  <p className="mt-1 text-sm">
                    {formData.company || "Niet ingesteld"}
                  </p>
                )}
              </div>
            </div>
          </Card>
        </Section>

        {/* Payment Methods */}
        <Section title="Betaalmethodes" spacing="md">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Gekoppelde accounts</h3>
            </div>

            <div className="space-y-3">
              {connectedMethods.map((method) => (
                <div
                  key={method.id}
                  className="flex items-center justify-between p-3 border rounded-lg cursor-pointer hover:bg-muted/50"
                >
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl">{method.icon}</div>
                    <div>
                      <p className="font-medium">{method.label}</p>
                      <p className="text-sm text-muted-foreground">Verbonden</p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                </div>
              ))}

              <Button variant="outline" className="w-full justify-start">
                <CreditCard className="w-4 h-4 mr-2" />
                Nieuwe betaalmethode toevoegen
              </Button>
            </div>
          </Card>
        </Section>

        {/* App Settings */}
        <Section title="App instellingen" spacing="md">
          <Card className="p-6 space-y-6">
            {/* Theme Toggle */}
            <div>
              <h3 className="font-semibold mb-4">Uiterlijk</h3>
              <ThemeToggle variant="selector" />
            </div>

            {/* Other Settings */}
            <div className="space-y-3">
              <h3 className="font-semibold">Overige instellingen</h3>

              <div
                className="flex items-center justify-between p-3 border rounded-lg cursor-pointer hover:bg-muted/50"
                onClick={() => navigate(ROUTES.BRANDING)}
              >
                <div className="flex items-center space-x-3">
                  <Palette className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Branding</p>
                    <p className="text-sm text-muted-foreground">
                      Pas je merk aan
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              </div>

              <div className="flex items-center justify-between p-3 border rounded-lg cursor-pointer hover:bg-muted/50">
                <div className="flex items-center space-x-3">
                  <Settings className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Geavanceerde instellingen</p>
                    <p className="text-sm text-muted-foreground">Meer opties</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              </div>
            </div>
          </Card>
        </Section>

        {/* Account Actions */}
        <Section spacing="md">
          <Card className="p-6">
            <div className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <Mail className="w-4 h-4 mr-2" />
                Exporteer mijn gegevens
              </Button>

              <Button
                variant="outlineDestructive"
                className="w-full justify-start"
              >
                <User className="w-4 h-4 mr-2" />
                Account verwijderen
              </Button>
            </div>
          </Card>
        </Section>
      </div>
    </MobileLayout>
  );
}
