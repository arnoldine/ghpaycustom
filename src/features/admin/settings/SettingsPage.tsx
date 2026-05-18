import { useMemo, useState } from 'react'
import { defaultBranding } from '../../../config/branding'
import { Button } from '../../../components/ui/Button'
import { Card } from '../../../components/ui/Card'
import { Input } from '../../../components/ui/Input'

export const SettingsPage = () => {
  const [branding, setBranding] = useState(defaultBranding)
  const previewStyle = useMemo(
    () => ({
      borderColor: branding.primaryColor,
      color: branding.primaryColor,
      background: `${branding.primaryColor}10`,
    }),
    [branding],
  )

  return (
    <div className="space-y-4">
      <Card className="space-y-3">
        <h1 className="text-xl font-semibold">System & White-Label Settings</h1>
        <div className="grid gap-2 md:grid-cols-2">
          <Input value={branding.institutionName} onChange={(e) => setBranding({ ...branding, institutionName: e.target.value })} placeholder="Institution name" />
          <Input value={branding.logoUrl} onChange={(e) => setBranding({ ...branding, logoUrl: e.target.value })} placeholder="Logo URL" />
          <Input value={branding.primaryColor} onChange={(e) => setBranding({ ...branding, primaryColor: e.target.value })} placeholder="Primary color" />
          <Input value={branding.secondaryColor} onChange={(e) => setBranding({ ...branding, secondaryColor: e.target.value })} placeholder="Secondary color" />
          <Input value={branding.supportPhone} onChange={(e) => setBranding({ ...branding, supportPhone: e.target.value })} placeholder="Support phone" />
          <Input value={branding.supportEmail} onChange={(e) => setBranding({ ...branding, supportEmail: e.target.value })} placeholder="Support email" />
        </div>
        <Button className="bg-slate-600" type="button">Save (Local Preview Only)</Button>
      </Card>
      <Card style={previewStyle} className="space-y-2 border-2">
        <h2 className="text-lg font-semibold">Brand Preview</h2>
        <img src={branding.logoUrl} alt="Brand Logo" className="h-10" />
        <p>{branding.institutionName}</p>
        <p>Support: {branding.supportPhone} • {branding.supportEmail}</p>
        <p>Currency: {branding.currency}</p>
      </Card>
    </div>
  )
}
