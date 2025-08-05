// src/pages/ProfilePage.tsx
import { MobileLayout } from "@/components/layout/MobileLayout";
import { Header } from "@/components/common/Header";
import { MOCK_DATA } from "@/lib/constants";
import { getInitials } from "@/lib/utils";

export function ProfilePage() {
  const user = MOCK_DATA.USER;
  const userInitials = getInitials(user.firstName, user.lastName);

  return (
    <MobileLayout>
      <div className="p-4">
        <Header
          title="Profiel"
          subtitle="Beheer je account en instellingen"
          variant="centered"
          showAvatar
          avatarFallback={userInitials}
        />
        <div className="mt-8 text-center">
          <p className="text-muted-foreground">This page will contain:</p>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li>• Profile information editing</li>
            <li>• Account settings</li>
            <li>• Payment method management</li>
            <li>• Theme preferences</li>
          </ul>
        </div>
      </div>
    </MobileLayout>
  );
}
